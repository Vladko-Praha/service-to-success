
import React from "react";
import { NotificationBell } from "@/components/communications/NotificationBell";
import CommunicationHub from "@/components/communications/CommunicationHub";

const Communications = () => {
  return (
    <div className="container py-6">
      <div className="flex justify-end mb-4">
        <NotificationBell />
      </div>
      <CommunicationHub />
    </div>
  );
};

export default Communications;
