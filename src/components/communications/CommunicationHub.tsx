
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandNoticeBoard from "./CommandNoticeBoard";
import { MessageSquare, Users, Bell, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DirectMessages from "./DirectMessages";
import FireTeamNetwork from "./FireTeamNetwork";
import Notifications from "./Notifications";
import Broadcasts from "./Broadcasts";
import CommunicationsSearch, { SearchResult } from "./CommunicationsSearch";
import { useLocation } from "react-router-dom";

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const location = useLocation();

  // Handle URL parameters for deep linking
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    const messageId = searchParams.get("id");
    
    if (tabParam && ["messages", "fireteam", "notifications", "broadcasts"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    
    if (messageId) {
      setSelectedMessageId(messageId);
    }
  }, [location]);

  const handleSearchResultSelect = (result: SearchResult) => {
    // Set the active tab based on the search result
    setActiveTab(result.tab);
    
    // Set the selected message ID to focus on the specific message
    setSelectedMessageId(result.id);
    
    console.log("Selected result:", result);
    console.log("Setting active tab to:", result.tab);
    console.log("Setting selected message ID to:", result.id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Communications Hub
        </h2>
        <CommunicationsSearch onResultSelect={handleSearchResultSelect} />
      </div>
      
      <CommandNoticeBoard className="mb-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
  );
};

export default CommunicationHub;
