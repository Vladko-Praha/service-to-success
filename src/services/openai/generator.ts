
import OpenAI from 'openai';
import { ChatMessage, OpenAIResponse, GenerateResponseOptions } from './types';
import { DEFAULT_SYSTEM_PROMPT, HTML_TEMPLATE_PROMPT } from './prompts';
import { handleOpenAIError } from './errorHandling';

/**
 * Generates a response from OpenAI based on conversation history
 */
export const generateResponse = async (
  apiKey: string,
  messages: ChatMessage[],
  options: GenerateResponseOptions = {}
): Promise<OpenAIResponse> => {
  const {
    systemPrompt = DEFAULT_SYSTEM_PROMPT,
    model = 'gpt-3.5-turbo',
    temperature = 0.4,
    formatAsHTML = false,
    maxTokens = formatAsHTML ? 2000 : 500
  } = options;

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
      // If HTML format is requested, use the HTML template prompt
      const finalSystemPrompt = formatAsHTML 
        ? `${HTML_TEMPLATE_PROMPT}\n\nADDITIONAL CONTEXT: ${systemPrompt}`
        : systemPrompt;
        
      formattedMessages.push({
        role: 'system',
        content: finalSystemPrompt
      });
    }
    
    // Add the conversation history with explicit type assertions
    messages.forEach(msg => {
      if (msg.role === 'user') {
        // If HTML is requested, append formatting instructions to the last user message
        if (formatAsHTML && messages.indexOf(msg) === messages.length - 1) {
          formattedMessages.push({
            role: 'user',
            content: `${msg.content}
            
Please format your response as an HTML document with interactive elements. Include:
- Text input fields with proper labels
- Text areas for longer content entries
- Visual organization with borders and sections
- Helpful tips in highlighted boxes
- Use inline CSS for styling directly in the HTML`
          });
        } else {
          formattedMessages.push({
            role: 'user',
            content: msg.content
          });
        }
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

    // Use increased token limit for HTML templates
    const completion = await openai.chat.completions.create({
      model,
      messages: formattedMessages,
      max_tokens: maxTokens,
      temperature,
    });

    return {
      success: true,
      content: completion.choices[0]?.message?.content || "No response generated.",
      isHTML: formatAsHTML
    };
  } catch (error: any) {
    return handleOpenAIError(error);
  }
};
