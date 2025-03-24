
import { OpenAIResponse } from './types';

/**
 * Handles OpenAI API errors and returns appropriate error messages
 * @param error Error from OpenAI API call
 * @returns Formatted error response
 */
export const handleOpenAIError = (error: any): OpenAIResponse => {
  console.error('Error with OpenAI request:', error);
  
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
};
