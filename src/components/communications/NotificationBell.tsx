
import React, { useState, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const NotificationBell = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    unreadCount,
    isConnected
  } = useRealtimeNotifications();
  
  const [open, setOpen] = useState(false);
  const [showConnectedAlert, setShowConnectedAlert] = useState(false);
  const { toast } = useToast();

  // Show connected alert when first connected
  useEffect(() => {
    if (isConnected) {
      setShowConnectedAlert(true);
      const timer = setTimeout(() => {
        setShowConnectedAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    toast({
      title: notification.title,
      description: notification.description,
      variant: notification.type === "mission-critical" ? "destructive" : "default",
    });
  };

  const getNotificationColor = (type: string) => {
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

  // Animate bell when there are unread notifications
  const bellAnimation = unreadCount > 0 ? "animate-pulse" : "";

  return (
    <div className="relative">
      {showConnectedAlert && (
        <div className="absolute -top-12 right-0 w-60 z-50 animate-fade-in">
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle className="text-green-800 text-xs">Connected</AlertTitle>
            <AlertDescription className="text-green-700 text-xs">
              Real-time notifications active
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={`relative ${bellAnimation}`}>
            {unreadCount > 0 ? (
              <BellRing className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
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
    </div>
  );
};

export default NotificationBell;
