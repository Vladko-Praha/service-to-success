import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Info, CheckCircle2, Calendar, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Notice = {
  id: string;
  title: string;
  content: string;
  type: "mission-critical" | "high-priority" | "standard" | "informational";
  date: string;
  isNew?: boolean;
  expiresAt?: string;
  category: string;
};

const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Phase 2 Deployment Strategy Module Launching",
    content: "The new module on advanced market positioning will be available starting tomorrow. All personnel should report for training at 0900 hours.",
    type: "high-priority",
    date: "2025-04-01",
    isNew: true,
    category: "Training Update"
  },
  {
    id: "2",
    title: "System Maintenance Scheduled",
    content: "Platform will undergo scheduled maintenance on April 5th from 0200-0400 hours. Plan your operations accordingly.",
    type: "mission-critical",
    date: "2025-03-30",
    expiresAt: "2025-04-06",
    category: "Maintenance"
  },
  {
    id: "3",
    title: "Guest Speaker Webinar: Veteran Entrepreneurs",
    content: "Join our special webinar featuring successful veteran business owners on April 10th at 1900 hours.",
    type: "standard",
    date: "2025-03-28",
    category: "Event"
  },
  {
    id: "4",
    title: "New Resource: VA Small Business Loans Guide",
    content: "A comprehensive guide to VA small business loans has been added to the intelligence repository.",
    type: "informational",
    date: "2025-03-25",
    category: "Resource"
  }
];

type CommandNoticeBoardProps = {
  className?: string;
};

const CommandNoticeBoard = ({ className = "" }: CommandNoticeBoardProps) => {
  const { toast } = useToast();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getTypeIcon = (type: Notice["type"]) => {
    switch (type) {
      case "mission-critical":
        return <AlertTriangle className="h-5 w-5 text-military-red" />;
      case "high-priority":
        return <Bell className="h-5 w-5 text-[#FFB300]" />;
      case "standard":
        return <CheckCircle2 className="h-5 w-5 text-military-olive" />;
      case "informational":
        return <Info className="h-5 w-5 text-military-navy" />;
    }
  };

  const getTypeBadge = (type: Notice["type"]) => {
    switch (type) {
      case "mission-critical":
        return <Badge className="bg-military-red hover:bg-military-red/90">Mission Critical</Badge>;
      case "high-priority":
        return <Badge className="bg-[#FFB300] hover:bg-[#FFB300]/90">High Priority</Badge>;
      case "standard":
        return <Badge className="bg-military-olive hover:bg-military-olive/90">Standard</Badge>;
      case "informational":
        return <Badge className="bg-military-navy hover:bg-military-navy/90">Informational</Badge>;
    }
  };

  const handleAcknowledge = (id: string, title: string) => {
    toast({
      title: "Notice Acknowledged",
      description: `You have acknowledged: ${title}`,
    });
    // In a real implementation, this would update the database
    console.log(`Acknowledged notice ID: ${id}`);
  };

  const handleViewDetails = (notice: Notice) => {
    setSelectedNotice(notice);
    setDialogOpen(true);
  };

  const markAsRead = (id: string) => {
    toast({
      title: "Notice Marked as Read",
      description: "This notice will no longer appear as new",
    });
    // In a real implementation, this would update the database
    console.log(`Marked notice ID: ${id} as read`);
  };

  return (
    <>
      <Card className={`border-2 border-military-navy/20 ${className}`}>
        <CardHeader className="bg-military-navy/10 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-military-navy flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Command Notice Board
            </CardTitle>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 gap-1"
              onClick={() => toast({
                title: "Notice Board Refreshed",
                description: "Pulled latest notices from headquarters",
              })}
            >
              <span className="text-xs">Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-3">
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {mockNotices.map((notice) => (
              <div 
                key={notice.id} 
                className={`rounded-lg border p-3 relative ${
                  notice.type === "mission-critical" ? "border-military-red/30 bg-military-red/5" : 
                  notice.type === "high-priority" ? "border-[#FFB300]/30 bg-[#FFB300]/5" : 
                  notice.type === "standard" ? "border-military-olive/30 bg-military-olive/5" : 
                  "border-military-navy/30 bg-military-navy/5"
                } ${notice.isNew ? "ring-2 ring-military-navy/20" : ""}`}
              >
                {notice.isNew && (
                  <div className="absolute top-1 right-1">
                    <Badge variant="outline" className="text-xs bg-white">NEW</Badge>
                  </div>
                )}
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex items-start gap-2">
                    {getTypeIcon(notice.type)}
                    <div>
                      <h3 className="font-medium text-sm">{notice.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getTypeBadge(notice.type)}
                        <span className="text-xs text-muted-foreground">{notice.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {notice.content}
                </p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Posted: {notice.date}</span>
                    {notice.expiresAt && (
                      <span className="ml-2">Expires: {notice.expiresAt}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {notice.isNew && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={() => markAsRead(notice.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleViewDetails(notice)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-7 text-xs bg-military-navy hover:bg-military-navy/90"
                      onClick={() => handleAcknowledge(notice.id, notice.title)}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedNotice && getTypeIcon(selectedNotice.type)}
              <DialogTitle className="text-base">
                {selectedNotice?.title}
              </DialogTitle>
            </div>
            {selectedNotice && (
              <div className="flex items-center gap-2 mt-1">
                {getTypeBadge(selectedNotice.type)}
                <span className="text-xs text-muted-foreground">{selectedNotice.category}</span>
              </div>
            )}
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <DialogDescription className="text-sm whitespace-pre-line">
              {selectedNotice?.content}
            </DialogDescription>
            
            <div className="text-xs text-muted-foreground flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Posted: {selectedNotice?.date}</span>
              </div>
              {selectedNotice?.expiresAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Expires: {selectedNotice?.expiresAt}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button
              size="sm"
              className="h-8 text-xs bg-military-navy hover:bg-military-navy/90"
              onClick={() => {
                if (selectedNotice) {
                  handleAcknowledge(selectedNotice.id, selectedNotice.title);
                  setDialogOpen(false);
                }
              }}
            >
              Acknowledge
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandNoticeBoard;
