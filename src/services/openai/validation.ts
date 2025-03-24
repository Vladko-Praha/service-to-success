
import OpenAI from 'openai';

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
