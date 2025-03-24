
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import { generateResponse } from "@/services/openaiService";

interface AIBuddyInteractionProps {
  currentClass: any;
}

const AIBuddyInteraction: React.FC<AIBuddyInteractionProps> = ({ currentClass }) => {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");

  const handleAiBuddyQuestion = async () => {
    if (aiQuestion.trim() === "") return;
    
    setIsLoadingAiResponse(true);
    try {
      const response = await generateResponse(
        "your-api-key", // This should be retrieved from user settings or env
        [
          { role: "user", content: aiQuestion }
        ],
        `You are an AI tutor helping a veteran with their business training. 
        The student is currently studying: ${currentClass?.title}. 
        Provide helpful, concise answers related to business establishment and entrepreneurship.`
      );
      
      setAiResponse(response?.content || "I apologize, but I don't have an answer for that right now. Please try rephrasing your question.");
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse("Sorry, there was an error processing your question. Please try again later.");
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  return (
    <div className="mt-8 border rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Bot className="h-5 w-5 mr-2 text-military-olive" />
        <h3 className="font-medium">Ask AI Battle Buddy</h3>
      </div>
      
      <div className="space-y-4">
        <Textarea 
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Ask a question about this lesson..."
          className="min-h-[80px]"
        />
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAiBuddyQuestion}
            disabled={isLoadingAiResponse || aiQuestion.trim() === ""}
            className="bg-military-olive hover:bg-military-olive/90"
          >
            {isLoadingAiResponse ? "Thinking..." : "Ask Question"}
          </Button>
        </div>
        
        {aiResponse && (
          <div className="mt-4 bg-military-beige/10 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">AI Battle Buddy Response:</p>
            <p className="text-sm">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBuddyInteraction;
