import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  ChevronDown
} from "lucide-react";
import { validateApiKey, generateResponse, DEFAULT_SYSTEM_PROMPT } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";

type TrainingContentProps = {
  activeSection: string;
  activeModule: string;
  activeClass: string;
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

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <span className="cursor-pointer hover:text-military-navy" 
              onClick={() => setActiveSection(activeSection)}>
          {content.sectionTitle}
        </span>
        <span>/</span>
        <span className="cursor-pointer hover:text-military-navy"
              onClick={() => setActiveModule(activeModule)}>
          {content.moduleTitle}
        </span>
        <span>/</span>
        <span className="text-military-navy">{content.title}</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-military-navy flex items-center gap-2">
          {content.title}
          {isLessonCompleted() && <CheckCircle className="h-6 w-6 text-green-500" />}
        </h1>
        <p className="text-gray-600 mt-2">{content.description}</p>
      </div>

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
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: content.content }} 
          />
        </CardContent>
      </Card>

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
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-military-navy" />
                <span>Exercise Worksheet</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-military-olive">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => setShowAIChat(!showAIChat)}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-military-olive" />
              AI Battle Buddy
            </CardTitle>
            <Button variant="ghost" size="icon">
              {showAIChat ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        
        {showAIChat && (
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
        )}
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
    </div>
  );
};

export default TrainingContent;
