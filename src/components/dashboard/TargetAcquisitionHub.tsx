import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Globe, Search, BarChart } from "lucide-react";

const TargetAcquisitionHub = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Target Acquisition Hub</h2>
        <span className="rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-navy">
          MARKETING OPERATIONS
        </span>
      </div>

      <Tabs defaultValue="research" className="space-y-6">
        <TabsList className="bg-military-sand">
          <TabsTrigger value="research">
            <Search className="mr-2 h-4 w-4" />
            Market Research
          </TabsTrigger>
          <TabsTrigger value="customer">
            <Users className="mr-2 h-4 w-4" />
            Customer Profiles
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Globe className="mr-2 h-4 w-4" />
            Communication Channels
          </TabsTrigger>
          <TabsTrigger value="seo">
            <BarChart3 className="mr-2 h-4 w-4" />
            Visibility Tactics
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart className="mr-2 h-4 w-4" />
            Performance Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intelligence Gathering on Target Markets</CardTitle>
              <CardDescription>
                Identify and analyze your primary market opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                In this section, you'll find tools and templates for conducting thorough market research, 
                competitor analysis, and identifying market gaps your business can leverage.
              </p>
              
              <div className="mt-6 rounded-md border border-military-tan bg-military-sand p-4">
                <h3 className="font-bold text-military-navy">Market Opportunity Analysis Tool</h3>
                <p className="mt-2 text-sm text-military-navy/70">
                  Use this tactical worksheet to identify and quantify your primary market opportunities. 
                  This intelligence will form the foundation of your marketing strategy.
                </p>
                <button className="mt-4 inline-flex items-center rounded-md bg-military-navy px-4 py-2 text-sm font-medium text-military-sand hover:bg-military-navy/90">
                  Access Tool
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab content would go here */}
        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle>Ideal Customer Profile Development</CardTitle>
              <CardDescription>Define your ideal customer targets with precision</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                This section helps you develop detailed customer personas to target your marketing efforts effectively.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Communication Channels Planner</CardTitle>
              <CardDescription>Identify and optimize your marketing communication channels</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                This planner helps you identify and prioritize the most effective marketing channels for your business.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Visibility and Reconnaissance Tactics</CardTitle>
              <CardDescription>Make your business discoverable through SEO and online presence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                Learn essential SEO techniques and visibility strategies to ensure your target market can find you.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Mission Effectiveness Metrics Dashboard</CardTitle>
              <CardDescription>Track and optimize your marketing performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                Monitor key performance indicators to measure and improve your marketing effectiveness.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TargetAcquisitionHub;
