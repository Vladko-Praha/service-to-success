
import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

export const getOpenAIInstance = (apiKey: string): OpenAI => {
  // Create a new instance if one doesn't exist or if the API key has changed
  if (!openaiInstance || openaiInstance.apiKey !== apiKey) {
    openaiInstance = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // For client-side usage
    });
  }
  
  return openaiInstance;
};

export const generateResponse = async (
  apiKey: string,
  prompt: string,
  systemPrompt: string = '',
  conversationHistory: Array<{role: string, content: string}> = [],
  model: string = 'gpt-4o-mini',
  temperature: number = 0.7
): Promise<string> => {
  try {
    const openai = getOpenAIInstance(apiKey);
    
    // Convert message objects to the correct type for the OpenAI API
    const messages: Array<OpenAI.ChatCompletionMessageParam> = [];
    
    // Add system message if present
    if (systemPrompt) {
      messages.push({ 
        role: 'system', 
        content: systemPrompt 
      });
    }
    
    // Add conversation history
    for (const msg of conversationHistory) {
      if (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system') {
        messages.push({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        });
      }
    }
    
    // Add the current user prompt
    messages.push({ 
      role: 'user', 
      content: prompt 
    });
    
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: 500,
    });
    
    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error: any) {
    console.error('Error generating OpenAI response:', error);
    
    // Handle quota exceeded error specifically
    if (error.message?.includes('quota') || error.message?.includes('exceeded') || error.code === 'insufficient_quota') {
      throw new Error('You have exceeded your OpenAI API quota. Please check your billing details on the OpenAI website.');
    }
    
    throw new Error(error.message || 'Failed to generate AI response');
  }
};
