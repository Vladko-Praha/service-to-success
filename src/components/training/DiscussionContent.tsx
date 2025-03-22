
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, ThumbsUp, Reply, Flag, Speech } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiscussionContent = () => {
  const [newPostText, setNewPostText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Sample discussion data
  const discussionPosts = [
    {
      id: 1,
      author: "John K.",
      authorRole: "Army Veteran",
      avatar: "",
      date: "2 days ago",
      content: "Has anyone found a good way to apply the supply chain concepts from Module 5 to a service-based business? I'm struggling with how to adapt these principles.",
      likes: 8,
      replies: [
        {
          id: 101,
          author: "Sarah M.",
          authorRole: "Marine Veteran",
          avatar: "",
          date: "1 day ago",
          content: "I've had success treating my service delivery process as a supply chain. For example, in my consulting business, I map out the flow from lead generation to delivery to follow-up as a chain with key checkpoints.",
          likes: 3,
        },
        {
          id: 102,
          author: "Michael D.",
          authorRole: "Navy Veteran",
          avatar: "",
          date: "1 day ago",
          content: "The instructor covered this briefly in the optional video. Check out the resources section - there's a PDF called 'Service Business Supply Chains' that really helped me.",
          likes: 5,
        }
      ]
    },
    {
      id: 2,
      author: "Lisa R.",
      authorRole: "Air Force Veteran",
      avatar: "",
      date: "3 days ago",
      content: "Just completed the Business Intelligence module and it completely changed my approach. I was targeting the wrong customer segment! Anyone else have a major pivot after completing this module?",
      likes: 12,
      replies: []
    }
  ];

  const handleSubmitPost = () => {
    if (!newPostText.trim()) return;
    
    toast({
      title: "Post Submitted",
      description: "Your discussion post has been published successfully.",
    });
    
    setNewPostText("");
  };

  const handleLike = (postId: number) => {
    toast({
      description: "Post liked",
    });
  };

  const handleReply = (postId: number) => {
    // In a real app, this would open a reply form
    toast({
      description: "Reply feature coming soon",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-military-navy">Discussion Forum</h1>
          <p className="text-gray-600">Connect with fellow veterans and discuss course topics</p>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Button>
          <Speech className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Share your question or insight with the community..."
            className="min-h-[120px]"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitPost} disabled={!newPostText.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {discussionPosts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-muted-foreground">{post.authorRole} • {post.date}</div>
                    </div>
                  </div>
                  <p className="mt-2">{post.content}</p>
                  <div className="mt-4 flex gap-4">
                    <button 
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-military-navy"
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-military-navy"
                      onClick={() => handleReply(post.id)}
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-military-navy">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                  </div>
                  
                  {/* Replies */}
                  {post.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex gap-2 items-baseline">
                              <span className="font-medium">{reply.author}</span>
                              <span className="text-xs text-muted-foreground">{reply.date}</span>
                            </div>
                            <p className="text-sm mt-1">{reply.content}</p>
                            <div className="mt-2 flex gap-4">
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-military-navy">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-military-navy">
                                <Reply className="h-3 w-3" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionContent;
