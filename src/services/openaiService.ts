
import OpenAI from 'openai';

// Define message types that match OpenAI's expected format
export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

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
 * @returns The assistant's response
 */
export const generateResponse = async (
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt?: string,
  model: string = 'gpt-3.5-turbo'
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
    
    // Add system message first if provided
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

    // Use lower values for tokens and temperature to reduce likelihood of quota issues
    const completion = await openai.chat.completions.create({
      model,
      messages: formattedMessages,
      max_tokens: 300, // Reduced from 500
      temperature: 0.5, // Reduced from 0.7
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
