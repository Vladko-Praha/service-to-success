
import OpenAI from 'openai';

// Define message types that match OpenAI's expected format
export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

/**
 * Default system prompt with rich context about the veterans business program
 */
export const DEFAULT_SYSTEM_PROMPT = `You are an AI Battle Buddy for military veterans learning to establish and run online businesses. 

CONTEXT: You are part of a training program that helps US military veterans transition to civilian life by teaching them how to build and operate successful online businesses.

YOUR ROLE: Provide practical, actionable advice tailored to veterans with military experience who are new to entrepreneurship. Focus on clear steps, use military analogies when helpful, and suggest specific resources designed for veteran entrepreneurs.

TOPICS TO HELP WITH:
- Business plan development
- Market research and competitor analysis
- Setting up legal business structures (LLC, S-Corp)
- Marketing strategies with limited budgets
- Finding veteran-specific grants and funding
- Client acquisition techniques
- Pricing strategies
- Online presence establishment

Always be direct, supportive, and tactical in your guidance. Relate your advice to military experience when relevant. Remember that these veterans are transitioning to civilian business life and may need help translating their military skills to business applications.`;

/**
 * Validates an OpenAI API key by testing a simple request
 * @param apiKey The OpenAI API key to validate
 * @returns A promise that resolves to true if the key is valid, false otherwise
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Clean the API key by trimming whitespace
    const cleanApiKey = apiKey.trim();
    
    if (!cleanApiKey.startsWith('sk-')) {
      console.warn('API key does not start with "sk-". This may not be a valid OpenAI key format.');
    }
    
    const openai = new OpenAI({
      apiKey: cleanApiKey,
      dangerouslyAllowBrowser: true // Only for client-side usage in educational context
    });

    // Use a simpler endpoint for validation that's less likely to hit quota issues
    const response = await openai.models.list();
    return !!response.data;
  } catch (error: any) {
    console.error('Error validating API key:', error);
    
    // Log more detailed error information
    if (error.status) {
      console.log(`Status code: ${error.status}`);
    }
    if (error.message) {
      console.log(`Error message: ${error.message}`);
    }
    
    return false;
  }
};

/**
 * Generates a response from OpenAI based on conversation history
 * Uses a simpler approach and falls back to GPT-3.5-Turbo if needed
 * @param apiKey The OpenAI API key
 * @param messages Array of messages in the conversation
 * @param systemPrompt Optional system prompt to guide the assistant
 * @param model OpenAI model to use, defaults to gpt-3.5-turbo now for better compatibility
 * @param temperature Optional temperature parameter (0.0 to 1.0) to control response creativity
 * @returns The assistant's response
 */
export const generateResponse = async (
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string = DEFAULT_SYSTEM_PROMPT,
  model: string = 'gpt-3.5-turbo',
  temperature: number = 0.4
): Promise<{ success: boolean; content: string; error?: any }> => {
  try {
    // Clean the API key by trimming whitespace
    const cleanApiKey = apiKey.trim();
    
    const openai = new OpenAI({
      apiKey: cleanApiKey,
      dangerouslyAllowBrowser: true
    });

    // Simplify message creation to reduce potential errors
    const formattedMessages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = [];
    
    // Always add system message first if provided
    if (systemPrompt) {
      formattedMessages.push({
        role: 'system',
        content: systemPrompt
      });
    }
    
    // Add the conversation history with explicit type assertions
    messages.forEach(msg => {
      if (msg.role === 'user') {
        formattedMessages.push({
          role: 'user',
          content: msg.content
        });
      } else if (msg.role === 'assistant') {
        formattedMessages.push({
          role: 'assistant', 
          content: msg.content
        });
      } else if (msg.role === 'system') {
        formattedMessages.push({
          role: 'system',
          content: msg.content
        });
      }
    });

    // Log the complete messages being sent to OpenAI for debugging
    console.log('Sending to OpenAI:', JSON.stringify(formattedMessages));

    // Use more focused temperature for better, more consistent responses
    const completion = await openai.chat.completions.create({
      model,
      messages: formattedMessages,
      max_tokens: 500, // Increased token limit for more complete answers
      temperature, // Lower temperature for more focused responses
    });

    return {
      success: true,
      content: completion.choices[0]?.message?.content || "No response generated."
    };
  } catch (error: any) {
    console.error('Error generating OpenAI response:', error);
    
    // Enhanced error logging
    console.log('Detailed error info:');
    console.log('Status:', error.status);
    console.log('Message:', error.message);
    console.log('Error type:', error.type);
    if (error.error) {
      console.log('API Error code:', error.error.code);
      console.log('API Error message:', error.error.message);
    }
    
    // Check for quota exceeded errors specifically with more patterns
    if (
      error.status === 429 || 
      (error.error && (
        error.error.code === 'insufficient_quota' || 
        error.error.type === 'insufficient_quota' ||
        (error.error.message && error.error.message.includes('quota'))
      )) ||
      (error.message && error.message.includes('quota'))
    ) {
      return {
        success: false,
        content: "API quota exceeded. This could be due to rate limits on free accounts even without billing usage. Try waiting a few minutes before sending another message, or add a payment method to your OpenAI account.",
        error: {
          type: 'quota_exceeded',
          message: error.message || 'Rate limit or quota issue detected.'
        }
      };
    }
    
    // Check for invalid API key with more patterns
    if (
      error.status === 401 || 
      (error.message && (
        error.message.includes('API key') || 
        error.message.includes('authentication') ||
        error.message.includes('auth')
      ))
    ) {
      return {
        success: false,
        content: "Invalid API key. Please check your API key and try again.",
        error: {
          type: 'invalid_key',
          message: 'Your API key is invalid or has been revoked.'
        }
      };
    }

    // Fallback error
    return {
      success: false,
      content: "Error connecting to OpenAI. This might be a temporary issue - please try again in a few minutes.",
      error
    };
  }
};
