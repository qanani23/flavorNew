import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  Settings,
  PhoneOff,
  Radio,
  ExternalLink,
  Volume2,
  Send,
  Trash2,
} from "lucide-react";
import VoiceOrb from "./VoiceOrb";
import {
  GeminiLiveService,
  ConnectionState,
} from "./geminiLiveService";
import {
  GEMINI_VOICES,
  DEFAULT_VOICE,
  getGeminiApiKey,
  saveGeminiApiKey,
} from "./voiceConfig";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage?: (page: string) => void;
}

interface TranscriptItem {
  id: string;
  sender: "user" | "gemini";
  text: string;
  time: string;
}

const QUICK_SUGGESTIONS = [
  "Tell me about Yirgacheffe coffee",
  "What cupping score standard do you use?",
  "How do you export and ship?",
  "What roast profiles are available?",
];

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
}) => {
  const [apiKey, setApiKey] = useState(() => getGeminiApiKey());
  const [keyInput, setKeyInput] = useState("");
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(DEFAULT_VOICE);
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userVolume, setUserVolume] = useState(0);
  const [geminiVolume, setGeminiVolume] = useState(0);
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const [textQuestion, setTextQuestion] = useState("");

  const serviceRef = useRef<GeminiLiveService | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Close handler: disconnects and completely clears chat history so next session starts fresh
  const handleClose = () => {
    serviceRef.current?.disconnect();
    setTranscripts([]);
    setTextQuestion("");
    setErrorMessage("");
    onClose();
  };

  // Keyboard shortcut: Escape to close and clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Initialize service instance once
  useEffect(() => {
    serviceRef.current = new GeminiLiveService({
      onStateChange: (newState) => {
        setState(newState);
        if (newState === "listening" || newState === "speaking") {
          setErrorMessage("");
        }
      },
      onTranscript: (text, sender, isNewTurn) => {
        if (!text) return;
        setTranscripts((prev) => {
          const last = prev[prev.length - 1];
          // Only append if it's the exact same sender AND part of the current active turn
          if (last && last.sender === sender && !isNewTurn) {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                text: last.text + text,
              },
            ];
          }
          // New turn or sender change: create a clean new speech bubble
          return [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              sender,
              text,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ];
        });
      },
      onError: (err) => {
        setErrorMessage(err);
      },
      onVisualizerVolume: (uVol, gVol) => {
        setUserVolume(uVol);
        setGeminiVolume(gVol);
      },
    });

    return () => {
      serviceRef.current?.disconnect();
      serviceRef.current = null;
    };
  }, []);

  // When modal opens/closes
  useEffect(() => {
    if (isOpen) {
      const currentKey = getGeminiApiKey();
      setApiKey(currentKey);

      if (currentKey) {
        setShowKeyConfig(false);
        serviceRef.current?.resumeAudio();
        serviceRef.current?.connect(currentKey, selectedVoice);
      } else {
        setShowKeyConfig(true);
      }
    } else {
      // Clear history when user exits
      serviceRef.current?.disconnect();
      setTranscripts([]);
      setTextQuestion("");
      setErrorMessage("");
    }
  }, [isOpen]);

  // Auto-scroll transcript when new messages arrive
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  // Handle Mute toggle
  const toggleMute = () => {
    if (!serviceRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    serviceRef.current.setMute(nextMute);
  };

  // Reconnect / start
  const handleStartSession = (keyToUse = apiKey) => {
    if (!keyToUse.trim()) {
      setShowKeyConfig(true);
      return;
    }
    setErrorMessage("");
    serviceRef.current?.resumeAudio();
    serviceRef.current?.connect(keyToUse.trim(), selectedVoice);
  };

  const handleSendTextQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = textQuestion.trim();
    if (!q) return;
    serviceRef.current?.resumeAudio();
    serviceRef.current?.sendUserText(q);
    setTextQuestion("");
  };

  const handleSaveKey = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    saveGeminiApiKey(trimmed);
    setApiKey(trimmed);
    setShowKeyConfig(false);
    handleStartSession(trimmed);
  };

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    if (state !== "disconnected") {
      serviceRef.current?.resumeAudio();
      serviceRef.current?.connect(apiKey, voiceId);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Flavor Coffee Realtime Voice Assistant"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-lg h-[92vh] max-h-[640px] bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
        style={{
          boxShadow:
            "0 25px 60px -15px var(--shadow-color), 0 0 40px -10px rgba(200, 82, 39, 0.25)",
        }}
      >
        {/* ── Top Header Bar ── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface)] select-none flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <Radio size={14} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-[var(--text-main)] tracking-tight">
                  Flavor Voice Live
                </h3>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-semibold border border-[var(--primary)]/30">
                  Gemini Live
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[var(--text-mute)] leading-none mt-0.5">
                Flavor Coffee PLC · Specialty Concierge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {transcripts.length > 0 && (
              <button
                type="button"
                onClick={() => setTranscripts([])}
                title="Clear chat history"
                aria-label="Clear chat history"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-mute)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowKeyConfig((s) => !s)}
              title="API Key Configuration"
              aria-label="API Key Configuration"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/10 transition-colors cursor-pointer"
            >
              <Settings size={15} />
            </button>
            <button
              type="button"
              onClick={handleClose}
              title="Close Voice Assistant"
              aria-label="Close Voice Assistant"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/10 transition-colors cursor-pointer"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* ── API Key Configuration Overlay ── */}
        {showKeyConfig && (
          <div className="p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-main)] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[var(--accent)]" />
                Google Gemini API Key
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                Get Free Key <ExternalLink size={10} />
              </a>
            </div>

            <p className="text-[11px] text-[var(--text-sub)] leading-tight">
              Paste your Gemini API key below to connect. Saved in your browser storage.
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder={apiKey ? "••••••••••••••••••••••••••••••••" : "Paste Gemini API key here"}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] placeholder:text-[var(--text-mute)] outline-none focus:border-[var(--primary)]"
              />
              <button
                type="button"
                onClick={handleSaveKey}
                disabled={!keyInput.trim()}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white disabled:opacity-40 transition-all cursor-pointer flex-shrink-0"
              >
                Save &amp; Connect
              </button>
            </div>
          </div>
        )}

        {/* ── Visualizer & Orb Stage (Compact Header) ── */}
        <div className="px-4 py-2.5 flex flex-col items-center justify-center flex-shrink-0 bg-gradient-to-b from-transparent to-[var(--bg-surface)]/25 border-b border-[var(--border-color)]/60 relative">
          {/* Status Badge */}
          <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] shadow-xs select-none">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                state === "speaking"
                  ? "bg-[var(--primary)] animate-ping"
                  : state === "listening"
                  ? "bg-emerald-500 animate-pulse"
                  : state === "connecting"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-stone-500"
              }`}
            />
            <span className="font-medium text-[var(--text-main)]">
              {state === "speaking"
                ? "Flavor Voice is Speaking..."
                : state === "listening"
                ? isMuted
                  ? "Microphone Muted"
                  : "Listening... Speak naturally"
                : state === "connecting"
                ? "Connecting to Gemini Live..."
                : "Ready to connect"}
            </span>
          </div>

          {/* Compact 3D Animated Voice Orb */}
          <VoiceOrb
            state={state}
            userVolume={userVolume}
            geminiVolume={geminiVolume}
            isMuted={isMuted}
          />

          {/* Error Notice */}
          {errorMessage && (
            <p className="mt-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/25 text-red-500 text-[11px] text-center max-w-sm">
              {errorMessage}
            </p>
          )}
        </div>

        {/* ── Active Conversation Suggestion Bar (shown when chat has history) ── */}
        {transcripts.length > 0 && state === "listening" && (
          <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 border-b border-[var(--border-color)]/40 bg-[var(--bg-surface)]/20 select-none">
            <span className="text-[10px] text-[var(--text-mute)] uppercase font-mono tracking-wider flex-shrink-0">
              Suggestions:
            </span>
            {QUICK_SUGGESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  serviceRef.current?.resumeAudio();
                  serviceRef.current?.sendUserText(q);
                }}
                className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--bg-main)] hover:bg-[var(--primary)] hover:text-white text-[var(--text-sub)] border border-[var(--border-color)] transition-colors cursor-pointer select-none whitespace-nowrap flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* ── Chat Transcript Section (Robust flex-1 container) ── */}
        <div className="flex-1 min-h-[140px] overflow-y-auto px-5 py-3 space-y-3 bg-[var(--bg-surface)]/30">
          {transcripts.length === 0 ? (
            /* Empty State with integrated Suggestions */
            <div className="h-full min-h-[160px] flex flex-col items-center justify-center text-center py-4 select-none">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-2">
                <Radio size={16} />
              </div>
              <p className="text-xs font-semibold text-[var(--text-main)]">
                Flavor Voice Concierge Active
              </p>
              <p className="text-[11px] text-[var(--text-mute)] mt-0.5 max-w-xs">
                Speak directly into your microphone, or tap a topic below to hear the AI answer:
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-md">
                {QUICK_SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      serviceRef.current?.resumeAudio();
                      serviceRef.current?.sendUserText(q);
                    }}
                    className="px-2.5 py-1 text-[11px] rounded-full bg-[var(--bg-main)] hover:bg-[var(--primary)] hover:text-white text-[var(--text-sub)] border border-[var(--border-color)] transition-all cursor-pointer shadow-2xs"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Active Speech Turns */
            <div className="space-y-3">
              {transcripts.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-col ${
                    t.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider font-mono text-[var(--text-mute)] mb-0.5 px-1">
                    {t.sender === "user" ? "You" : "Flavor AI"} · {t.time}
                  </span>
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-xs max-w-[88%] leading-relaxed break-words shadow-xs select-text ${
                      t.sender === "user"
                        ? "bg-[var(--primary)] text-white rounded-tr-xs"
                        : "bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] rounded-tl-xs"
                    }`}
                  >
                    {t.text}
                  </div>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          )}
        </div>

        {/* ── Quick Text Question Bar ── */}
        <form
          onSubmit={handleSendTextQuestion}
          className="px-4 py-2 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex items-center gap-2 select-none flex-shrink-0"
        >
          <input
            type="text"
            placeholder={
              state === "speaking"
                ? "AI is speaking..."
                : state === "disconnected"
                ? "Connect to speak or ask questions..."
                : "Ask anything about Ethiopian coffee..."
            }
            value={textQuestion}
            onChange={(e) => setTextQuestion(e.target.value)}
            disabled={state === "disconnected"}
            className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] placeholder:text-[var(--text-mute)] outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!textQuestion.trim() || state === "disconnected"}
            aria-label="Send question"
            className="p-1.5 sm:p-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center shadow-xs flex-shrink-0"
          >
            <Send size={13} />
          </button>
        </form>

        {/* ── Bottom Controls ── */}
        <div className="px-5 py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between select-none flex-shrink-0">
          {/* Voice Persona Selector */}
          <div className="relative flex items-center gap-1.5">
            <Volume2 size={13} className="text-[var(--accent)]" />
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="text-xs bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] rounded-lg px-2 py-1 outline-none cursor-pointer"
            >
              {GEMINI_VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  Voice: {v.name} ({v.gender})
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              disabled={state === "disconnected" || state === "connecting"}
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isMuted
                  ? "bg-red-500/15 border-red-500/40 text-red-500"
                  : "bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--primary)]"
              }`}
            >
              {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            {/* Connect / Disconnect Action */}
            {state === "disconnected" ? (
              <button
                type="button"
                onClick={() => handleStartSession()}
                className="px-4 py-1.5 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Radio size={13} />
                Connect Live
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <PhoneOff size={13} />
                End Conversation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantModal;
