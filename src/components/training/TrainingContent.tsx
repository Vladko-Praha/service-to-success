
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trainingData } from "./trainingData";
import { 
  Video, 
  FileText, 
  Download, 
  CheckCircle, 
  MessageSquare, 
  Bot, 
  Send,
  ChevronUp,
  ChevronDown,
  Clock,
  Calendar,
  Award,
  Users,
  FileQuestion,
  BookOpen
} from "lucide-react";
import { validateApiKey, generateResponse } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";

type TrainingContentProps = {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  activeView: string;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
};

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

const TrainingContent = ({
  activeSection,
  activeModule,
  activeClass,
  activeView,
  setActiveSection,
  setActiveModule,
  setActiveClass,
}: TrainingContentProps) => {
  const [content, setContent] = useState<{
    title: string;
    description: string;
    content: string;
    sectionTitle: string;
    moduleTitle: string;
  } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [comments, setComments] = useState<{[key: string]: {text: string, date: string}[]}>({});
  const [commentText, setCommentText] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const sectionData = trainingData.find((s) => s.id === activeSection);
    if (sectionData) {
      const moduleData = sectionData.modules.find((m) => m.id === activeModule);
      if (moduleData) {
        const classData = moduleData.classes.find((c) => c.id === activeClass);
        if (classData) {
          setContent({
            title: classData.title,
            description: `${sectionData.title} > ${moduleData.title}`,
            content: classData.content,
            sectionTitle: sectionData.title,
            moduleTitle: moduleData.title,
          });
          
          setChatMessages([
            { 
              role: 'ai', 
              content: `I'm your AI Battle Buddy for "${classData.title}". How can I help you understand this lesson better?` 
            }
          ]);
        }
      }
    }

    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }

    const savedComments = localStorage.getItem("lessonComments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      validateStoredApiKey(storedApiKey);
    }
  }, [activeSection, activeModule, activeClass]);

  const validateStoredApiKey = async (key: string) => {
    try {
      const isValid = await validateApiKey(key);
      setIsApiKeyValid(isValid);
    } catch (error) {
      console.error('Error validating API key:', error);
      setIsApiKeyValid(false);
    }
  };

  const isLessonCompleted = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    return completedLessons.includes(lessonId);
  };

  const markAsComplete = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    if (!isLessonCompleted()) {
      const updatedCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompletedLessons);
      localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
      
      toast({
        title: "Lesson Completed",
        description: "Your progress has been saved",
      });
    }
  };

  const getLessonComments = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    return comments[lessonId] || [];
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    const newComment = {
      text: commentText,
      date: new Date().toLocaleDateString()
    };
    
    const updatedComments = {
      ...comments,
      [lessonId]: [...(comments[lessonId] || []), newComment]
    };
    
    setComments(updatedComments);
    localStorage.setItem("lessonComments", JSON.stringify(updatedComments));
    setCommentText("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully",
    });
  };

  const toggleVideoPlayer = () => {
    setShowVideoPlayer(!showVideoPlayer);
  };
  
  const validateAndSaveApiKey = async () => {
    try {
      setIsAILoading(true);
      const isValid = await validateApiKey(apiKey);
      
      setIsApiKeyValid(isValid);
      if (isValid) {
        localStorage.setItem("openai_api_key", apiKey);
        setShowApiInput(false);
        toast({
          title: "API Key Valid",
          description: "Your OpenAI API key is valid and ready to use.",
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "The provided OpenAI API key is invalid. Please check and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setIsApiKeyValid(false);
      toast({
        title: "API Validation Error",
        description: "Failed to validate your API key. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setIsAILoading(false);
    }
  };
  
  const sendMessageToAI = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userQuery.trim()) return;
    
    if (!isApiKeyValid) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key to use the AI Battle Buddy.",
        variant: "destructive"
      });
      setShowApiInput(true);
      return;
    }
    
    const userMessage: ChatMessage = { role: 'user', content: userQuery };
    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setUserQuery("");
    
    try {
      setIsAILoading(true);
      
      const contextPrompt = `You are an AI Battle Buddy helping a military veteran understand a lesson about ${content?.title}. 
The lesson is part of the ${content?.moduleTitle} module in the ${content?.sectionTitle} section.
Focus your answers on helping them understand the content in a practical, actionable way.
Use military analogies when helpful and be direct in your guidance.`;
      
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' as const : 'user' as const,
        content: msg.content
      }));
      
      const result = await generateResponse(
        apiKey,
        apiMessages,
        contextPrompt,
        'gpt-3.5-turbo'
      );

      if (result.success) {
        const aiResponse: ChatMessage = { 
          role: 'ai', 
          content: result.content 
        };
        setChatMessages([...updatedMessages, aiResponse]);
      } else {
        let errorMessage = result.content;
        
        if (result.error?.type === 'quota_exceeded') {
          errorMessage = "You've exceeded your OpenAI API quota. Please check your billing settings or try again later.";
        } else if (result.error?.type === 'invalid_key') {
          errorMessage = "Your API key appears to be invalid. Please update it.";
          setIsApiKeyValid(false);
          setShowApiInput(true);
        }
        
        const errorResponse: ChatMessage = { 
          role: 'ai', 
          content: errorMessage
        };
        
        setChatMessages([...updatedMessages, errorResponse]);
      }
    } catch (error) {
      console.error('Error in message handling:', error);
      
      const errorMessage: ChatMessage = { 
        role: 'ai', 
        content: "I encountered an unexpected error. Please try again later." 
      };
      setChatMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsAILoading(false);
    }
  };

  // Function to handle file downloads
  const handleDownload = (filename: string) => {
    // Create a dummy content for the file
    let content = "";
    let mimeType = "";
    
    if (filename.endsWith('.pdf')) {
      // For PDF, we'd normally generate a real PDF file
      // Here we'll create a text file with PDF content note
      content = "This is a placeholder for a PDF file: " + filename;
      mimeType = "text/plain";
    } else if (filename.includes('Worksheet') || filename.endsWith('.docx')) {
      content = "This is a placeholder for document: " + filename;
      mimeType = "text/plain";
    } else {
      content = "Content for: " + filename;
      mimeType = "text/plain";
    }
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: mimeType });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success toast
    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    });
  };

  // Render assignment content
  const renderAssignmentContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Module Assignment</CardTitle>
                <CardDescription>Complete this assignment to test your understanding</CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Due in 7 days</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Instructions</h3>
                <p className="text-gray-600 mt-1">
                  Based on what you've learned in this module, create a detailed plan for implementing these concepts in your business. Your submission should include the following sections:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Executive Summary (200 words)</li>
                  <li>Implementation Strategy (500 words)</li>
                  <li>Resource Requirements (300 words)</li>
                  <li>Timeline and Milestones (include a visual timeline)</li>
                  <li>Expected Outcomes and Success Metrics (300 words)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Submission</h3>
                <p className="text-gray-600 mt-1">
                  Submit your assignment as a PDF document. Use 12pt font, 1.5 line spacing, and include your name and the date on the first page.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Evaluation Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Comprehension</span>
                      <span className="text-sm text-gray-500">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Application</span>
                      <span className="text-sm text-gray-500">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Creativity</span>
                      <span className="text-sm text-gray-500">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Presentation</span>
                      <span className="text-sm text-gray-500">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full sm:w-auto">
                  Submit Assignment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resources for This Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-military-navy" />
                  <span>Assignment Template</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(`Assignment Template.docx`)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-military-navy" />
                  <span>Example Submission</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(`Example Submission.pdf`)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-military-navy" />
                  <span>Grading Rubric</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleDownload(`Grading Rubric.pdf`)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render discussion content
  const renderDiscussionContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Module Discussion Board</CardTitle>
                <CardDescription>Share your thoughts and learn from others</CardDescription>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50">
                3 replies
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-military-olive/20 flex items-center justify-center text-military-olive">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Instructor</h3>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="mt-1 text-gray-700">
                      Welcome to our module discussion! In this thread, let's discuss how the concepts from this module can be applied to your specific business scenarios. What challenges do you anticipate when implementing these strategies?
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                {getLessonComments().length > 0 ? (
                  <div className="space-y-4">
                    {getLessonComments().map((comment, index) => (
                      <div key={index} className="border-b pb-3 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            U
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span className="font-medium">User</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="mt-1">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-3">No replies yet. Be the first to reply!</p>
                )}
                
                <div className="space-y-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full border rounded-md p-3 min-h-[100px]"
                  />
                  <Button onClick={addComment} disabled={!commentText.trim()}>
                    Post Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Discussion Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Be respectful and constructive in your comments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Share specific examples from your own experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Ask thoughtful questions to help others expand their thinking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Replies should be at least 50 words to encourage meaningful contributions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render quiz content
  const renderQuizContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Module Quiz</CardTitle>
                <CardDescription>Test your knowledge of key concepts</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 flex items-center gap-1">
                  <FileQuestion className="h-3 w-3" />
                  10 questions
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  15 minutes
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold">Quiz Instructions</h3>
                <ul className="mt-2 space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You will have 15 minutes to complete this quiz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>The quiz consists of multiple choice and true/false questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You need to score at least 70% to pass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You can attempt the quiz up to 3 times</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-military-olive/20 flex items-center justify-center text-military-olive">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quiz Status</h3>
                    <p className="text-sm text-gray-600">Not yet attempted</p>
                  </div>
                </div>
                <Button>
                  Start Quiz
                </Button>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Topics Covered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-military-navy" />
                      <span className="font-medium">Core Concepts</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-xs">
                      Fundamentals and key terminology
                    </p>
                  </div>
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-military-navy" />
                      <span className="font-medium">Strategic Application</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-xs">
                      How to apply concepts in real-world scenarios
                    </p>
                  </div>
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-military-navy" />
                      <span className="font-medium">Problem Solving</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-xs">
                      Troubleshooting common challenges
                    </p>
                  </div>
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-military-navy" />
                      <span className="font-medium">Best Practices</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-xs">
                      Industry standards and optimization techniques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render file content
  const renderFileContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Module Resources</CardTitle>
            <CardDescription>Download and review these materials to support your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Lecture Materials</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span>Lecture Slides</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">PDF · 3.2 MB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Lecture Slides.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span>Module Handbook</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">PDF · 5.7 MB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Module Handbook.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Worksheets & Templates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <span>Implementation Worksheet</span>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 hover:bg-purple-50">DOCX · 428 KB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Implementation Worksheet.docx`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-orange-600" />
                      <span>Strategic Planning Template</span>
                    </div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-600 hover:bg-orange-50">XLSX · 1.2 MB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Strategic Planning Template.xlsx`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Additional Resources</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      <span>Recommended Reading List</span>
                    </div>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50">PDF · 724 KB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Reading List.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-red-600" />
                      <span>Case Studies</span>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">PDF · 3.8 MB</Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`Case Studies.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render collaboration content
  const renderCollaborationContent = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Group Projects</CardTitle>
                <CardDescription>Collaborate with other veterans on team assignments</CardDescription>
              </div>
              <Button variant="outline" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Create Group
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Active Group Projects</h3>
                <div className="border rounded-md divide-y">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-military-olive/20 flex items-center justify-center text-military-olive">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Business Model Canvas Team</h4>
                          <p className="text-sm text-gray-600">5 members · Created 3 days ago</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Due in 14 days
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>12 messages</span>
                      </div>
                      <Button size="sm">Enter Workspace</Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-military-olive/20 flex items-center justify-center text-military-olive">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Market Research Team</h4>
                          <p className="text-sm text-gray-600">4 members · Created 5 days ago</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Due in 10 days
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>23 messages</span>
                      </div>
                      <Button size="sm">Enter Workspace</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Collaboration Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                          <MessageSquare className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium">Group Chat</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Real-time discussions with your team
                        </p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium">Shared Documents</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Collaborate on files in real-time
                        </p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium">Team Calendar</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Schedule meetings and deadlines
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (!content && activeView === "lessons") {
    return <div>Loading content...</div>;
  }
  
  // Render different content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "lessons":
        return renderLessonContent();
      case "assignments":
        return renderAssignmentContent();
      case "discussions":
        return renderDiscussionContent();
      case "quizzes":
        return renderQuizContent();
      case "files":
        return renderFileContent();
      case "collaborations":
        return renderCollaborationContent();
      default:
        return renderLessonContent();
    }
  };
  
  // Render lesson content (original content)
  const renderLessonContent = () => {
    return (
      <div className="space-y-6">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="cursor-pointer hover:text-military-navy" 
                onClick={() => setActiveSection(activeSection)}>
            {content?.sectionTitle}
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-military-navy"
                onClick={() => setActiveModule(activeModule)}>
            {content?.moduleTitle}
          </span>
          <span>/</span>
          <span className="text-military-navy">{content?.title}</span>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-military-navy flex items-center gap-2">
            {content?.title}
            {isLessonCompleted() && <CheckCircle className="h-6 w-6 text-green-500" />}
          </h1>
          <p className="text-gray-600 mt-2">{content?.description}</p>
        </div>

        <Tabs defaultValue="content" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="ai-buddy">AI Battle Buddy</TabsTrigger>
            <TabsTrigger value="comments">Comments ({getLessonComments().length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            {showVideoPlayer ? (
              <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white">
                    <p className="text-center mb-4">Video player placeholder</p>
                    <Button onClick={toggleVideoPlayer} variant="outline" className="bg-white text-black">
                      Close Video
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="h-10 w-10 text-military-navy" />
                  <div>
                    <h3 className="font-medium">Lesson Video</h3>
                    <p className="text-sm text-gray-600">Watch the full lesson video</p>
                  </div>
                </div>
                <Button onClick={toggleVideoPlayer} variant="outline" className="bg-white">
                  Play Video
                </Button>
              </div>
            )}

            <Card>
              <CardContent className="pt-6">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: content?.content || "" }} 
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                onClick={markAsComplete} 
                className="w-full md:w-auto px-8"
                disabled={isLessonCompleted()}
              >
                {isLessonCompleted() ? "Completed" : "Mark As Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="downloads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-military-navy" />
                      <span>Lesson Summary PDF</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`${content?.title} - Summary.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-military-navy" />
                      <span>Exercise Worksheet</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(`${content?.title} - Exercise Worksheet.docx`)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-buddy" className="space-y-4">
            <Card className="border-military-olive">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-military-olive" />
                  AI Battle Buddy
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isApiKeyValid && showApiInput ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Please enter your OpenAI API key to use the AI Battle Buddy.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                      />
                      <Button 
                        onClick={validateAndSaveApiKey}
                        disabled={isAILoading || !apiKey}
                      >
                        {isAILoading ? "Validating..." : "Save"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your API key is stored locally in your browser and never shared.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-60 overflow-y-auto border rounded-md p-3 space-y-3">
                      {chatMessages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-military-olive/20 text-military-navy' 
                                : 'bg-military-navy/10 text-military-navy'
                            }`}
                          >
                            {message.role === 'ai' && (
                              <div className="flex items-center gap-2 mb-1 text-xs font-medium text-military-olive">
                                <Bot className="h-3 w-3" />
                                <span>AI Battle Buddy</span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      
                      {isAILoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] p-3 rounded-lg bg-military-navy/10 text-military-navy">
                            <div className="flex items-center gap-2 mb-1 text-xs font-medium text-military-olive">
                              <Bot className="h-3 w-3" />
                              <span>AI Battle Buddy</span>
                            </div>
                            <p className="text-sm">
                              <span className="animate-pulse">Thinking...</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!isApiKeyValid ? (
                      <div className="flex justify-center">
                        <Button onClick={() => setShowApiInput(true)}>
                          Add OpenAI API Key
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={sendMessageToAI} className="relative">
                        <input
                          type="text"
                          value={userQuery}
                          onChange={(e) => setUserQuery(e.target.value)}
                          placeholder="Ask about this lesson..."
                          className="w-full rounded-md border border-gray-300 pr-10 pl-3 py-2"
                          disabled={isAILoading}
                        />
                        <button 
                          type="submit" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-military-olive"
                          disabled={isAILoading || !userQuery.trim()}
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments ({getLessonComments().length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getLessonComments().length > 0 ? (
                    <div className="space-y-4">
                      {getLessonComments().map((comment, index) => (
                        <div key={index} className="border-b pb-3 last:border-0">
                          <div className="flex justify-between">
                            <span className="font-medium">User</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="mt-1">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-3">No comments yet. Be the first to comment!</p>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full border rounded-md p-3 min-h-[100px]"
                    />
                    <Button onClick={addComment} disabled={!commentText.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return renderContent();
};

export default TrainingContent;
