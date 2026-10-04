import React from "react";
import { ConnectionState } from "./geminiLiveService";

interface VoiceOrbProps {
  state: ConnectionState;
  userVolume: number;
  geminiVolume: number;
  isMuted: boolean;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state,
  userVolume,
  geminiVolume,
  isMuted,
}) => {
  // Compute dynamic scale and glow based on who is speaking
  const isGeminiSpeaking = state === "speaking";
  const isListening = state === "listening";
  const isConnecting = state === "connecting";

  // Clamp volumes
  const geminiScale = 1 + Math.min(geminiVolume * 1.6, 0.45);
  const userScale = 1 + (isMuted ? 0 : Math.min(userVolume * 1.8, 0.4));
  const activeScale = isGeminiSpeaking ? geminiScale : isListening ? userScale : 1;

  // Colors
  const primaryGlow = isGeminiSpeaking
    ? "rgba(200, 82, 39, 0.85)" // Terracotta orange
    : isListening
    ? "rgba(184, 134, 11, 0.8)" // Ethiopian Amber Gold
    : "rgba(120, 100, 85, 0.4)";

  const secondaryGlow = isGeminiSpeaking
    ? "rgba(255, 158, 27, 0.7)"
    : isListening
    ? "rgba(74, 222, 128, 0.6)"
    : "rgba(90, 80, 70, 0.3)";

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primaryGlow} 0%, ${secondaryGlow} 50%, transparent 75%)`,
          opacity: state === "disconnected" ? 0.2 : 0.75,
          transform: `scale(${activeScale * 1.25})`,
        }}
      />

      {/* Ripple Wave 1 */}
      {(isGeminiSpeaking || (isListening && userVolume > 0.05)) && (
        <div
          className="absolute inset-1 rounded-full border border-[var(--primary)]/40 animate-ping pointer-events-none"
          style={{
            animationDuration: isGeminiSpeaking ? "1.8s" : "2.4s",
            opacity: 0.4,
          }}
        />
      )}

      {/* Ripple Wave 2 */}
      {(isGeminiSpeaking || (isListening && userVolume > 0.08)) && (
        <div
          className="absolute inset-3 rounded-full border border-[var(--accent)]/50 pointer-events-none"
          style={{
            animation: "pulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
            animationDelay: "0.4s",
            opacity: 0.5,
          }}
        />
      )}

      {/* Center Sphere Orb */}
      <div
        className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${activeScale})`,
          background: isGeminiSpeaking
            ? "radial-gradient(circle at 35% 30%, #FF9E1B 0%, #C85227 45%, #5B230E 100%)"
            : isListening
            ? "radial-gradient(circle at 35% 30%, #F5DEB3 0%, #B8860B 50%, #2A1F18 100%)"
            : isConnecting
            ? "radial-gradient(circle at 35% 30%, #E0D5C7 0%, #8B7355 60%, #1A1410 100%)"
            : "radial-gradient(circle at 35% 30%, #6E5C50 0%, #3D322B 60%, #15110E 100%)",
          boxShadow: `0 0 28px ${primaryGlow}, inset 0 2px 8px rgba(255,255,255,0.45)`,
        }}
      >
        {/* Core highlight reflection */}
        <div
          className="absolute top-2 left-2.5 w-5 h-3 rounded-full bg-white/40 blur-[0.8px] transform -rotate-25 pointer-events-none"
        />

        {/* Dynamic sound bars inside orb */}
        <div className="flex items-center gap-0.5 z-10">
          {[0.6, 1.1, 1.6, 1.2, 0.7].map((factor, i) => {
            const h =
              isGeminiSpeaking
                ? Math.max(5, Math.min(22, geminiVolume * 65 * factor))
                : isListening
                ? Math.max(4, Math.min(20, userVolume * 60 * factor))
                : isConnecting
                ? 6 + Math.sin(Date.now() / 200 + i) * 3
                : 4;

            return (
              <div
                key={i}
                className="w-0.5 rounded-full transition-all duration-75"
                style={{
                  height: `${h}px`,
                  background: isGeminiSpeaking
                    ? "#FFFFFF"
                    : isListening
                    ? "#FFFFFF"
                    : "rgba(255,255,255,0.4)",
                  boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VoiceOrb;
