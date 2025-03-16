
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
  model: string = 'gpt-4o-mini',
  temperature: number = 0.7
): Promise<string> => {
  try {
    const openai = getOpenAIInstance(apiKey);
    
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
    });
    
    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error: any) {
    console.error('Error generating OpenAI response:', error);
    throw new Error(error.message || 'Failed to generate AI response');
  }
};
