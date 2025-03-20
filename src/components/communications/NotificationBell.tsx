
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "mission-critical" | "high-priority" | "standard" | "informational";
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Assignment Due Soon",
    description: "Your business plan submission is due in 24 hours.",
    time: "1 hour ago",
    read: false,
    type: "high-priority",
  },
  {
    id: "2",
    title: "New Message",
    description: "You have a new message from your mentor.",
    time: "3 hours ago",
    read: false,
    type: "standard",
  },
  {
    id: "3",
    title: "Module Completed",
    description: "Congratulations on completing the Financial Planning module!",
    time: "Yesterday",
    read: false,
    type: "informational",
  },
  {
    id: "4",
    title: "System Maintenance",
    description: "Platform will be down for maintenance from 0200-0400 hours tomorrow.",
    time: "Yesterday",
    read: true,
    type: "mission-critical",
  },
];

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All Notifications Marked as Read",
      description: "Your notification center has been cleared.",
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    toast({
      title: notification.title,
      description: notification.description,
      variant: notification.type === "mission-critical" ? "destructive" : "default",
    });
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "mission-critical":
        return "border-l-4 border-military-red bg-military-red/5";
      case "high-priority":
        return "border-l-4 border-[#FFB300] bg-[#FFB300]/5";
      case "standard":
        return "border-l-4 border-military-olive bg-military-olive/5";
      case "informational":
        return "border-l-4 border-military-navy bg-military-navy/5";
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center bg-military-red text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs" 
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-0 focus:bg-transparent ${!notification.read ? "cursor-pointer" : "opacity-70"}`}
                onSelect={(e) => e.preventDefault()}
              >
                <div 
                  className={`py-2 px-3 w-full ${getNotificationColor(notification.type)}`}
                  onClick={() => !notification.read && handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                    </div>
                    {!notification.read && <div className="h-2 w-2 rounded-full bg-military-navy mt-1 flex-shrink-0"></div>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                <DropdownMenuSeparator className="my-0" />
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-3 px-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" asChild>
          <Button variant="ghost" size="sm" className="w-full" onClick={() => setOpen(false)}>
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
