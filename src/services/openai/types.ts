
// Define message types that match OpenAI's expected format
export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface OpenAIResponse {
  success: boolean;
  content: string;
  error?: any;
  isHTML?: boolean;
}

export interface GenerateResponseOptions {
  systemPrompt?: string;
  model?: string;
  temperature?: number;
  formatAsHTML?: boolean;
  maxTokens?: number;
}
