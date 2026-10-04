import React, { useState } from "react";
import { Mic, Radio, Sparkles } from "lucide-react";
import VoiceAssistantModal from "./VoiceAssistantModal";

export interface VoiceAssistantProps {
  onNavigatePage?: (page: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onNavigatePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Floating Circular Trigger Button (Beside CoffeeAssistant) ── */}
      <div
        className="fixed bottom-3 right-[78px] sm:bottom-6 sm:right-[92px] z-50 font-sans pointer-events-auto flex items-center"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Realtime Gemini Voice Assistant"
          className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-[#B8860B] via-[#D4AF37] to-[#8C6D1F] text-[#FDFBF7] flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#FDFBF7]/35"
          style={{
            boxShadow:
              "0 8px 24px -4px rgba(184, 134, 11, 0.45), 0 4px 12px -2px rgba(15, 12, 10, 0.2)",
          }}
        >
          {/* Subtle Attention Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-[#B8860B] animate-ping opacity-25 pointer-events-none" />

          {/* Mic Icon with Sparkle */}
          <div className="relative flex items-center justify-center">
            <Mic size={22} strokeWidth={2.2} className="group-hover:scale-110 transition-transform" />
            <Sparkles
              size={11}
              className="absolute -top-1.5 -right-2 text-white animate-pulse"
            />
          </div>

          {/* Active Live Dot */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#C85227] border-2 border-[#FDFBF7] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>
        </button>
      </div>

      {/* ── Realtime Gemini Live Modal ── */}
      <VoiceAssistantModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigatePage={onNavigatePage}
      />
    </>
  );
};

export default VoiceAssistant;
