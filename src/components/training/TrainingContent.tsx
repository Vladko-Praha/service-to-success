
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  ClipboardList, 
  MessageSquare, 
  FileQuestion, 
  Folder,
  Users,
  CheckCircle,
  Download,
  Send,
  Video,
  ChevronDown,
  ChevronUp,
  Bot
} from "lucide-react";
import StudentLibrary from "./StudentLibrary";
import { trainingData } from "./trainingData";
import { useToast } from "@/hooks/use-toast";
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

const TrainingContent: React.FC<TrainingContentProps> = ({
  activeSection,
  activeModule,
  activeClass,
  activeView,
  setActiveSection,
  setActiveModule,
  setActiveClass
}) => {
  const { toast } = useToast();
  const [activeAssignmentTab, setActiveAssignmentTab] = useState("instructions");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentAnswer, setAssignmentAnswer] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
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
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Load completed lessons from localStorage
    const savedLessons = localStorage.getItem("completedLessons");
    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons));
    }
  }, []);

  // Find current section, module and class data
  const currentSection = trainingData.find(section => section.id === activeSection);
  const currentModule = currentSection?.modules.find(module => module.id === activeModule);
  const currentClass = currentModule?.classes.find(cls => cls.id === activeClass);

  const handleMarkAsCompleted = () => {
    const lessonKey = `${activeSection}-${activeModule}-${activeClass}`;
    let updatedCompletedLessons: string[];

    if (completedLessons.includes(lessonKey)) {
      updatedCompletedLessons = completedLessons.filter(id => id !== lessonKey);
      toast({
        title: "Lesson marked as incomplete",
        description: `"${currentClass?.title}" has been removed from your completed lessons.`
      });
    } else {
      updatedCompletedLessons = [...completedLessons, lessonKey];
      toast({
        title: "Lesson completed! 🎉",
        description: `"${currentClass?.title}" has been marked as completed.`
      });
    }

    setCompletedLessons(updatedCompletedLessons);
    localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
  };

  const isLessonCompleted = () => {
    const lessonKey = `${activeSection}-${activeModule}-${activeClass}`;
    return completedLessons.includes(lessonKey);
  };

  const handleSubmitAssignment = () => {
    if (assignmentAnswer.trim().length < 10) {
      toast({
        title: "Assignment too short",
        description: "Please provide a more detailed answer to submit your assignment.",
        variant: "destructive"
      });
      return;
    }
    
    setAssignmentSubmitted(true);
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully and is pending review."
    });
  };

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

  if (!currentSection || !currentModule || !currentClass) {
    return <div className="p-4">Lesson not found</div>;
  }

  const renderLessonContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{currentClass.title}</h1>
      
      <div className="prose max-w-none">
        {/* Render the HTML content properly using dangerouslySetInnerHTML */}
        {currentClass.content ? (
          <div dangerouslySetInnerHTML={{ __html: currentClass.content }} />
        ) : (
          <p>No content available for this lesson.</p>
        )}
        
        {/* Lesson content - you would normally pull this from your database */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>
            In this lesson, we'll explore the essential steps for establishing your business correctly.
            Setting up your business with the right legal structure and registrations is crucial for
            long-term success and protection of your assets.
          </p>
          
          <p>
            Throughout this lesson, you'll learn about different business structures, 
            how to register your business with local and federal authorities, and the essential
            paperwork needed to operate legally in your jurisdiction.
          </p>
          
          <h2 className="text-xl font-semibold">Key Concepts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Business Structures</strong> - Understanding the differences between sole proprietorships, LLCs, corporations, and partnerships</li>
            <li><strong>Business Registration</strong> - Steps to register your business name and entity with appropriate government agencies</li>
            <li><strong>Licenses and Permits</strong> - Industry-specific and location-specific requirements for legal operation</li>
            <li><strong>Tax Considerations</strong> - Tax implications of different business structures and registration requirements</li>
          </ul>
        </div>
      </div>
      
      {/* Video section - collapsible */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        <div 
          className="bg-military-beige/20 p-3 flex items-center justify-between cursor-pointer"
          onClick={() => setShowVideo(!showVideo)}
        >
          <div className="flex items-center">
            <Video className="h-5 w-5 mr-2 text-military-olive" />
            <h3 className="font-medium">Lesson Video</h3>
          </div>
          {showVideo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
        
        {showVideo && (
          <div className="p-4">
            <div className="aspect-video bg-gray-800 flex items-center justify-center mb-2 rounded">
              <p className="text-white">Video player would be embedded here</p>
            </div>
            <p className="text-sm text-muted-foreground">
              This video covers the key concepts of business establishment and legal structures.
            </p>
          </div>
        )}
      </div>
      
      {/* Additional resources/downloadable files */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Additional Resources</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-military-beige/10 p-3 rounded-lg">
            <div className="flex items-center">
              <Folder className="h-5 w-5 mr-2 text-military-olive" />
              <span>Business Structure Comparison Chart</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="flex items-center justify-between bg-military-beige/10 p-3 rounded-lg">
            <div className="flex items-center">
              <Folder className="h-5 w-5 mr-2 text-military-olive" />
              <span>Business Registration Checklist</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
      
      {/* AI Buddy Q&A */}
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
      
      {/* Mark as completed button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleMarkAsCompleted}
          variant={isLessonCompleted() ? "outline" : "default"}
          className={isLessonCompleted() ? "border-green-500 text-green-600" : "bg-military-olive hover:bg-military-olive/90"}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {isLessonCompleted() ? "Marked as Completed" : "Mark as Completed"}
        </Button>
      </div>
      
      {/* Comments section */}
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
    </div>
  );

  const renderAssignmentContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assignment: {currentClass.title}</h1>
      
      <Tabs defaultValue="instructions" value={activeAssignmentTab} onValueChange={setActiveAssignmentTab}>
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="submission">Your Submission</TabsTrigger>
        </TabsList>
        
        <TabsContent value="instructions" className="space-y-4 mt-4">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Assignment Overview</h2>
            <p>
              For this assignment, you will create a detailed plan for establishing your business
              entity based on your specific business idea and circumstances.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Requirements</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Identify the most appropriate business structure for your venture and explain your reasoning (250-300 words)</li>
              <li>List all the local, state, and federal registrations you'll need to obtain</li>
              <li>Create a timeline for completing all the required legal steps to establish your business</li>
              <li>Identify potential challenges in the registration process and your strategies to overcome them</li>
            </ol>
            
            <h2 className="text-xl font-semibold mt-6">Submission Guidelines</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your submission should be between 750-1000 words</li>
              <li>Include references to at least three credible sources</li>
              <li>Submit as a text entry in the submission tab</li>
              <li>Due date: Within one week of completing this lesson</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveAssignmentTab("submission")}>
              Go to Submission
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="submission" className="space-y-4 mt-4">
          {!assignmentSubmitted ? (
            <>
              <Textarea
                value={assignmentAnswer}
                onChange={(e) => setAssignmentAnswer(e.target.value)}
                placeholder="Enter your assignment submission here..."
                className="min-h-[300px]"
              />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveAssignmentTab("instructions")}>
                  Review Instructions
                </Button>
                <Button
                  onClick={handleSubmitAssignment}
                  disabled={assignmentAnswer.trim().length < 10}
                  className="bg-military-olive hover:bg-military-olive/90"
                >
                  Submit Assignment
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-green-800">Assignment Submitted</h3>
                    <p className="text-green-700 text-sm">
                      Your assignment has been submitted and is waiting for review.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Your Submission</h3>
                <p className="whitespace-pre-wrap">{assignmentAnswer}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case "lessons":
        return renderLessonContent();
      case "assignments":
        return renderAssignmentContent();
      case "quizzes":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Quiz: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "discussions":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Discussion Forum: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "files":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Resource Files: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "collaborations":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Collaborations: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      default:
        return <p>Select a view from the sidebar.</p>;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>
      {activeView === "lessons" && (
        <Card>
          <CardContent className="p-6">
            <StudentLibrary />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingContent;
