import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, User, UserPlus, MessageSquare, Share2, ThumbsUp, Flag, MoreHorizontal, Send, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MediaAttachmentButton, { MediaAttachment } from "./MediaAttachmentButton";
import MediaPreview from "./MediaPreview";

type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  userLiked: boolean;
  attachments?: MediaAttachment[];
};

type Team = {
  id: string;
  name: string;
  members: number;
  description: string;
  unreadPosts: number;
};

const mockPosts: Post[] = [
  {
    id: "post1",
    author: {
      id: "user1",
      name: "Major James Wilson",
      role: "Business Strategy Advisor"
    },
    content: "Just shared a new resource on securing VA small business loans in the Resources section. Check it out if you're in the funding stage of your venture.",
    timestamp: "2 hours ago",
    likes: 15,
    comments: 3,
    userLiked: false,
    attachments: [
      {
        id: "doc-business-structure-comparison",
        type: "document",
        name: "VA Business Loans Guide.pdf",
        size: 1254000
      }
    ]
  },
  {
    id: "post2",
    author: {
      id: "user2",
      name: "Corporal Alex Rivera",
      role: "Recent Program Graduate"
    },
    content: "My e-commerce business just hit its first $10K month! Thank you to everyone in the program who supported me through the launch phase. Happy to answer questions from current participants.",
    timestamp: "Yesterday",
    likes: 34,
    comments: 8,
    userLiked: true
  },
  {
    id: "post3",
    author: {
      id: "user3",
      name: "Sgt. Rachel Thompson",
      role: "Marketing Specialist"
    },
    content: "Reminder: Our weekly marketing strategy session is tomorrow at 1900 hours. We'll be covering social media algorithms and how to work with them for maximum reach.",
    timestamp: "2 days ago",
    likes: 12,
    comments: 2,
    userLiked: false
  },
  {
    id: "post4",
    author: {
      id: "user4",
      name: "Lt. Michael Chen",
      role: "Technology Integration Lead"
    },
    content: "Looking for beta testers for my new SaaS product aimed at helping veteran-owned businesses streamline operations. If interested, send me a direct message.",
    timestamp: "3 days ago",
    likes: 19,
    comments: 7,
    userLiked: false
  }
];

const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Alpha Entrepreneurs",
    members: 15,
    description: "Tech startups and digital businesses",
    unreadPosts: 3
  },
  {
    id: "team2",
    name: "Bravo Business Group",
    members: 12,
    description: "Retail and service-based businesses",
    unreadPosts: 0
  },
  {
    id: "team3",
    name: "Charlie Commerce",
    members: 18,
    description: "E-commerce and online retail",
    unreadPosts: 2
  },
  {
    id: "team4",
    name: "Delta Development",
    members: 10,
    description: "Real estate and property ventures",
    unreadPosts: 0
  }
];

interface FireTeamNetworkProps {
  selectedPostId?: string | null;
}

const FireTeamNetwork: React.FC<FireTeamNetworkProps> = ({ selectedPostId }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockPosts);
  const [teams, setTeams] = useState(mockTeams);
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [postAttachments, setPostAttachments] = useState<MediaAttachment[]>([]);

  React.useEffect(() => {
    if (selectedPostId) {
      setActiveTab("feed");
      console.log("Selected post ID:", selectedPostId);
    }
  }, [selectedPostId]);

  const handlePostLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.userLiked ? post.likes - 1 : post.likes + 1,
              userLiked: !post.userLiked 
            } 
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim() && postAttachments.length === 0) {
      toast({
        title: "Empty Post",
        description: "Please add text or an attachment to your post",
        variant: "destructive"
      });
      return;
    }
    
    const newPostObj: Post = {
      id: `post${posts.length + 1}`,
      author: {
        id: "current-user",
        name: "You",
        role: "Program Participant"
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      userLiked: false,
      attachments: postAttachments.length > 0 ? [...postAttachments] : undefined
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setPostAttachments([]);
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with your fire team network.",
    });
  };

  const handleJoinTeam = (teamId: string) => {
    toast({
      title: "Team Joined",
      description: "You have successfully joined the team. You can now access all team content.",
    });
  };

  const handleAddAttachment = (attachment: MediaAttachment) => {
    setPostAttachments(prev => [...prev, attachment]);
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setPostAttachments(prev => prev.filter(a => a.id !== attachmentId));
  };

  const filteredPosts = posts.filter(
    post => post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeams = teams.filter(
    team => team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-military-navy">Fire Team Network</h3>
        
        <div className="flex gap-2">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts and teams..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button
            onClick={() => toast({
              title: "Coming Soon",
              description: "Find team members feature will be available in the next update."
            })}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Find Members
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 bg-military-beige/30 w-40">
          <TabsTrigger 
            value="feed" 
            className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Feed
          </TabsTrigger>
          <TabsTrigger 
            value="teams" 
            className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Teams
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="mt-4">
          <Card className="mb-4 border-2 border-military-navy/20">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 bg-military-navy">
                    <User className="h-6 w-6 text-white" />
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share an update with your fire team..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-20"
                    />
                    
                    {postAttachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {postAttachments.map(attachment => (
                          <div key={attachment.id} className="relative inline-flex">
                            <MediaPreview attachment={attachment} compact />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full bg-muted"
                              onClick={() => handleRemoveAttachment(attachment.id)}
                            >
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        <MediaAttachmentButton onAttachmentSelect={handleAddAttachment} />
                      </div>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPost.trim() && postAttachments.length === 0}
                        size="sm"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ScrollArea className="h-[450px] rounded-md">
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-military-beige">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 bg-military-navy">
                        <User className="h-6 w-6 text-white" />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{post.author.name}</p>
                            {post.author.role && (
                              <p className="text-xs text-muted-foreground">{post.author.role}</p>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="mt-2">{post.content}</p>
                        
                        {post.attachments && post.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {post.attachments.map(attachment => (
                              <MediaPreview 
                                key={attachment.id} 
                                attachment={attachment} 
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4 pt-2 border-t">
                          <div className="flex items-center gap-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handlePostLike(post.id)}
                              className={post.userLiked ? "text-military-navy font-medium" : ""}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {post.likes > 0 && post.likes}
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({
                                title: "Coming Soon",
                                description: "Comments feature will be available in the next update."
                              })}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {post.comments > 0 && post.comments}
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({
                                title: "Coming Soon",
                                description: "Sharing feature will be available in the next update."
                              })}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toast({
                                title: "Post Reported",
                                description: "Thank you for helping keep our community safe.",
                              })}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No posts match your search criteria.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="border-military-beige">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{team.description}</p>
                    </div>
                    {team.unreadPosts > 0 && (
                      <Badge className="bg-military-olive">{team.unreadPosts} new</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{team.members} members</span>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinTeam(team.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Join Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 border-military-navy/20 flex items-center justify-center">
              <CardContent className="text-center p-6">
                <Button 
                  variant="outline" 
                  className="gap-2 border-military-navy/50"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "Create Team feature will be available in the next update."
                  })}
                >
                  <Plus className="h-4 w-4" />
                  Create New Team
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Start a specialized group focused on your area of interest</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FireTeamNetwork;
