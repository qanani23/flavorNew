import React, { useState, useEffect, useRef } from "react";
import { Coffee, MessageSquare, X, Send, Sparkles, Bot, ArrowUpRight, RotateCcw, Phone, Mail } from "lucide-react";
import { ChatMessage, CoffeeAssistantProps, SuggestedOption } from "./types";
import { CHATBOT_CONFIG } from "./chatbotData";
import {
  createMessage,
  getInitialGreetingMessage,
  generateBotResponse,
} from "./chatbotEngine";
import TypingIndicator from "./TypingIndicator";

export const CoffeeAssistant: React.FC<CoffeeAssistantProps> = ({ onNavigatePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [getInitialGreetingMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list on updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, isTyping]);

  // Handle global Escape key to close widget
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = (textToSend?: string, explicitTopicId?: string) => {
    const query = (textToSend ?? inputValue).trim();
    if (!query || isTyping) return;

    // 1. Append user message
    const userMsg = createMessage(query, "user");
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Simulate natural bot response with typing delay
    setTimeout(() => {
      const { text, suggestedOptions, isFallback } = generateBotResponse(
        query,
        explicitTopicId
      );
      const botMsg = createMessage(text, "bot", suggestedOptions, isFallback);
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, CHATBOT_CONFIG.typingDelayMs);
  };

  const handleOptionClick = (option: SuggestedOption) => {
    // Check if this option is a direct conversion action
    if (option.actionType === "navigate" && option.actionPayload && onNavigatePage) {
      onNavigatePage(option.actionPayload);
      handleSendMessage(option.label, option.topicId);
      return;
    }

    if (option.actionType === "phone" && option.actionPayload) {
      window.location.href = `tel:${option.actionPayload}`;
      return;
    }

    if (option.actionType === "email" && option.actionPayload) {
      window.location.href = `mailto:${option.actionPayload}`;
      return;
    }

    handleSendMessage(option.label, option.topicId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetConversation = () => {
    setMessages([getInitialGreetingMessage()]);
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <div
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 font-sans pointer-events-none flex flex-col items-end"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Coffee Assistant Concierge"
          aria-modal="true"
          className="pointer-events-auto mb-3 w-[calc(100vw-24px)] sm:w-[390px] max-w-[420px] h-[530px] max-h-[76vh] bg-[var(--bg-main)] border border-[var(--border-color)] shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors"
          style={{
            boxShadow:
              "0 22px 50px -12px var(--shadow-color), 0 10px 24px -6px rgba(200, 82, 39, 0.15)",
          }}
        >
          {/* Header */}
          <header className="px-4 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between shrink-0 select-none transition-colors">
            <div className="flex items-center gap-2.5">
              {/* Avatar with Live Indicator */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C85227] via-[#B8451C] to-[#8B3412] flex items-center justify-center text-[#FDFBF7] shadow-sm">
                  <Coffee size={17} strokeWidth={2.2} />
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-surface)] animate-pulse"
                  title="Online"
                />
              </div>

              {/* Title & Status */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[14px] font-semibold text-[var(--text-main)] tracking-tight">
                    {CHATBOT_CONFIG.assistantName}
                  </h2>
                  <span className="inline-flex items-center text-[9.5px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-xs bg-[var(--primary)]/15 text-[var(--primary)] font-semibold">
                    Flavor Coffee PLC
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-mute)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {CHATBOT_CONFIG.statusText} · Addis Ababa
                </p>
              </div>
            </div>

            {/* Actions: Restart & Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetConversation}
                title="Restart conversation"
                aria-label="Restart conversation"
                className="w-8 h-8 flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/6 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Coffee Assistant"
                className="w-8 h-8 flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/6 rounded-lg transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>
          </header>

          {/* Conversation Area */}
          <div
            className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border-color) transparent",
            }}
          >
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isBot ? "items-start" : "items-end"
                  } animate-in fade-in slide-in-from-bottom-1 duration-200`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {isBot && (
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0 mb-0.5">
                        <Bot size={13} strokeWidth={2.2} />
                      </div>
                    )}

                    <div
                      className={`px-3.5 py-2.5 text-[13px] leading-relaxed shadow-2xs ${
                        isBot
                          ? "bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-color)] rounded-2xl rounded-tl-xs"
                          : "bg-[var(--primary)] text-[var(--primary-fg)] rounded-2xl rounded-tr-xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[var(--text-mute)] mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Contextual Follow-up Chips & Conversion Actions */}
                  {isBot && msg.suggestedOptions && msg.suggestedOptions.length > 0 && (
                    <div className="mt-2.5 w-full flex flex-col gap-1.5 pl-8">
                      <p className="text-[11px] font-medium text-[var(--text-sub)] flex items-center gap-1">
                        <Sparkles size={12} className="text-[var(--accent)]" />
                        {msg.isFallback ? "Explore Topics:" : "Related Topics & Actions:"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedOptions.map((opt) => {
                          const isMainMenu = opt.topicId === "main-menu" || opt.label.includes("Main");
                          const isAction = opt.actionType === "navigate" || opt.actionType === "phone" || opt.actionType === "email";

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleOptionClick(opt)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[12px] font-medium rounded-lg transition-all duration-150 shadow-2xs cursor-pointer group active:scale-97 ${
                                isAction
                                  ? "bg-[var(--primary)]/15 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-[var(--primary-fg)] border border-[var(--primary)]/30 font-semibold"
                                  : isMainMenu
                                  ? "bg-[var(--bg-surface)] hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-[var(--text-sub)] border border-[var(--border-color)]"
                                  : "bg-[var(--bg-elevated)] hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-[var(--primary)]"
                              }`}
                            >
                              {opt.actionType === "phone" && <Phone size={11} />}
                              {opt.actionType === "email" && <Mail size={11} />}
                              <span>{opt.label}</span>
                              <ArrowUpRight
                                size={11}
                                className="opacity-40 group-hover:opacity-100 transition-opacity"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 pl-1">
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <footer className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-color)] shrink-0 transition-colors">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/25 px-3 py-1.5 transition-all shadow-2xs"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about origins, roasting, export..."
                aria-label="Type your message to Coffee Assistant"
                className="flex-1 text-[13px] text-[var(--text-main)] placeholder:text-[var(--text-mute)] bg-transparent border-none outline-none focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-7 h-7 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:bg-[var(--text-main)]/10 text-[var(--primary-fg)] disabled:text-[var(--text-mute)] flex items-center justify-center transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed active:scale-95"
              >
                <Send size={13} className="-ml-0.5" />
              </button>
            </form>
            <p className="text-[10px] text-center text-[var(--text-mute)] mt-1.5 select-none">
              Flavor Coffee PLC · Customer Concierge
            </p>
          </footer>
        </div>
      )}

      {/* ── Floating Circular Trigger Button (Bottom-Right) ── */}
      <div className="relative pointer-events-auto flex items-center">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Coffee Assistant" : "Open Coffee Assistant"}
          className={`relative group w-14 h-14 rounded-full bg-gradient-to-br from-[#C85227] via-[#B8451C] to-[#8B3412] text-[#FDFBF7] flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#FDFBF7]/35 ${
            isOpen ? "ring-4 ring-[#C85227]/30" : ""
          }`}
          style={{
            boxShadow:
              "0 8px 24px -4px rgba(200, 82, 39, 0.45), 0 4px 12px -2px rgba(15, 12, 10, 0.2)",
          }}
        >
          {/* Subtle Attention Pulse Ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#C85227] animate-ping opacity-25 pointer-events-none" />
          )}

          {/* Icon Switch */}
          {isOpen ? (
            <X size={22} className="transition-transform duration-250 rotate-0" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Coffee size={22} strokeWidth={2.2} className="group-hover:rotate-6 transition-transform" />
              <Sparkles
                size={11}
                className="absolute -top-1.5 -right-2 text-[#F4D06F] animate-pulse"
              />
            </div>
          )}

          {/* Unread Attention Dot */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#B8860B] border-2 border-[#FDFBF7] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CoffeeAssistant;
