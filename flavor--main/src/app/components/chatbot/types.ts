export type MessageSender = "bot" | "user";

export interface SuggestedOption {
  id: string;
  label: string;
  query: string;
  topicId?: string;
  actionType?: "navigate" | "external" | "phone" | "email";
  actionPayload?: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  suggestedOptions?: SuggestedOption[];
  isFallback?: boolean;
}

export interface QATopic {
  id: string;
  title: string;
  category: "coffee" | "origins" | "roasting" | "products" | "export" | "contact" | "company" | "contrast";
  keywords: string[];
  phrases: string[];
  contrastKeywords?: string[];
  answer: string;
  followUps: SuggestedOption[];
}

export interface ChatbotConfig {
  companyName: string;
  assistantName: string;
  statusText: string;
  welcomeMessage: string;
  typingDelayMs: number;
  mainMenuOptions: SuggestedOption[];
  fallbackMessage: string;
}

export interface CoffeeAssistantProps {
  onNavigatePage?: (pageName: string) => void;
}
