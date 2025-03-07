
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Clock, Lightbulb, Search, Send } from "lucide-react";
import { useState } from "react";

const AIBattleBuddySystem = () => {
  const [query, setQuery] = useState("");
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">AI Battle Buddy System</h2>
        <span className="rounded-full bg-military-olive px-3 py-1 text-xs font-medium text-military-sand">
          ACTIVE SUPPORT
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
                <div className="flex gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-military-navy flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-military-sand" />
                  </div>
                  <div className="bg-military-navy/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-military-navy">
                      Welcome to your AI Battle Buddy System. How can I assist with your business operations today?
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-4 justify-end">
                  <div className="bg-military-olive/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-military-navy">
                      I need help with my marketing strategy for my new consulting business.
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-military-olive flex items-center justify-center flex-shrink-0">
                    <span className="text-military-sand font-bold text-sm">JS</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-military-navy flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-military-sand" />
                  </div>
                  <div className="bg-military-navy/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-military-navy">
                      Roger that. For a consulting business, I recommend a three-phase marketing approach:
                    </p>
                    <ol className="list-decimal ml-5 mt-2 space-y-2 text-military-navy">
                      <li>Establish authority through content marketing - articles, white papers, and case studies.</li>
                      <li>Leverage LinkedIn for lead generation and networking with potential clients.</li>
                      <li>Implement a referral system to convert successful client engagements into new business.</li>
                    </ol>
                    <p className="mt-2 text-military-navy">Would you like me to elaborate on any of these tactical approaches?</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask your AI Battle Buddy..."
                  className="w-full rounded-md border border-military-tan bg-white px-4 py-2 pr-10 focus:border-military-olive focus:outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-military-olive">
                  <Send className="h-5 w-5" />
                </button>
              </div>
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
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How do I find my first clients?</h4>
                <p className="text-xs text-military-navy/70">
                  Strategies for initial customer acquisition
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">What's the best business structure for me?</h4>
                <p className="text-xs text-military-navy/70">
                  Comparing LLC, S-Corp, and Sole Proprietorship
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How much should I charge for my services?</h4>
                <p className="text-xs text-military-navy/70">
                  Pricing strategies for maximum profitability
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">What grants are available for veteran businesses?</h4>
                <p className="text-xs text-military-navy/70">
                  Funding opportunities specifically for veterans
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
              <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-medium text-military-navy">How do I create an effective business plan?</h4>
                <p className="text-xs text-military-navy/70">
                  Step-by-step guide to strategic planning
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 rounded-md border border-military-tan p-3 cursor-pointer hover:border-military-olive transition-colors">
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
