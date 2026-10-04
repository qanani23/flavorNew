import React from "react";
import { Bot } from "lucide-react";

interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] w-fit shadow-xs animate-in fade-in slide-in-from-bottom-1 duration-200 ${className}`}
      role="status"
      aria-label="Coffee Assistant is typing"
    >
      <div className="w-5 h-5 rounded-full bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)] shrink-0">
        <Bot size={13} strokeWidth={2.2} />
      </div>

      <div className="flex items-center gap-1.5 py-0.5 px-1">
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce"
          style={{ animationDuration: "900ms", animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce"
          style={{ animationDuration: "900ms", animationDelay: "180ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce"
          style={{ animationDuration: "900ms", animationDelay: "360ms" }}
        />
      </div>
      <span className="sr-only">Typing...</span>
    </div>
  );
};

export default TypingIndicator;
