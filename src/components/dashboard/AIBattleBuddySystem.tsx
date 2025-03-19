import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Clock, Lightbulb, Search, Send, Key, AlertCircle, ThumbsUp, ThumbsDown, FileDown, Wand2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/pages/AdminDashboard";
import { useToast } from "@/hooks/use-toast";
import { validateApiKey, generateResponse, ChatMessage, DEFAULT_SYSTEM_PROMPT, HTML_TEMPLATE_PROMPT } from "@/services/openaiService";

interface Message {
  id?: number;
  role: 'ai' | 'user';
  content: string;
  created_at?: string;
  isHTML?: boolean; // Added to support HTML content
}

const convertToChatMessages = (messages: Message[]): ChatMessage[] => {
  return messages.map(msg => ({
    role: msg.role === 'ai' ? 'assistant' : 'user',
    content: msg.content
  }));
};

const AIBattleBuddySystem = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Welcome to your AI Battle Buddy System. How can I assist with your business operations today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [debugMode, setDebugMode] = useState(false);
  const [lastErrorDetails, setLastErrorDetails] = useState<any>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<number, 'positive' | 'negative'>>({});
  const [requestingTemplate, setRequestingTemplate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setApiKeyInput(storedApiKey);
      validateStoredApiKey(storedApiKey);
    }

    const storedModel = localStorage.getItem("openai_model");
    if (storedModel) {
      setSelectedModel(storedModel);
    }

    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_messages')
          .select('*')
          .limit(1);
        
        if (error) {
          console.error('Error connecting to Supabase:', error);
          return;
        }
        
        setIsSupabaseConnected(true);
        fetchMessages();
      } catch (error) {
        console.error('Error checking Supabase connection:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(10);

        if (error) {
          console.error('Error fetching messages:', error);
          return;
        }

        if (data && data.length > 0) {
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    checkConnection();
  }, []);

  const validateStoredApiKey = async (key: string) => {
    try {
      setIsLoading(true);
      const isValid = await validateApiKey(key);
      
      setIsApiKeyValid(isValid);
      if (isValid) {
        setApiKey(key);
        localStorage.setItem("openai_api_key", key);
      } else {
        toast({
          title: "API Key Issue",
          description: "Your stored API key appears to be invalid. Please update it.",
          variant: "destructive"
        });
        setShowApiSettings(true);
      }
    } catch (error) {
      console.error('Error validating stored API key:', error);
      setIsApiKeyValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSaveApiKey = async () => {
    try {
      setIsLoading(true);
      const isValid = await validateApiKey(apiKeyInput);
      
      setIsApiKeyValid(isValid);
      if (isValid) {
        setApiKey(apiKeyInput);
        localStorage.setItem("openai_api_key", apiKeyInput);
        toast({
          title: "API Key Valid",
          description: "Your OpenAI API key is valid and ready to use.",
          variant: "default"
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
      setIsLoading(false);
    }
  };

  const saveModelPreference = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem("openai_model", model);
    toast({
      title: "Model Updated",
      description: `You're now using the ${model} model.`,
      variant: "default"
    });
  };

  const testOpenAIConnection = async () => {
    try {
      setIsLoading(true);
      
      const testPrompt = "Hello, this is a test of the OpenAI API. Please respond with 'OK'";
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: testPrompt }],
          max_tokens: 10,
          temperature: 0.1
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "API Connection Test Successful",
          description: "Your OpenAI API key appears to be working correctly.",
          variant: "default"
        });
        setLastErrorDetails(null);
      } else {
        setLastErrorDetails(data);
        toast({
          title: "API Connection Test Failed",
          description: data.error?.message || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Test connection error:", error);
      setLastErrorDetails(error);
      toast({
        title: "API Connection Test Failed",
        description: "Could not connect to OpenAI API. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add template generation functionality
  const requestTemplate = async (templateType: string) => {
    if (!isApiKeyValid) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key to use the template generator.",
        variant: "destructive"
      });
      setShowApiSettings(true);
      return;
    }
    
    setRequestingTemplate(true);
    
    const templatePrompt = `Create a detailed, interactive ${templateType} template for a veteran entrepreneur starting an online business.`;
    
    const templateMessage: Message = { 
      role: 'user', 
      content: templatePrompt
    };
    
    setMessages(prevMessages => [...prevMessages, templateMessage]);
    
    try {
      setIsLoading(true);
      
      // Convert messages to the format expected by the service
      const chatMessages = convertToChatMessages([...messages, templateMessage]);
      
      // Request HTML-formatted response
      const result = await generateResponse(
        apiKey,
        chatMessages,
        DEFAULT_SYSTEM_PROMPT,
        selectedModel,
        0.7, // Higher temperature for more creative templates
        true // Request HTML format
      );

      if (result.success) {
        const aiResponse: Message = { 
          role: 'ai', 
          content: result.content,
          isHTML: result.isHTML
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        if (isSupabaseConnected) {
          const { error: aiError } = await supabase
            .from('ai_messages')
            .insert([{
              role: 'ai',
              content: result.content
            }]);

          if (aiError) {
            console.error('Error saving AI response:', aiError);
          }
        }
      } else {
        let errorMessage = result.content;
        setLastErrorDetails(result.error);
        
        if (result.error?.type === 'quota_exceeded') {
          errorMessage = "You've exceeded your OpenAI API quota. Please check your billing settings at OpenAI.com or try again later.";
        } else if (result.error?.type === 'invalid_key') {
          errorMessage = "Your API key appears to be invalid. Please update it in the settings.";
          setIsApiKeyValid(false);
          setShowApiSettings(true);
        }
        
        const errorResponse: Message = { 
          role: 'ai', 
          content: errorMessage
        };
        
        setMessages(prev => [...prev, errorResponse]);
      }
      
    } catch (error) {
      console.error('Error requesting template:', error);
      
      const errorMessage: Message = { 
        role: 'ai', 
        content: "I encountered an error creating your template. Please try again."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setRequestingTemplate(false);
    }
  };

  // Add function to download HTML templates
  const downloadTemplate = (htmlContent: string, templateName: string) => {
    const element = document.createElement('a');
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    if (!isApiKeyValid) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key to use the AI Battle Buddy.",
        variant: "destructive"
      });
      setShowApiSettings(true);
      return;
    }
    
    const userMessage: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    try {
      setIsLoading(true);
      
      if (isSupabaseConnected) {
        const { error: saveError } = await supabase
          .from('ai_messages')
          .insert([userMessage]);

        if (saveError) {
          console.error('Error saving message:', saveError);
          toast({
            title: "Message Error",
            description: "Failed to save your message. Please try again.",
            variant: "destructive"
          });
        }
      }

      const chatMessages = convertToChatMessages(updatedMessages);
      
      console.log("Sending messages to OpenAI:", chatMessages);
      
      const result = await generateResponse(
        apiKey,
        chatMessages,
        DEFAULT_SYSTEM_PROMPT,
        selectedModel,
        0.4
      );

      if (result.success) {
        const aiResponse: Message = { 
          role: 'ai', 
          content: result.content,
          isHTML: result.isHTML
        };
        setMessages([...updatedMessages, aiResponse]);
        
        if (isSupabaseConnected) {
          const { error: aiError } = await supabase
            .from('ai_messages')
            .insert([aiResponse]);

          if (aiError) {
            console.error('Error saving AI response:', aiError);
          }
        }
      } else {
        let errorMessage = result.content;
        setLastErrorDetails(result.error);
        
        if (result.error?.type === 'quota_exceeded') {
          errorMessage = "You've exceeded your OpenAI API quota. Please check your billing settings at OpenAI.com or try again later.";
        } else if (result.error?.type === 'invalid_key') {
          errorMessage = "Your API key appears to be invalid. Please update it in the settings.";
          setIsApiKeyValid(false);
          setShowApiSettings(true);
        }
        
        const errorResponse: Message = { 
          role: 'ai', 
          content: errorMessage
        };
        
        setMessages([...updatedMessages, errorResponse]);
      }
      
      setQuery("");
    } catch (error) {
      console.error('Error in message handling:', error);
      setLastErrorDetails(error);
      
      const errorMessage: Message = { 
        role: 'ai', 
        content: "I encountered an unexpected error. Please try again later." 
      };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageFeedback = (index: number, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({...prev, [index]: type}));
    
    if (type === 'positive') {
      toast({
        title: "Thanks for your feedback!",
        description: "We're glad the response was helpful.",
      });
    } else {
      toast({
        title: "Thanks for your feedback",
        description: "Try asking your question differently for a better response.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">AI Battle Buddy System</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowApiSettings(!showApiSettings)}
            className="flex items-center gap-2 rounded-full bg-military-olive px-3 py-1 text-xs font-medium text-military-sand hover:bg-military-olive/80 transition-colors"
          >
            <Key className="h-3 w-3" />
            {isApiKeyValid ? "API Connected" : "Set API Key"}
          </button>
          <span className="rounded-full bg-military-olive px-3 py-1 text-xs font-medium text-military-sand">
            {isSupabaseConnected ? "DB CONNECTED" : "LOCAL MODE"}
          </span>
        </div>
      </div>

      {showApiSettings && (
        <Card className="border-military-olive">
          <CardHeader>
            <CardTitle className="text-lg">OpenAI API Settings</CardTitle>
            <CardDescription>
              Connect your personal OpenAI API key to power the AI Battle Buddy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium text-military-navy">
                  Your OpenAI API Key
                </label>
                <div className="flex gap-2">
                  <input
                    id="apiKey"
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="sk-..."
                    className="w-full rounded-md border border-military-tan bg-white px-4 py-2 focus:border-military-olive focus:outline-none"
                  />
                  <button 
                    onClick={validateAndSaveApiKey}
                    disabled={isLoading || !apiKeyInput}
                    className="rounded-md bg-military-olive px-4 py-2 text-military-sand hover:bg-military-olive/80 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Validating..." : "Validate & Save"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <label htmlFor="modelSelect" className="text-sm font-medium text-military-navy">
                  OpenAI Model
                </label>
                <select
                  id="modelSelect"
                  value={selectedModel}
                  onChange={(e) => saveModelPreference(e.target.value)}
                  className="w-full rounded-md border border-military-tan bg-white px-4 py-2 focus:border-military-olive focus:outline-none"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Recommended for stability)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini (Fast but may hit quota limits)</option>
                  <option value="gpt-4o">GPT-4o (Most capable, higher quota needs)</option>
                </select>
                <p className="text-xs text-military-navy/70 mt-1">
                  For free-tier API keys, GPT-3.5 Turbo is more reliable and less likely to hit quota issues.
                </p>
              </div>
              
              <div className="text-sm text-military-navy/70">
                <p>Your API key is stored locally in your browser and is never shared with our servers.</p>
                <p className="mt-2">Don't have an API key? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-military-olive underline">Get one from OpenAI</a></p>
              </div>
              
              {!isApiKeyValid && apiKey && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span>Your API key appears to be invalid. Please check and try again.</span>
                </div>
              )}
              
              {isApiKeyValid && (
                <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-800 border border-green-200">
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    API key valid and ready to use
                  </span>
                </div>
              )}

              <div className="mt-6 border-t border-military-tan pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-military-navy">Advanced Troubleshooting</h3>
                  <button
                    onClick={() => setDebugMode(!debugMode)}
                    className="text-xs text-military-olive underline"
                  >
                    {debugMode ? "Hide Debug Info" : "Show Debug Info"}
                  </button>
                </div>
                
                <div className="mt-2 space-y-3">
                  <button
                    onClick={testOpenAIConnection}
                    disabled={isLoading || !apiKey}
                    className="w-full rounded-md bg-military-navy px-4 py-2 text-military-sand hover:bg-military-navy/80 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Testing..." : "Test API Connection"}
                  </button>
                  
                  <p className="text-xs text-military-navy/70">
                    If you're experiencing issues despite having a valid API key, try:
                    <ul className="list-disc pl-4 mt-1 space-y-1">
                      <li>Adding a payment method to your OpenAI account (even with $0 spend)</li>
                      <li>Using GPT-3.5-Turbo instead of newer models</li>
                      <li>Generating a new API key</li>
                      <li>Waiting a few minutes between requests (free tier rate limits)</li>
                    </ul>
                  </p>
                  
                  {debugMode && lastErrorDetails && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md overflow-auto max-h-60 text-xs font-mono">
                      <p className="font-bold">Error Details:</p>
                      <pre>{JSON.stringify(lastErrorDetails, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Tactical Guidance Assistant</CardTitle>
              <CardDescription>
                Your AI-powered business operations support system
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 bg-military-beige/50 rounded-md p-4 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  message.role === 'ai' ? (
                    <div key={index} className="flex gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-military-navy flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-military-sand" />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className={`rounded-lg p-3 ${message.isHTML ? 'bg-white border border-military-olive' : 'bg-military-navy/10'} max-w-[95%]`}>
                          {message.isHTML ? (
                            <div className="relative">
                              <div 
                                className="text-military-navy html-content" 
                                dangerouslySetInnerHTML={{ __html: message.content }}
                              />
                              <button
                                onClick={() => downloadTemplate(message.content, "Business-Template")}
                                className="absolute top-2 right-2 bg-military-olive text-military-sand p-1 rounded-md hover:bg-military-olive/80 transition-colors"
                                title="Download template"
                              >
                                <FileDown className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <p className="text-military-navy whitespace-pre-line">
                              {message.content}
                            </p>
                          )}
                        </div>
                        {index > 0 && (
                          <div className="flex mt-1 gap-2">
                            <button 
                              onClick={() => handleMessageFeedback(index, 'positive')}
                              className={`text-xs flex items-center gap-1 p-1 rounded ${
                                feedbackGiven[index] === 'positive' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'text-gray-500 hover:bg-gray-100'
                              }`}
                              disabled={feedbackGiven[index] !== undefined}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              Helpful
                            </button>
                            <button 
                              onClick={() => handleMessageFeedback(index, 'negative')}
                              className={`text-xs flex items-center gap-1 p-1 rounded ${
                                feedbackGiven[index] === 'negative' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'text-gray-500 hover:bg-gray-100'
                              }`}
                              disabled={feedbackGiven[index] !== undefined}
                            >
                              <ThumbsDown className="h-3 w-3" />
                              Not helpful
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex gap-3 mb-4 justify-end">
                      <div className="bg-military-olive/20 rounded-lg p-3 max-w-[80%]">
                        <p className="text-military-navy">
                          {message.content}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-military-olive flex items-center justify-center flex-shrink-0">
                        <span className="text-military-sand font-bold text-sm">JS</span>
                      </div>
                    </div>
                  )
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-military-navy flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-military-sand" />
                    </div>
                    <div className="bg-military-navy/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-military-navy">
                        <span className="animate-pulse">{requestingTemplate ? "Generating template..." : "Generating response..."}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {!isApiKeyValid ? (
                <div className="bg-military-beige rounded-md p-4 flex flex-col items-center justify-center gap-3 min-h-[100px]">
                  <p className="text-military-navy text-center">Connect your OpenAI API key to start using the AI Battle Buddy</p>
                  <button 
                    onClick={() => setShowApiSettings(true)}
                    className="flex items-center gap-2 rounded-md bg-military-olive px-4 py-2 text-sm font-medium text-military-sand hover:bg-military-olive/80 transition-colors"
                  >
                    <Key className="h-4 w-4" />
                    Connect API Key
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask your AI Battle Buddy..."
                    className="w-full rounded-md border border-military-tan bg-white px-4 py-2 pr-10 focus:border-military-olive focus:outline-none"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-military-olive"
                    disabled={isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Mission Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="group flex items-start gap-3 rounded-md p-2 hover:bg-military-sand transition-colors cursor-pointer">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-medium text-military-navy">Complete Your Competitor Analysis</h4>
                    <p className="text-xs text-military-navy/70">
                      Based on your business plan, this should be your next priority.
                    </p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-3 rounded-md p-2 hover:bg-military-sand transition-colors cursor-pointer">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-medium text-military-navy">Review Pricing Strategy</h4>
                    <p className="text-xs text-military-navy/70">
                      Your current pricing model could be optimized for higher profit margins.
                    </p>
                  </div>
                </div>
                
                <div className="group flex items-start gap-3 rounded-md p-2 hover:bg-military-sand transition-colors cursor-pointer">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-medium text-military-navy">Establish Social Media Presence</h4>
                    <p className="text-xs text-military-navy/70">
                      Your target market is active on social platforms; you should be too.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Business Templates</CardTitle>
              <CardDescription>
                Generate interactive business templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  onClick={() => requestTemplate("Marketing Strategy")}
                  disabled={isLoading || requestingTemplate}
                  className="flex items-center justify-between w-full rounded-md border border-military-olive p-3 hover:bg-military-sand transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-military-olive" />
                    <span className="text-sm font-medium text-military-navy">Marketing Strategy Template</span>
                  </div>
                  {requestingTemplate ? (
                    <span className="text-xs text-military-navy/70 animate-pulse">Generating...</span>
                  ) : (
                    <span className="text-xs text-military-navy/70">Interactive form</span>
                  )}
                </button>
                
                <button
                  onClick={() => requestTemplate("Business Plan")}
                  disabled={isLoading || requestingTemplate}
                  className="flex items-center justify-between w-full rounded-md border border-military-olive p-3 hover:bg-military-sand transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-military-olive" />
                    <span className="text-sm font-medium text-military-navy">Business Plan Template</span>
                  </div>
                  {requestingTemplate ? (
                    <span className="text-xs text-military-navy/70 animate-pulse">Generating...</span>
                  ) : (
                    <span className="text-xs text-military-navy/70">Interactive form</span>
                  )}
                </button>
                
                <button
                  onClick={() => requestTemplate("Competitor Analysis")}
                  disabled={isLoading || requestingTemplate}
                  className="flex items-center justify-between w-full rounded-md border border-military-olive p-3 hover:bg-military-sand transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-military-olive" />
                    <span className="text-sm font-medium text-military-navy">Competitor Analysis</span>
                  </div>
                  {requestingTemplate ? (
                    <span className="text-xs text-military-navy/70 animate-pulse">Generating...</span>
                  ) : (
                    <span className="text-xs text-military-navy/70">Interactive form</span>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md border border-military-tan p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-military-olive" />
                    <span className="text-sm font-medium text-military-navy">Weekly Performance Review</span>
                  </div>
                  <span className="text-xs text-military-navy/70">Due in 2 days</span>
                </div>
                
                <div className="flex items-center justify-between rounded-md border border-military-tan p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-military-olive" />
                    <span className="text-sm font-medium text-military-navy">Monthly Strategy Assessment</span>
                  </div>
                  <span className="text-xs text-military-navy/70">Due in 2 weeks</span>
                </div>
              </div>
              
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-military-olive bg-military-olive/10 px-4 py-2 text-sm font-medium text-military-olive hover:bg-military-olive/20">
                <span>Schedule New Report</span>
              </button>
            </CardContent>
          </
