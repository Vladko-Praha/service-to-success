import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  FileQuestion, 
  Folder, 
  Users, 
  CheckCircle, 
  Timer, 
  Terminal,
  Building,
  Flag,
  PlusCircle,
  Download,
  Video,
  Bot,
  Send,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { trainingData } from "./trainingData";
import PeerEvaluation from "./PeerEvaluation";
import StudentLibrary from "./StudentLibrary";
import { toast } from "@/components/ui/use-toast";
import { generateResponse } from "@/services/openaiService";

interface TrainingContentProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  activeView: string;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
}

const TrainingContent = ({ 
  activeSection, 
  activeModule, 
  activeClass, 
  activeView,
  setActiveSection,
  setActiveModule,
  setActiveClass
}: TrainingContentProps) => {
  const [currentSection, setCurrentSection] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [currentClass, setCurrentClass] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAIBuddy, setShowAIBuddy] = useState(false);
  const [aiQuestion, setAIQuestion] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [comments, setComments] = useState<{ id: string; author: string; text: string; timestamp: Date; likes: number }[]>([]);
  const [newComment, setNewComment] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // New state for video collapsible
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Placeholder for demo video URL
  const lessonVideoUrl = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";
  
  // Placeholder for downloadable resources
  const additionalResources = [
    { name: "Lesson Slides", type: "pdf", url: "#" },
    { name: "Practice Worksheet", type: "docx", url: "#" },
    { name: "Example Templates", type: "zip", url: "#" }
  ];

  useEffect(() => {
    // Find current section, module and class
    const section = trainingData.find(s => s.id === activeSection);
    setCurrentSection(section);
    
    if (section) {
      const module = section.modules.find(m => m.id === activeModule);
      setCurrentModule(module);
      
      if (module) {
        const classItem = module.classes.find(c => c.id === activeClass);
        setCurrentClass(classItem);
      }
    }
    
    // Get completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }

    // Load comments for this lesson (would be from API in real app)
    // For demo, we'll use mock data
    setComments([
      {
        id: "1", 
        author: "John Veteran",
        text: "This lesson helped me understand the key differences between military and business operations. Great content!",
        timestamp: new Date(Date.now() - 86400000), // yesterday
        likes: 5
      },
      {
        id: "2", 
        author: "Sarah Military",
        text: "I'm struggling with the financial planning section. Any veterans who have successfully applied this to their business?",
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        likes: 2
      }
    ]);
  }, [activeSection, activeModule, activeClass]);

  const handleMarkComplete = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    if (!completedLessons.includes(lessonId)) {
      const updatedCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompletedLessons);
      localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
      toast({
        title: "Lesson Completed",
        description: "Great job! This lesson has been marked as completed.",
      });
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: Date.now().toString(),
        author: "You",
        text: newComment,
        timestamp: new Date(),
        likes: 0
      };
      setComments([newCommentObject, ...comments]);
      setNewComment("");
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the discussion.",
      });
    }
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    
    setIsAiLoading(true);
    try {
      // In a real app, you should get the API key from a secure source
      // For demo purposes, we'll use a placeholder
      const apiKey = localStorage.getItem("openai_api_key") || "";
      
      if (!apiKey) {
        // Ask user to provide API key
        const userKey = prompt("Please enter your OpenAI API key to use the AI Buddy feature:");
        if (userKey) {
          localStorage.setItem("openai_api_key", userKey);
        } else {
          setIsAiLoading(false);
          return;
        }
      }
      
      // Create context-aware prompt for the AI
      const contextPrompt = `
You are a helpful AI Buddy for military veterans learning about business.
Current lesson: ${currentSection?.title} > ${currentModule?.title} > ${currentClass?.title}

Please answer the following question with military analogies when helpful:
${aiQuestion}
      `;
      
      const response = await generateResponse(
        localStorage.getItem("openai_api_key") || "",
        [{ role: "user", content: contextPrompt }]
      );
      
      if (response.success) {
        setAIResponse(response.content);
      } else {
        toast({
          title: "Error",
          description: "Could not connect to AI. Please check your API key and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("AI error:", error);
      toast({
        title: "Error",
        description: "An error occurred while contacting the AI service.",
        variant: "destructive"
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { style: 'long' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    ).replace('in ', '').replace(' ago', ' ago');
  };

  if (!currentSection || !currentModule || !currentClass) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Terminal className="h-5 w-5 text-military-olive" />
            <span className="text-military-navy">{currentSection.title}</span>
            <span className="mx-1">/</span>
            <span className="text-military-navy">{currentModule.title}</span>
            <span className="mx-1">/</span>
            <span className="text-military-navy">{currentClass.title}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-military-beige/20">
              <Building className="h-3.5 w-3.5 mr-1" />
              {currentSection.title}
            </Badge>
            <Badge variant="outline" className="bg-military-navy/10">
              <Flag className="h-3.5 w-3.5 mr-1" />
              Module {activeModule.split('-')[1]}
            </Badge>
            <Badge variant="outline" className="bg-military-olive/10">
              <Timer className="h-3.5 w-3.5 mr-1" />
              {currentClass.duration} min
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowLibrary(true)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Knowledge Base
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowAIBuddy(!showAIBuddy)}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Battle Buddy
          </Button>
          
          {!completedLessons.includes(`${activeSection}-${activeModule}-${activeClass}`) ? (
            <Button onClick={handleMarkComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Completed
            </Button>
          ) : (
            <Badge className="bg-green-100 border-green-200 text-green-800 flex items-center h-9 px-3">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Completed
            </Badge>
          )}
        </div>
      </div>
      
      <Tabs defaultValue={activeView} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="lessons" className="flex-1">
            <BookOpen className="h-4 w-4 mr-2" />
            Lesson
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex-1">
            <ClipboardList className="h-4 w-4 mr-2" />
            Assignment
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex-1">
            <FileQuestion className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="files" className="flex-1">
            <Folder className="h-4 w-4 mr-2" />
            Files
          </TabsTrigger>
          <TabsTrigger value="collaborations" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Collaboration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons" className="space-y-6">
          {/* Lesson content section - now comes before video */}
          <div className="prose max-w-none">
            <h1>{currentClass.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentClass.content }} />
          </div>
          
          {/* Video lesson section - moved below text and made collapsible */}
          <Collapsible 
            open={isVideoOpen} 
            onOpenChange={setIsVideoOpen}
            className="border rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <Video className="h-5 w-5 mr-2 text-military-olive" />
                <span className="font-medium">Lesson Video</span>
              </div>
              {isVideoOpen ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent>
              <video
                ref={videoRef}
                controls
                className="w-full aspect-video bg-black"
                poster="/placeholder.svg"
                src={lessonVideoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Additional resources section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {additionalResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-gray-500 text-sm">.{resource.type} file</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Comments section - now at the bottom */}
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <Textarea 
                  placeholder="Share your thoughts or questions about this lesson..." 
                  className="w-full" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitComment}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
            
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{comment.author}</h3>
                        <p className="text-sm text-gray-500">{formatDate(comment.timestamp)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{comment.likes}</span>
                      </div>
                    </div>
                    <p className="mt-2">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-md">
                <MessageSquare className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-700">No comments yet</h3>
                <p className="text-gray-500 mt-1">Be the first to start a discussion about this lesson</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-military-olive" />
                  Assignment: {currentClass.title} Implementation
                </h2>
                
                <div className="prose max-w-none">
                  <p>Apply the concepts from this lesson to create a detailed implementation plan for your business venture.</p>
                  
                  <h3>Assignment Requirements:</h3>
                  <ul>
                    <li>Create a detailed outline based on the lesson principles</li>
                    <li>Apply the framework to your specific business scenario</li>
                    <li>Include a timeline for implementation</li>
                    <li>Define metrics for measuring success</li>
                  </ul>
                  
                  <h3>Submission Guidelines:</h3>
                  <p>Submit your completed assignment for peer evaluation. Your work will be reviewed by another veteran in your cohort, and you'll receive AI-enhanced feedback.</p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button className="bg-military-olive hover:bg-military-olive/90">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <PeerEvaluation 
            assignmentId={`${activeSection}-${activeModule}-${activeClass}`} 
            assignmentTitle={currentClass.title} 
          />
        </TabsContent>
        
        <TabsContent value="discussions">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">Discussion board moved to lesson tab</h3>
            <p className="text-gray-500 mt-1">Check out the comments section at the bottom of the lesson tab</p>
          </div>
        </TabsContent>
        
        <TabsContent value="quizzes">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <FileQuestion className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No quizzes available</h3>
            <p className="text-gray-500 mt-1">Quizzes for this lesson will be added soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="files">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Folder className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No files available</h3>
            <p className="text-gray-500 mt-1">There are no files attached to this lesson</p>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborations">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Users className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No collaboration activities</h3>
            <p className="text-gray-500 mt-1">Collaboration activities will be added soon</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Battle Buddy dialog */}
      {showAIBuddy && (
        <Card className="fixed bottom-6 right-6 w-96 z-50 shadow-xl">
          <CardContent className="p-0">
            <div className="bg-military-navy p-3 text-white flex justify-between items-center rounded-t-lg">
              <h3 className="flex items-center text-sm font-medium">
                <Bot className="h-4 w-4 mr-2" />
                AI Battle Buddy
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white"
                onClick={() => setShowAIBuddy(false)}
              >
                <span className="sr-only">Close</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                </svg>
              </Button>
            </div>
            <div className="h-64 p-4 overflow-y-auto bg-white/90">
              {aiResponse ? (
                <div className="p-3 bg-gray-100 rounded-lg text-sm">
                  <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br/>') }} />
                </div>
              ) : (
                <div className="text-center h-full flex flex-col justify-center">
                  <Bot className="h-12 w-12 mx-auto text-military-olive opacity-30 mb-2" />
                  <p className="text-gray-500 text-sm">Ask me anything about this lesson!</p>
                </div>
              )}
            </div>
            <div className="p-3 border-t flex items-center gap-2">
              <Textarea 
                placeholder="Ask your AI Battle Buddy..." 
                className="text-sm min-h-0"
                value={aiQuestion}
                onChange={(e) => setAIQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAskAI();
                  }
                }}
                rows={1}
              />
              <Button 
                size="icon" 
                disabled={isAiLoading || !aiQuestion.trim()}
                onClick={handleAskAI}
                className="shrink-0"
              >
                {isAiLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-military-olive" />
              Veteran Knowledge Base
            </DialogTitle>
            <DialogDescription>
              Access training resources, SOPs, and learning materials
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <StudentLibrary />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingContent;
