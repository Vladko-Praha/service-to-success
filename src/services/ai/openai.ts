
import { ChatMessage, generateResponse } from "@/services/openaiService";

/**
 * AI battle buddy service specialized for training content
 */
export class AIBattleBuddy {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  /**
   * Ask a question about a specific lesson
   */
  async askQuestion(question: string, lessonContext: {
    title: string,
    section?: string,
    module?: string
  }): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        { role: "user", content: question }
      ];
      
      const systemPrompt = `You are an AI tutor helping a veteran with their business training. 
      The student is currently studying: ${lessonContext.title}. 
      ${lessonContext.section ? `This is part of the ${lessonContext.section} section.` : ''}
      ${lessonContext.module ? `And within the ${lessonContext.module} module.` : ''}
      Provide helpful, concise answers related to business establishment and entrepreneurship.`;
      
      const response = await generateResponse(
        this.apiKey,
        messages,
        systemPrompt,
        'gpt-4o-mini',
        0.4
      );
      
      return response?.content || "I apologize, but I don't have an answer for that right now. Please try rephrasing your question.";
    } catch (error) {
      console.error("Error getting AI response:", error);
      return "Sorry, there was an error processing your question. Please try again later.";
    }
  }
  
  /**
   * Generate feedback on an assignment submission
   */
  async generateFeedback(assignmentAnswer: string, assignmentContext: {
    title: string,
    requirements: string
  }): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        { 
          role: "user", 
          content: `Please provide feedback on my assignment submission: "${assignmentAnswer}"`
        }
      ];
      
      const systemPrompt = `You are an AI teaching assistant providing feedback on student assignments.
      The assignment is: ${assignmentContext.title}
      Requirements: ${assignmentContext.requirements}
      
      Provide constructive feedback highlighting strengths and areas for improvement. Be encouraging but honest.`;
      
      const response = await generateResponse(
        this.apiKey,
        messages,
        systemPrompt,
        'gpt-4o-mini',
        0.4
      );
      
      return response?.content || "I'm sorry, I couldn't generate feedback at this time. Please try again later.";
    } catch (error) {
      console.error("Error generating feedback:", error);
      return "Sorry, there was an error generating feedback for your submission. Please try again later.";
    }
  }
}

/**
 * Get the AI Battle Buddy instance with the appropriate API key
 */
export function getAIBattleBuddy(apiKey: string = "your-api-key"): AIBattleBuddy {
  // In a production app, this would use a securely stored API key
  return new AIBattleBuddy(apiKey);
}
