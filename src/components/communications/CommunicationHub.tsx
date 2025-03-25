
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandNoticeBoard from "@/components/communications/CommandNoticeBoard";
import { MessageSquare, Users, Bell, MailOpen, ChevronDown, ChevronUp, FileVideo, FileImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DirectMessages from "@/components/communications/DirectMessages";
import FireTeamNetwork from "@/components/communications/FireTeamNetwork";
import Notifications from "@/components/communications/Notifications";
import Broadcasts from "@/components/communications/Broadcasts";
import CommunicationsSearch, { SearchResult } from "@/components/communications/CommunicationsSearch";
import { useContentDelivery } from "@/hooks/use-content-delivery";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("fireteam");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isNoticeBoardOpen, setIsNoticeBoardOpen] = useState(false);
  const { videoResources, documentResources, fetchVideo, fetchDocument } = useContentDelivery();

  // Quick access media resources
  const [recentResources, setRecentResources] = useState([
    { id: "doc-business-structure-comparison", type: "document" },
    { id: "video-101", type: "video" }
  ]);

  // Fetch recent resources
  React.useEffect(() => {
    // Fetch recent documents and videos
    recentResources.forEach(resource => {
      if (resource.type === "document" && !documentResources[resource.id]) {
        fetchDocument(resource.id);
      } else if (resource.type === "video" && !videoResources[resource.id]) {
        fetchVideo(resource.id);
      }
    });
  }, [fetchDocument, fetchVideo]);

  const handleSearchResultSelect = (result: SearchResult) => {
    // Set the active tab based on the search result
    setActiveTab(result.tab);
    
    // Set the selected message ID to focus on the specific message
    setSelectedMessageId(result.id);
  };

  // Collapse notice board when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsNoticeBoardOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 space-y-4">
        <Collapsible 
          open={isNoticeBoardOpen}
          onOpenChange={setIsNoticeBoardOpen}
          className="border rounded-md bg-military-beige/20 overflow-hidden"
        >
          <div className="flex justify-between items-center p-2 bg-military-beige/30">
            <span className="font-medium text-military-navy ml-2">Command Notice Board</span>
            <CollapsibleTrigger asChild>
              <button className="p-1 rounded-md hover:bg-military-beige/50 transition-colors">
                {isNoticeBoardOpen ? (
                  <ChevronUp className="h-4 w-4 text-military-navy" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-military-navy" />
                )}
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="p-2">
              <CommandNoticeBoard className="mb-0" />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 bg-military-beige/30">
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Direct Messages</span>
                <Badge className="ml-1 bg-military-navy">3</Badge>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="fireteam" 
              className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Fire Team Network</span>
                <Badge className="ml-1 bg-military-olive">5</Badge>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
                <Badge className="ml-1 bg-[#FFB300]">12</Badge>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="broadcasts" 
              className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
            >
              <div className="flex items-center gap-2">
                <MailOpen className="h-4 w-4" />
                <span>Broadcasts</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-4">
            <DirectMessages selectedMessageId={selectedMessageId} />
          </TabsContent>
          
          <TabsContent value="fireteam" className="mt-4">
            <FireTeamNetwork selectedPostId={selectedMessageId} />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-4">
            <Notifications selectedNotificationId={selectedMessageId} />
          </TabsContent>
          
          <TabsContent value="broadcasts" className="mt-4">
            <Broadcasts selectedBroadcastId={selectedMessageId} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Access</CardTitle>
            <CardDescription>Recently shared resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {documentResources["doc-business-structure-comparison"] && (
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => window.open(documentResources["doc-business-structure-comparison"].downloadUrl, '_blank')}
              >
                <FileImage className="h-4 w-4 mr-2" />
                {documentResources["doc-business-structure-comparison"].title}
              </Button>
            )}
            
            {videoResources["video-101"] && (
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => window.open(videoResources["video-101"].streamUrl, '_blank')}
              >
                <FileVideo className="h-4 w-4 mr-2" />
                {videoResources["video-101"].title}
              </Button>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => setActiveTab("fireteam")}>
              View all shared resources
            </Button>
          </CardFooter>
        </Card>
        
        <CommunicationsSearch 
          onResultSelect={handleSearchResultSelect}
        />
      </div>
    </div>
  );
};

export default CommunicationHub;
