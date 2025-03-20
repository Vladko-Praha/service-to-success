
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandNoticeBoard from "./CommandNoticeBoard";
import { MessageSquare, Users, Bell, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CommunicationHub = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-military-navy">
        Communications Hub
      </h2>
      
      <CommandNoticeBoard className="mb-6" />
      
      <Tabs defaultValue="messages" className="w-full">
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
        
        <TabsContent value="messages" className="p-4 border rounded-lg mt-4">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Direct message functionality will be implemented next.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="fireteam" className="p-4 border rounded-lg mt-4">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Fire Team Network functionality will be implemented next.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="p-4 border rounded-lg mt-4">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Notifications functionality will be implemented next.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="broadcasts" className="p-4 border rounded-lg mt-4">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Broadcasts functionality will be implemented next.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
