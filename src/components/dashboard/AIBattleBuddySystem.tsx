import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Clock, Lightbulb, Search, Send, Key, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/pages/AdminDashboard";
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from "@/services/openaiService";

interface Message {
  id?: number;
  role: 'ai' | 'user';
  content: string;
  created_at?: string;
}

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
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored API key
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setApiKeyInput(storedApiKey);
      validateApiKey(storedApiKey);
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

  const validateApiKey = async (key: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsApiKeyValid(true);
        setApiKey(key);
        localStorage.setItem("openai_api_key", key);
        toast({
          title: "API Key Valid",
          description: "Your OpenAI API key is valid and ready to use.",
          variant: "default"
        });
      } else {
        const errorData = await response.json();
        setIsApiKeyValid(false);
        toast({
          title: "Invalid API Key",
          description: errorData.error?.message || "The provided OpenAI API key is invalid. Please check and try again.",
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

  const saveApiKey = () => {
    validateApiKey(apiKeyInput);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    // Check if API key is available and valid
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
    setMessages(prev => [...prev, userMessage]);
    
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

      // Create system message for context
      const systemPrompt = "You are an AI Battle Buddy for military veterans learning to establish and run online businesses. Provide practical, actionable advice tailored to veterans transitioning to entrepreneurship. Focus on clear steps, military analogies when helpful, and specific resources for veteran entrepreneurs. Be direct, supportive, and tactical in your guidance.";
      
      // Format conversation history for the API
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Use our generateResponse function instead of direct API call
      const aiResponseText = await generateResponse(
        apiKey,
        query,
        systemPrompt,
        conversationHistory,
        "gpt-4o-mini" // Using gpt-4o-mini as the default model
      );
        
      const aiResponse: Message = { role: 'ai', content: aiResponseText };
      
      setMessages(prev => [...prev, aiResponse]);
      
      if (isSupabaseConnected) {
        const { error: aiError } = await supabase
          .from('ai_messages')
          .insert([aiResponse]);

        if (aiError) {
          console.error('Error saving AI response:', aiError);
        }
      }
      
      setQuery("");
    } catch (error) {
      console.error('Error in OpenAI API call:', error);
      toast({
        title: "AI Response Error",
        description: error instanceof Error ? error.message : "Failed to get a response from AI. Please try again.",
        variant: "destructive"
      });
      
      // Add error message as AI response
      const errorMessage: Message = { 
        role: 'ai', 
        content: error instanceof Error && error.message.includes('quota') 
          ? "I encountered an error: You have exceeded your OpenAI API quota. Please check your billing details on the OpenAI website or try a different API key." 
          : "I encountered an error while processing your request. Please check your API key or try again later." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
                    onClick={saveApiKey}
                    disabled={isLoading || !apiKeyInput}
                    className="rounded-md bg-military-olive px-4 py-2 text-military-sand hover:bg-military-olive/80 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Validating..." : "Validate & Save"}
                  </button>
                </div>
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
                      <div className="bg-military-navy/10 rounded-lg p-3 max-w-[80%]">
                        <p className="text-military-navy whitespace-pre-line">
                          {message.content}
                        </p>
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
                        <span className="animate-pulse">Generating response...</span>
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
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Common Queries</CardTitle>
          <CardDescription>
            Popular questions asked by fellow operators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("How do I find my first clients?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How do I find my first clients?</h4>
                <p className="text-xs text-military-navy/70">
                  Strategies for initial customer acquisition
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("What's the best business structure for me?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">What's the best business structure for me?</h4>
                <p className="text-xs text-military-navy/70">
                  Comparing LLC, S-Corp, and Sole Proprietorship
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("How much should I charge for my services?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How much should I charge for my services?</h4>
                <p className="text-xs text-military-navy/70">
                  Pricing strategies for maximum profitability
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("What grants are available for veteran businesses?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">What grants are available for veteran businesses?</h4>
                <p className="text-xs text-military-navy/70">
                  Funding opportunities specifically for veterans
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("How do I create an effective business plan?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How do I create an effective business plan?</h4>
                <p className="text-xs text-military-navy/70">
                  Step-by-step guide to strategic planning
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors"
                 onClick={() => setQuery("What's the most effective marketing strategy?")}>
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">What's the most effective marketing strategy?</h4>
                <p className="text-xs text-military-navy/70">
                  Cost-effective marketing approaches
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBattleBuddySystem;
