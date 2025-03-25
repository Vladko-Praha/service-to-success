
import React from "react";
import NotificationBell from "@/components/communications/NotificationBell";
import CommunicationHub from "@/components/communications/CommunicationHub";
import { NotificationDemo } from "@/components/communications/NotificationDemo";
import CohortDirectory from "@/components/communications/CohortDirectory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users } from "lucide-react";

const Communications = () => {
  return (
    <div className="container py-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-military-navy">Communications Center</h2>
        <NotificationBell />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <NotificationDemo />
        </div>
        <div>
          <CohortDirectory mode="compact" />
        </div>
      </div>
      
      <Tabs defaultValue="hub" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="hub" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Communication Hub
          </TabsTrigger>
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Full Directory
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hub">
          <CommunicationHub />
        </TabsContent>
        
        <TabsContent value="directory">
          <CohortDirectory mode="full" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communications;
