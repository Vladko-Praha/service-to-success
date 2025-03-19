import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Clock, Lightbulb, Search, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/pages/AdminDashboard";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    const userMessage: Message = { role: 'user', content: query };
    setMessages([...messages, userMessage]);
    
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

      setTimeout(async () => {
        let responseText = '';
        if (query.toLowerCase().includes('marketing')) {
          responseText = "For a consulting business, I recommend a three-phase marketing approach:\n1. Establish authority through content marketing - articles, white papers, and case studies.\n2. Leverage LinkedIn for lead generation and networking with potential clients.\n3. Implement a referral system to convert successful client engagements into new business.\n\nWould you like me to elaborate on any of these tactical approaches?";
        } else if (query.toLowerCase().includes('pricing') || query.toLowerCase().includes('charge')) {
          responseText = "When determining pricing for your services, consider:\n1. Your expertise and experience level\n2. Market rates in your industry and location\n3. The specific value you provide to clients\n4. Your business overhead costs\n\nMany consultants use value-based pricing rather than hourly rates to maximize revenue. Would you like more details on pricing models?";
        } else if (query.toLowerCase().includes('client') || query.toLowerCase().includes('customer')) {
          responseText = "To find your first clients as a veteran entrepreneur:\n1. Leverage your military network - fellow veterans often prefer to work with those who share their background\n2. Create a professional online presence through LinkedIn and a business website\n3. Offer free workshops or consultations to demonstrate your expertise\n4. Consider partnering with veteran support organizations that can refer clients to you";
        } else {
          responseText = "I understand you're asking about: \"" + query + "\"\n\nThis is an important aspect of your business journey. Let me provide some tactical guidance based on best practices and my training data. Would you like me to elaborate on any specific part of this topic?";
        }

        const aiResponse: Message = { role: 'ai', content: responseText };
        
        setMessages(prev => [...prev, aiResponse]);
        
        if (isSupabaseConnected) {
          const { error: aiError } = await supabase
            .from('ai_messages')
            .insert([aiResponse]);

          if (aiError) {
            console.error('Error saving AI response:', aiError);
          }
        }
        
        setIsLoading(false);
        setQuery("");
      }, 1500);
    } catch (error) {
      console.error('Error in message handling:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">AI Battle Buddy System</h2>
        <span className="rounded-full bg-military-olive px-3 py-1 text-xs font-medium text-military-sand">
          {isSupabaseConnected ? "CONNECTED" : "LOCAL MODE"}
        </span>
      </div>

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
