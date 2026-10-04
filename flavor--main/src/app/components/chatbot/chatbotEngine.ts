import { ChatMessage, MessageSender, QATopic, SuggestedOption } from "./types";
import { CHATBOT_CONFIG, QA_KNOWLEDGE_BASE, MAIN_MENU_OPTIONS } from "./chatbotData";

/**
 * Formats the current time for message timestamps (e.g. "1:24 PM")
 */
export function formatCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Creates a formatted ChatMessage object
 */
export function createMessage(
  text: string,
  sender: MessageSender,
  suggestedOptions?: SuggestedOption[],
  isFallback?: boolean
): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    sender,
    text,
    timestamp: formatCurrentTime(),
    suggestedOptions,
    isFallback,
  };
}

/**
 * Creates the initial welcome greeting from the assistant
 */
export function getInitialGreetingMessage(): ChatMessage {
  return createMessage(
    CHATBOT_CONFIG.welcomeMessage,
    "bot",
    CHATBOT_CONFIG.mainMenuOptions
  );
}

/**
 * Normalizes singular/plural word forms for robust matching
 */
function normalizeWordForm(word: string): string {
  if (word.endsWith("ies") && word.length > 4) {
    return word.slice(0, -3) + "y"; // e.g. varieties -> variety, countries -> country
  }
  if (word.endsWith("es") && word.length > 4) {
    if (word.endsWith("shes") || word.endsWith("ches") || word.endsWith("sses") || word.endsWith("xes")) {
      return word.slice(0, -2); // e.g. processes -> process
    }
  }
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) {
    return word.slice(0, -1); // e.g. beans -> bean, origins -> origin, orders -> order, roasters -> roaster
  }
  return word;
}

/**
 * Normalizes input text for resilient keyword and phrase matching:
 * - Converts to lowercase
 * - Expands common contractions
 * - Strips punctuation
 * - Normalizes whitespace
 */
export function normalizeText(input: string): string {
  if (!input) return "";

  let text = input.toLowerCase();

  // Expand common contractions
  const contractions: [RegExp, string][] = [
    [/\bwhat['’]s\b/g, "what is"],
    [/\bwhere['’]s\b/g, "where is"],
    [/\bhow['’]s\b/g, "how is"],
    [/\bwho['’]s\b/g, "who is"],
    [/\bthere['’]s\b/g, "there is"],
    [/\bdon['’]t\b/g, "do not"],
    [/\bdoesn['’]t\b/g, "does not"],
    [/\bdidn['’]t\b/g, "did not"],
    [/\bcan['’]t\b/g, "cannot"],
    [/\bwon['’]t\b/g, "will not"],
    [/\bisn['’]t\b/g, "is not"],
    [/\baren['’]t\b/g, "are not"],
    [/\bwasn['’]t\b/g, "was not"],
    [/\bi['’]m\b/g, "i am"],
    [/\byou['’]re\b/g, "you are"],
    [/\bwe['’]re\b/g, "we are"],
    [/\bthey['’]re\b/g, "they are"],
    [/\bit['’]s\b/g, "it is"],
  ];

  for (const [pattern, replacement] of contractions) {
    text = text.replace(pattern, replacement);
  }

  // Strip emojis and punctuation
  text = text.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’+–—[\]\\|<>@]/g, " ");

  // Collapse multiple spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Detects explicitly unrelated non-business intents (weather, joke, politics, math, etc.)
 * to ensure the chatbot gracefully triggers fallback instead of false-positive matches.
 */
function isUnrelatedIntent(normalizedQuery: string): boolean {
  const unrelatedPatterns = [
    /\b(weather|temperature|forecast|rain today|sunny|snow)\b/,
    /\b(president|prime minister|government|politics|election|parliament)\b/,
    /\b(joke|funny|riddle|humor|make me laugh|meme)\b/,
    /\b(crypto|bitcoin|ethereum|stock market|shares|forex)\b/,
    /\b(football|soccer|premier league|champions league|nba|basketball|match score)\b/,
    /\b(python code|javascript code|write code|hack|programming)\b/,
    /\b(recipe for|how to cook pasta|pizza|burger)\b/,
    /\b(lyrics|song|movie|actor|celebrity)\b/,
  ];

  return unrelatedPatterns.some((pattern) => pattern.test(normalizedQuery));
}

/**
 * Checks for simple word similarity or typos (Levenshtein distance <= 2)
 */
function isFuzzyMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 2) return false;
  if (a.length <= 3 || b.length <= 3) return a === b;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[b.length][a.length];
  return distance <= (a.length >= 7 ? 2 : 1);
}

/**
 * Core Matching Engine:
 * Deterministically maps user input to the highest-ranking predefined Q&A topic.
 */
export function findBestMatchingTopic(
  rawQuery: string,
  explicitTopicId?: string
): { topic: QATopic | null; confidence: number } {
  // 1. Direct topicId navigation if clicked directly
  if (explicitTopicId) {
    const directMatch = QA_KNOWLEDGE_BASE.find((t) => t.id === explicitTopicId);
    if (directMatch) {
      return { topic: directMatch, confidence: 200 };
    }
  }

  const query = normalizeText(rawQuery);
  if (!query) {
    return { topic: null, confidence: 0 };
  }

  // 2. Immediate guard for unrelated intents (e.g. weather, joke, president)
  if (isUnrelatedIntent(query)) {
    return { topic: null, confidence: 0 };
  }

  const rawTokens = query.split(" ").filter((t) => t.length > 1);
  const normalizedTokens = rawTokens.map(normalizeWordForm);

  // 3. High-priority contrast checks (e.g. Somalia, Brazil, Colombia, Kenya, Robusta, Instant)
  const contrastTopics = QA_KNOWLEDGE_BASE.filter(
    (t) => t.category === "contrast" && t.contrastKeywords && t.contrastKeywords.length > 0
  );

  for (const topic of contrastTopics) {
    for (const ck of topic.contrastKeywords!) {
      const normalizedCk = normalizeText(ck);
      if (
        query.includes(normalizedCk) ||
        normalizedTokens.includes(normalizedCk) ||
        normalizedTokens.some((tok) => isFuzzyMatch(tok, normalizedCk))
      ) {
        return { topic, confidence: 160 };
      }
    }
  }

  // 4. Multi-tier deterministic scoring across knowledge base
  let bestTopic: QATopic | null = null;
  let highestScore = 0;

  for (const topic of QA_KNOWLEDGE_BASE) {
    let score = 0;

    // Check exact phrase matches (Highest weight: +120 to +150 per match)
    for (const phrase of topic.phrases) {
      const normalizedPhrase = normalizeText(phrase);
      if (query === normalizedPhrase) {
        score += 150;
      } else if (query.includes(normalizedPhrase)) {
        score += 100;
      } else {
        // Partial phrase overlap
        const phraseTokens = normalizedPhrase.split(" ").map(normalizeWordForm);
        const matchedTokens = phraseTokens.filter((pt) =>
          normalizedTokens.includes(pt)
        );
        if (matchedTokens.length >= 3 && matchedTokens.length === phraseTokens.length) {
          score += 75;
        } else if (matchedTokens.length >= 2 && matchedTokens.length === phraseTokens.length) {
          score += 45;
        }
      }
    }

    // Check keyword & phrase tokens
    for (const kw of topic.keywords) {
      const normalizedKw = normalizeText(kw);

      if (normalizedKw.includes(" ")) {
        // Multi-word keyword phrase
        if (query.includes(normalizedKw)) {
          score += 50;
        }
      } else {
        // Single keyword token match with singular/plural support
        const baseKw = normalizeWordForm(normalizedKw);
        const exactTokenMatch =
          normalizedTokens.includes(baseKw) || rawTokens.includes(normalizedKw);
        const fuzzyTokenMatch =
          !exactTokenMatch &&
          normalizedTokens.some((tok) => isFuzzyMatch(tok, baseKw));

        if (exactTokenMatch || fuzzyTokenMatch) {
          // Weight keywords based on specificity
          if (["coffee", "bean", "ethiopian", "ethiopia"].includes(baseKw)) {
            score += 4; // Generic terms carry modest weight
          } else if (
            [
              "yirgacheffe",
              "guji",
              "sidama",
              "harrar",
              "kaffa",
              "probat",
              "roast",
              "roasting",
              "cupping",
              "grainpro",
              "djibouti",
              "moq",
              "sample",
              "dhl",
              "wholesale",
              "oem",
              "certification",
              "organic",
              "contact",
              "address",
              "phone",
              "email",
              "founder",
              "tadesse",
            ].includes(baseKw)
          ) {
            score += 26; // High-value domain terms carry strong weight
          } else {
            score += baseKw.length >= 6 ? 16 : 9;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  // Confidence threshold: at least 15 points
  if (highestScore >= 15 && bestTopic) {
    return { topic: bestTopic, confidence: highestScore };
  }

  return { topic: null, confidence: highestScore };
}

/**
 * Generates an intelligent bot response from the local Q&A engine
 */
export function generateBotResponse(
  userQuery: string,
  explicitTopicId?: string
): {
  text: string;
  suggestedOptions: SuggestedOption[];
  isFallback: boolean;
} {
  const match = findBestMatchingTopic(userQuery, explicitTopicId);

  if (match.topic) {
    return {
      text: match.topic.answer,
      suggestedOptions: match.topic.followUps,
      isFallback: false,
    };
  }

  // Fallback response with main menu options
  return {
    text: CHATBOT_CONFIG.fallbackMessage,
    suggestedOptions: MAIN_MENU_OPTIONS,
    isFallback: true,
  };
}
