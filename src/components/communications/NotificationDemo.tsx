
import React from "react";
import { Button } from "@/components/ui/button";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import { AlertTriangle, Bell, CheckCircle2, Info } from "lucide-react";

export const NotificationDemo = () => {
  const { addNotification } = useRealtimeNotifications();

  const sendInfoNotification = () => {
    addNotification({
      title: "Information Update",
      description: "Weekly training schedule has been updated.",
      read: false,
      type: "informational"
    });
  };

  const sendStandardNotification = () => {
    addNotification({
      title: "New Resource Available",
      description: "Business plan template has been added to your resources.",
      read: false,
      type: "standard"
    });
  };

  const sendHighPriorityNotification = () => {
    addNotification({
      title: "Upcoming Deadline",
      description: "Your market analysis is due in 48 hours.",
      read: false,
      type: "high-priority"
    });
  };

  const sendCriticalNotification = () => {
    addNotification({
      title: "Mission Critical Alert",
      description: "Immediate action required: Update your security credentials.",
      read: false,
      type: "mission-critical"
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md mb-4">
      <h3 className="font-medium mb-2">Test Notifications</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={sendInfoNotification}
          className="flex items-center gap-1 border-military-navy/30"
        >
          <Info className="h-4 w-4 text-military-navy" />
          Info
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={sendStandardNotification}
          className="flex items-center gap-1 border-military-olive/30"
        >
          <Bell className="h-4 w-4 text-military-olive" />
          Standard
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={sendHighPriorityNotification}
          className="flex items-center gap-1 border-[#FFB300]/30"
        >
          <CheckCircle2 className="h-4 w-4 text-[#FFB300]" />
          High Priority
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={sendCriticalNotification}
          className="flex items-center gap-1 border-military-red/30"
        >
          <AlertTriangle className="h-4 w-4 text-military-red" />
          Critical
        </Button>
      </div>
    </div>
  );
};
