
import React from "react";
import NotificationBell from "@/components/communications/NotificationBell";
import CommunicationHub from "@/components/communications/CommunicationHub";
import { NotificationDemo } from "@/components/communications/NotificationDemo";

const Communications = () => {
  return (
    <div className="container py-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-military-navy">Communications Center</h2>
        <NotificationBell />
      </div>
      
      <NotificationDemo />
      
      <CommunicationHub />
    </div>
  );
};

export default Communications;
