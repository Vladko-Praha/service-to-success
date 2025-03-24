
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiscussionSection: React.FC = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Array<{id: string; user: string; text: string; timestamp: Date}>>([
    {
      id: "1",
      user: "Jane Smith",
      text: "This lesson was incredibly helpful for understanding how to set up my business structure. I particularly liked the section on LLC vs. S-Corp.",
      timestamp: new Date(2023, 5, 15)
    },
    {
      id: "2",
      user: "Mike Johnson",
      text: "Does anyone have additional resources on filing paperwork in Arizona specifically? I'm still a bit confused about the local requirements.",
      timestamp: new Date(2023, 5, 16)
    }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const comment = {
      id: Date.now().toString(),
      user: "Current User",
      text: newComment,
      timestamp: new Date()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted to the discussion."
    });
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Discussion ({comments.length})</h3>
      
      <div className="space-y-4 mb-6">
        {comments.map(comment => (
          <div key={comment.id} className="bg-military-beige/10 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{comment.user}</p>
                <p className="text-xs text-muted-foreground">
                  {comment.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or question about this lesson..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleAddComment}
            disabled={newComment.trim() === ""}
            className="bg-military-olive hover:bg-military-olive/90"
          >
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionSection;
