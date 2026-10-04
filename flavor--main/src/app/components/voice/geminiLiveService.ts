import {
  FLAVOR_VOICE_SYSTEM_PROMPT,
  DEFAULT_MODEL,
  DEFAULT_VOICE,
} from "./voiceConfig";

export type ConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "speaking"
  | "listening"
  | "error";

export interface VoiceEventCallbacks {
  onStateChange: (state: ConnectionState) => void;
  onTranscript?: (text: string, sender: "user" | "gemini", isNewTurn?: boolean) => void;
  onTurnComplete?: () => void;
  onError: (errorMsg: string) => void;
  onInterrupted?: () => void;
  onVisualizerVolume?: (userVolume: number, geminiVolume: number) => void;
}

export class GeminiLiveService {
  private ws: WebSocket | null = null;
  private inputAudioCtx: AudioContext | null = null;
  private outputAudioCtx: AudioContext | null = null;
  private inputMediaStream: MediaStream | null = null;
  private inputProcessor: ScriptProcessorNode | null = null;
  private inputAnalyser: AnalyserNode | null = null;
  private outputAnalyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  private activeSources: AudioBufferSourceNode[] = [];
  private nextPlayTime = 0;
  private isMuted = false;
  private setupDone = false;
  private setupConfirmed = false;
  private apiKey = "";
  private voiceName = DEFAULT_VOICE;
  private modelName = DEFAULT_MODEL;
  private callbacks: VoiceEventCallbacks;
  private isGeminiTurnActive = false;
  private isUserTurnActive = false;

  // Fallback mode support (Web Speech API + Gemini REST)
  private fallbackRecognition: any = null;
  private isFallbackMode = false;
  private isProcessingRest = false;

  // Keepalive & reconnection
  private keepaliveInterval: ReturnType<typeof setInterval> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 2;
  private intentionalDisconnect = false;

  constructor(callbacks: VoiceEventCallbacks) {
    this.callbacks = callbacks;
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Connect and start true real-time Gemini Multimodal Live session
   */
  public async connect(apiKey: string, voiceName = DEFAULT_VOICE, modelName = DEFAULT_MODEL): Promise<void> {
    if (!apiKey) {
      this.callbacks.onError("No Gemini API key provided. Please paste your key to start.");
      return;
    }

    this.intentionalDisconnect = false;
    this.disconnect();
    this.intentionalDisconnect = false;
    this.apiKey = apiKey;
    this.voiceName = voiceName;
    this.modelName = modelName;
    this.isFallbackMode = false;
    this.setupConfirmed = false;
    this.callbacks.onStateChange("connecting");

    try {
      // 1. Initialize Microphone Audio Pipeline
      await this.initMicrophone();

      // 2. Initialize Playback Audio Pipeline
      this.initPlayback();

      // 3. Connect to Gemini Multimodal Live WebSocket (v1beta)
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${this.apiKey}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("[GeminiLive] WebSocket opened, sending setup frame...");
        this.sendSetupFrame();
      };

      this.ws.onmessage = async (event) => {
        try {
          let textData: string;
          if (event.data instanceof Blob) {
            textData = await event.data.text();
          } else {
            textData = event.data;
          }
          this.handleServerMessage(JSON.parse(textData));
        } catch (err) {
          console.warn("[GeminiLive] Error parsing message:", err);
        }
      };

      this.ws.onerror = (event) => {
        console.warn("[GeminiLive] WebSocket error:", event);
        // Don't immediately disconnect — let onclose handle it with more info
      };

      this.ws.onclose = (event) => {
        console.log("[GeminiLive] WebSocket closed:", event.code, event.reason);

        // If we intentionally disconnected, do nothing extra
        if (this.intentionalDisconnect || this.isFallbackMode) return;

        // Clear keepalive
        this.stopKeepalive();

        // Classify the close reason
        const code = event.code;
        const reason = event.reason || "";
        const lowerReason = reason.toLowerCase();

        // Check for genuine API key rejection / permission denied
        const isAuthError =
          code === 403 ||
          lowerReason.includes("api key") ||
          lowerReason.includes("api_key") ||
          lowerReason.includes("permission") ||
          lowerReason.includes("forbidden") ||
          lowerReason.includes("unauthenticated");

        if (isAuthError) {
          this.callbacks.onError(
            `API key rejected by Gemini (${code}${reason ? ': ' + reason : ''}). Please check your VITE_GEMINI_API_KEY.`
          );
          this.cleanupResources();
          this.callbacks.onStateChange("disconnected");
          return;
        }

        // Check for model compatibility or deprecation error
        const isModelError =
          lowerReason.includes("model") ||
          lowerReason.includes("not found") ||
          lowerReason.includes("not supported");

        if (isModelError) {
          console.warn(`[GeminiLive] Model compatibility error: ${reason}, activating fallback...`);
          this.activateFallbackMode(
            `Gemini Live model error: ${reason || code}. Switched to Browser Voice Mode.`
          );
          return;
        }

        // If setup was never confirmed, the server rejected our request
        if (!this.setupConfirmed) {
          // Try fallback if first attempt, or show error
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`[GeminiLive] Connection failed before setup confirmed (attempt ${this.reconnectAttempts}), switching to fallback mode...`);
          }
          this.activateFallbackMode(
            `Live WebSocket connection could not be established (code ${code}${reason ? ': ' + reason : ''}). Switched to Browser Voice Mode.`
          );
          return;
        }

        // Unexpected disconnect after confirmed setup — try reconnect once
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`[GeminiLive] Unexpected disconnect, attempting reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          this.callbacks.onStateChange("connecting");
          this.cleanupResources();
          setTimeout(() => {
            if (!this.intentionalDisconnect) {
              this.connect(this.apiKey, this.voiceName, this.modelName);
            }
          }, 1500);
          return;
        }

        // All retries exhausted — go to fallback
        this.activateFallbackMode(
          `Connection lost after ${this.reconnectAttempts} retries (code ${code}). Switched to Browser Voice Mode.`
        );
      };

      // Start live visualizer volume tracker loop
      this.startVisualizerLoop();
    } catch (err: any) {
      console.error("[GeminiLive] Init failed:", err);
      this.callbacks.onError(err?.message || "Failed to initialize microphone or connection.");
      this.cleanupResources();
      this.callbacks.onStateChange("disconnected");
    }
  }

  /**
   * Send the initial BidiGenerateContentSetup frame
   */
  private sendSetupFrame(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const setupPayload = {
      setup: {
        model: this.modelName || DEFAULT_MODEL,
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: this.voiceName || DEFAULT_VOICE,
              },
            },
          },
        },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: {
          parts: [
            {
              text: FLAVOR_VOICE_SYSTEM_PROMPT,
            },
          ],
        },
      },
    };

    this.ws.send(JSON.stringify(setupPayload));
    this.setupDone = true;
    console.log("[GeminiLive] Setup frame sent with audio transcription, waiting for server confirmation...");
  }

  /**
   * Set up audio input from user's microphone with 16kHz PCM streaming
   */
  private async initMicrophone(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    this.inputMediaStream = stream;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.inputAudioCtx = new AudioContextClass();

    if (this.inputAudioCtx.state === "suspended") {
      await this.inputAudioCtx.resume();
    }

    const source = this.inputAudioCtx.createMediaStreamSource(stream);
    this.inputAnalyser = this.inputAudioCtx.createAnalyser();
    this.inputAnalyser.fftSize = 256;
    source.connect(this.inputAnalyser);

    // Using ScriptProcessorNode for universal zero-dependency browser compatibility
    const bufferSize = 2048;
    this.inputProcessor = this.inputAudioCtx.createScriptProcessor(bufferSize, 1, 1);

    this.inputProcessor.onaudioprocess = (e) => {
      if (
        this.isMuted ||
        !this.setupConfirmed ||
        !this.ws ||
        this.ws.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      // Prevent acoustic echo: do not feed Gemini's own speech back into the mic
      if (this.isPlaybackActive()) {
        return;
      }

      const inputFloats = e.inputBuffer.getChannelData(0);
      const inputRate = this.inputAudioCtx?.sampleRate || 48000;

      // Downsample to 16,000Hz PCM 16-bit
      const pcm16 = this.downsampleTo16k(inputFloats, inputRate);
      if (pcm16.length === 0) return;

      const base64Audio = this.int16ToBase64(pcm16);

      const audioMessage = {
        realtimeInput: {
          mediaChunks: [
            {
              mimeType: "audio/pcm;rate=16000",
              data: base64Audio,
            },
          ],
        },
      };

      try {
        this.ws.send(JSON.stringify(audioMessage));
      } catch (err) {
        // Socket closed or closing
      }
    };

    source.connect(this.inputProcessor);

    // Keep processor alive by routing to a silent gain node
    const silentGain = this.inputAudioCtx.createGain();
    silentGain.gain.value = 0;
    this.inputProcessor.connect(silentGain);
    silentGain.connect(this.inputAudioCtx.destination);
  }

  /**
   * Set up audio output context for 24kHz PCM Gemini speech
   * Uses default hardware sample rate so all Windows and Mac audio drivers work reliably
   */
  private initPlayback(): void {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.outputAudioCtx = new AudioContextClass();
    if (this.outputAudioCtx.state === "suspended") {
      this.outputAudioCtx.resume().catch(() => {});
    }
    this.outputAnalyser = this.outputAudioCtx.createAnalyser();
    this.outputAnalyser.fftSize = 256;
    this.outputAnalyser.connect(this.outputAudioCtx.destination);
    this.nextPlayTime = 0;
  }

  /**
   * Handle server messages from Gemini Live WebSocket
   */
  private handleServerMessage(message: any): void {
    // Handle setup completion confirmation from server
    if (message.setupComplete) {
      console.log("[GeminiLive] Server confirmed setup! Session is live.");
      this.setupConfirmed = true;
      this.reconnectAttempts = 0;
      this.callbacks.onStateChange("speaking");
      this.startKeepalive();

      // Proactively greet the user immediately upon connection
      this.triggerGreeting();
      return;
    }

    const serverContent = message.serverContent;
    if (!serverContent) return;

    // 1. Interruption handling
    if (serverContent.interrupted) {
      this.isGeminiTurnActive = false;
      this.isUserTurnActive = false;
      this.stopCurrentPlayback();
      this.callbacks.onStateChange("listening");
      this.callbacks.onInterrupted?.();
      return;
    }

    // 2. Live transcript from user speech input transcription
    if (serverContent.inputTranscription?.text) {
      const isNew = !this.isUserTurnActive;
      this.isUserTurnActive = true;
      this.isGeminiTurnActive = false;
      this.callbacks.onTranscript?.(serverContent.inputTranscription.text, "user", isNew);
    }

    // 3. Live transcript from Gemini output transcription
    let geminiTextEmitted = false;
    if (serverContent.outputTranscription?.text) {
      const isNew = !this.isGeminiTurnActive;
      this.isGeminiTurnActive = true;
      this.isUserTurnActive = false;
      this.callbacks.onTranscript?.(serverContent.outputTranscription.text, "gemini", isNew);
      geminiTextEmitted = true;
    }

    // 4. Model Turn Audio chunks (24kHz 16-bit PCM)
    if (serverContent.modelTurn?.parts) {
      for (const part of serverContent.modelTurn.parts) {
        const inline = part.inlineData || part;
        const mimeType = inline.mimeType || part.mimeType;
        const audioData = inline.data || part.data;

        if (mimeType && mimeType.startsWith("audio/pcm") && audioData) {
          this.callbacks.onStateChange("speaking");
          this.enqueuePcmAudio(audioData);
        }
        if (part.text && !geminiTextEmitted) {
          const isNew = !this.isGeminiTurnActive;
          this.isGeminiTurnActive = true;
          this.isUserTurnActive = false;
          this.callbacks.onTranscript?.(part.text, "gemini", isNew);
        }
      }
    }

    // 5. Turn complete
    if (serverContent.turnComplete) {
      this.isGeminiTurnActive = false;
      this.isUserTurnActive = false;
      this.callbacks.onTurnComplete?.();
      setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && !this.isPlaybackActive()) {
          this.callbacks.onStateChange("listening");
        }
      }, 300);
    }
  }

  /**
   * Play base64 24kHz PCM chunk through Web Audio API
   */
  private enqueuePcmAudio(base64Pcm: string): void {
    if (!this.outputAudioCtx || !this.outputAnalyser) return;

    if (this.outputAudioCtx.state === "suspended") {
      this.outputAudioCtx.resume();
    }

    const binaryString = atob(base64Pcm);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const numSamples = Math.floor(bytes.length / 2);
    const float32 = new Float32Array(numSamples);
    const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

    for (let i = 0; i < numSamples; i++) {
      const int16 = dataView.getInt16(i * 2, true); // Little endian
      float32[i] = int16 < 0 ? int16 / 32768.0 : int16 / 32767.0;
    }

    const audioBuffer = this.outputAudioCtx.createBuffer(1, numSamples, 24000);
    audioBuffer.getChannelData(0).set(float32);

    const source = this.outputAudioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.outputAnalyser);

    const currentTime = this.outputAudioCtx.currentTime;
    const startTime = Math.max(currentTime, this.nextPlayTime);
    source.start(startTime);
    this.nextPlayTime = startTime + audioBuffer.duration;

    this.activeSources.push(source);
    source.onended = () => {
      const idx = this.activeSources.indexOf(source);
      if (idx !== -1) this.activeSources.splice(idx, 1);
      if (this.activeSources.length === 0) {
        this.nextPlayTime = 0;
        if (this.setupConfirmed && !this.isFallbackMode) {
          this.callbacks.onStateChange("listening");
        }
      }
    };
  }

  /**
   * Proactively ask the AI to greet the visitor with voice
   */
  private triggerGreeting(): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.isGeminiTurnActive = false;
    this.isUserTurnActive = false;

    try {
      this.ws.send(
        JSON.stringify({
          clientContent: {
            turns: [
              {
                role: "user",
                parts: [
                  {
                    text: "Greet the visitor warmly in one natural spoken sentence: 'Hi, how can I help you today? Welcome to Flavor Coffee.'",
                  },
                ],
              },
            ],
            turnComplete: true,
          },
        })
      );
    } catch (err) {
      console.warn("[GeminiLive] Failed to send initial greeting trigger:", err);
    }
  }

  /**
   * Send text prompt directly over live session (e.g. from suggestion pill or user input)
   */
  public sendUserText(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;

    this.isGeminiTurnActive = false;
    this.isUserTurnActive = false;
    this.callbacks.onTranscript?.(trimmed, "user", true);

    if (this.ws && this.ws.readyState === WebSocket.OPEN && this.setupConfirmed) {
      try {
        this.stopCurrentPlayback();
        this.callbacks.onStateChange("speaking");
        this.ws.send(
          JSON.stringify({
            clientContent: {
              turns: [
                {
                  role: "user",
                  parts: [{ text: trimmed }],
                },
              ],
              turnComplete: true,
            },
          })
        );
      } catch (err) {
        console.warn("[GeminiLive] Failed to send user text:", err);
      }
    } else if (this.isFallbackMode) {
      this.queryGeminiRest(trimmed);
    }
  }

  /**
   * Resume suspended AudioContext on user gesture
   */
  public resumeAudio(): void {
    if (this.outputAudioCtx && this.outputAudioCtx.state === "suspended") {
      this.outputAudioCtx.resume().catch(() => {});
    }
    if (this.inputAudioCtx && this.inputAudioCtx.state === "suspended") {
      this.inputAudioCtx.resume().catch(() => {});
    }
  }

  private isPlaybackActive(): boolean {
    return this.activeSources.length > 0;
  }

  private stopCurrentPlayback(): void {
    for (const source of this.activeSources) {
      try {
        source.stop();
      } catch (e) {}
    }
    this.activeSources = [];
    if (this.outputAudioCtx) {
      this.nextPlayTime = this.outputAudioCtx.currentTime;
    }
  }

  /**
   * Downsamples arbitrary audio sample rate to 16,000Hz PCM 16-bit
   */
  private downsampleTo16k(input: Float32Array, inputRate: number): Int16Array {
    if (inputRate === 16000) {
      const output = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      return output;
    }

    const ratio = inputRate / 16000;
    const outputLength = Math.round(input.length / ratio);
    const output = new Int16Array(outputLength);

    for (let i = 0; i < outputLength; i++) {
      const nextIndex = Math.min(Math.round(i * ratio), input.length - 1);
      const s = Math.max(-1, Math.min(1, input[nextIndex]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
  }

  private int16ToBase64(int16Array: Int16Array): string {
    const uint8 = new Uint8Array(int16Array.buffer, int16Array.byteOffset, int16Array.byteLength);
    let binary = "";
    const len = uint8.byteLength;
    const chunkSize = 8192;

    for (let i = 0; i < len; i += chunkSize) {
      const chunk = uint8.subarray(i, Math.min(i + chunkSize, len));
      binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }
    return btoa(binary);
  }

  /**
   * Keepalive ping to prevent idle WebSocket disconnects
   */
  private startKeepalive(): void {
    this.stopKeepalive();
    // Send a lightweight client content message every 25 seconds to keep the connection alive
    this.keepaliveInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN && this.setupConfirmed) {
        try {
          // Empty realtime input acts as a keepalive without triggering model response
          this.ws.send(JSON.stringify({
            realtimeInput: {
              mediaChunks: []
            }
          }));
        } catch (err) {
          console.warn("[GeminiLive] Keepalive send failed:", err);
        }
      }
    }, 25000);
  }

  private stopKeepalive(): void {
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = null;
    }
  }

  /**
   * Realtime visualizer loop measuring audio levels
   */
  private startVisualizerLoop(): void {
    const inputData = new Uint8Array(64);
    const outputData = new Uint8Array(64);

    const updateLevels = () => {
      let userVol = 0;
      let geminiVol = 0;

      if (this.inputAnalyser && !this.isMuted) {
        this.inputAnalyser.getByteFrequencyData(inputData);
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) sum += inputData[i];
        userVol = sum / (inputData.length * 255);
      }

      if (this.outputAnalyser && this.isPlaybackActive()) {
        this.outputAnalyser.getByteFrequencyData(outputData);
        let sum = 0;
        for (let i = 0; i < outputData.length; i++) sum += outputData[i];
        geminiVol = sum / (outputData.length * 255);
      }

      this.callbacks.onVisualizerVolume?.(userVol, geminiVol);
      this.animFrameId = requestAnimationFrame(updateLevels);
    };

    this.animFrameId = requestAnimationFrame(updateLevels);
  }

  // ── Browser Voice Fallback Mode (Resilience Guarantee) ───────────────────
  public activateFallbackMode(notice?: string): void {
    this.isFallbackMode = true;
    if (notice) {
      this.callbacks.onTranscript?.(`[System Note: ${notice}]`, "gemini");
    }

    // Close WebSocket if open
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.callbacks.onError(
        "Speech recognition is not supported in this browser. Please use Google Chrome or Edge."
      );
      this.disconnect();
      return;
    }

    this.fallbackRecognition = new SpeechRecognition();
    this.fallbackRecognition.continuous = true;
    this.fallbackRecognition.interimResults = false;
    this.fallbackRecognition.lang = "en-US";

    this.fallbackRecognition.onstart = () => {
      this.callbacks.onStateChange("listening");
    };

    this.fallbackRecognition.onresult = async (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript.trim();
        if (transcript && !this.isProcessingRest) {
          this.callbacks.onTranscript?.(transcript, "user");
          await this.queryGeminiRest(transcript);
        }
      }
    };

    this.fallbackRecognition.onerror = (e: any) => {
      console.warn("[FallbackVoice] Recognition error:", e);
    };

    this.fallbackRecognition.onend = () => {
      if (this.isFallbackMode && !this.isProcessingRest) {
        try {
          this.fallbackRecognition.start();
        } catch (e) {}
      }
    };

    try {
      this.fallbackRecognition.start();
    } catch (e) {}
  }

  private async queryGeminiRest(prompt: string): Promise<void> {
    this.isProcessingRest = true;
    this.callbacks.onStateChange("speaking");

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${this.apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: FLAVOR_VOICE_SYSTEM_PROMPT }],
          },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 150,
          },
        }),
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I am here to help with Flavor Coffee PLC.";

      this.callbacks.onTranscript?.(reply, "gemini");

      // Speak using SpeechSynthesis
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          this.isProcessingRest = false;
          this.callbacks.onStateChange("listening");
        };
        utterance.onerror = () => {
          this.isProcessingRest = false;
          this.callbacks.onStateChange("listening");
        };
        window.speechSynthesis.speak(utterance);
      } else {
        this.isProcessingRest = false;
        this.callbacks.onStateChange("listening");
      }
    } catch (err: any) {
      console.error("[FallbackVoice] REST call failed:", err);
      this.isProcessingRest = false;
      this.callbacks.onStateChange("listening");
    }
  }

  /**
   * Full teardown & cleanup
   */
  /**
   * Clean up all audio/media/WebSocket resources without changing state
   */
  private cleanupResources(): void {
    this.stopKeepalive();

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.fallbackRecognition) {
      try {
        this.fallbackRecognition.stop();
      } catch (e) {}
      this.fallbackRecognition = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    this.stopCurrentPlayback();

    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }

    if (this.inputProcessor) {
      this.inputProcessor.disconnect();
      this.inputProcessor = null;
    }

    if (this.inputMediaStream) {
      this.inputMediaStream.getTracks().forEach((t) => t.stop());
      this.inputMediaStream = null;
    }

    if (this.inputAudioCtx) {
      try {
        this.inputAudioCtx.close();
      } catch (e) {}
      this.inputAudioCtx = null;
    }

    if (this.outputAudioCtx) {
      try {
        this.outputAudioCtx.close();
      } catch (e) {}
      this.outputAudioCtx = null;
    }

    this.setupDone = false;
    this.setupConfirmed = false;
    this.isProcessingRest = false;
    this.isGeminiTurnActive = false;
    this.isUserTurnActive = false;
  }

  /**
   * Full teardown & cleanup
   */
  public disconnect(): void {
    this.intentionalDisconnect = true;
    this.cleanupResources();
    this.isFallbackMode = false;
    this.reconnectAttempts = 0;
    this.callbacks.onStateChange("disconnected");
  }
}
