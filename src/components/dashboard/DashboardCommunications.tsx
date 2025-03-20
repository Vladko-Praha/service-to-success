
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandNoticeBoard from "@/components/communications/CommandNoticeBoard";
import { MessageSquare, Users, Bell, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NotificationBell from "@/components/communications/NotificationBell";
import DirectMessages from "@/components/communications/DirectMessages";
import FireTeamNetwork from "@/components/communications/FireTeamNetwork";
import Notifications from "@/components/communications/Notifications";
import Broadcasts from "@/components/communications/Broadcasts";
import CommunicationsSearch, { SearchResult } from "@/components/communications/CommunicationsSearch";
import { useLocation } from "react-router-dom";

const DashboardCommunications = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const location = useLocation();

  // Handle URL parameters for deep linking
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam && ["messages", "fireteam", "notifications", "broadcasts"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const handleSearchResultSelect = (result: SearchResult) => {
    // Set the active tab based on the search result
    setActiveTab(result.tab);
    
    // Additional logic could be added here to scroll to the specific message or post
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Communications Center
        </h2>
        <div className="flex items-center gap-4">
          <CommunicationsSearch onResultSelect={handleSearchResultSelect} />
          <NotificationBell />
        </div>
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
          <DirectMessages />
        </TabsContent>
        
        <TabsContent value="fireteam" className="mt-4">
          <FireTeamNetwork />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Notifications />
        </TabsContent>
        
        <TabsContent value="broadcasts" className="mt-4">
          <Broadcasts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCommunications;
