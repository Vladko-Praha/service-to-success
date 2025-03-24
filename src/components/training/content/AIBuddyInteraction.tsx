
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import { getAIBattleBuddy } from "@/services/ai/openai";
import { useToast } from "@/hooks/use-toast";

interface AIBuddyInteractionProps {
  currentClass: any;
}

const AIBuddyInteraction: React.FC<AIBuddyInteractionProps> = ({ currentClass }) => {
  const { toast } = useToast();
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");

  const handleAiBuddyQuestion = async () => {
    if (aiQuestion.trim() === "") return;
    
    setIsLoadingAiResponse(true);
    try {
      // Use the AIBattleBuddy service
      const aiBuddy = getAIBattleBuddy();
      const response = await aiBuddy.askQuestion(aiQuestion, {
        title: currentClass?.title || "Business Training"
      });
      
      setAiResponse(response);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "AI Response Error",
        description: "Sorry, there was an error processing your question. Please try again later.",
        variant: "destructive"
      });
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
