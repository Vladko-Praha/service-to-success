
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Clock, CheckCheck, Filter, Settings, Flag, Calendar, Award, FileText, MessageSquare, Users, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "mission" | "training" | "message" | "system" | "fire-team" | "resource";
  read: boolean;
  actionable?: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "Mission Checkpoint Achieved",
    description: "You've completed the Market Research phase of your Business Launch mission.",
    timestamp: "30 minutes ago",
    type: "mission",
    read: false,
    actionable: true
  },
  {
    id: "notif2",
    title: "New Training Module Available",
    description: "Marketing Fundamentals for Veteran Entrepreneurs is now available in your learning dashboard.",
    timestamp: "2 hours ago",
    type: "training",
    read: false,
    actionable: true
  },
  {
    id: "notif3",
    title: "Direct Message from Captain Johnson",
    description: "Please submit your business plan draft by Friday for review.",
    timestamp: "Yesterday",
    type: "message",
    read: true
  },
  {
    id: "notif4",
    title: "System Maintenance Completed",
    description: "The scheduled platform maintenance has been completed successfully.",
    timestamp: "2 days ago",
    type: "system",
    read: true
  },
  {
    id: "notif5",
    title: "Fireteam Alpha Posted an Update",
    description: "New resource shared: 'VA Small Business Loan Application Guide'",
    timestamp: "3 days ago",
    type: "fire-team",
    read: true,
    actionable: true
  },
  {
    id: "notif6",
    title: "Workshop Reminder",
    description: "Virtual workshop on Business Financing starts tomorrow at 1900 hours.",
    timestamp: "3 days ago",
    type: "training",
    read: true,
    actionable: true
  },
  {
    id: "notif7",
    title: "Resource Recommendation",
    description: "Based on your progress, we recommend reviewing the Marketing Strategy Toolkit.",
    timestamp: "4 days ago",
    type: "resource",
    read: true,
    actionable: true
  },
  {
    id: "notif8",
    title: "Mission Due Date Approaching",
    description: "Your Business Model Canvas submission is due in 3 days.",
    timestamp: "5 days ago",
    type: "mission",
    read: true,
    actionable: true
  }
];

const NotificationSettings = [
  { id: "missions", label: "Mission Updates", description: "Achievements, deadlines, and progress alerts", defaultChecked: true },
  { id: "training", label: "Training Notifications", description: "New courses, workshops, and learning resources", defaultChecked: true },
  { id: "messages", label: "Direct Messages", description: "Messages from instructors and mentors", defaultChecked: true },
  { id: "system", label: "System Notifications", description: "Maintenance updates and platform changes", defaultChecked: true },
  { id: "team", label: "Fire Team Activity", description: "Updates from your fire team network", defaultChecked: true },
  { id: "resources", label: "Resource Alerts", description: "New and recommended resources", defaultChecked: true },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "mission":
      return <Flag className="h-5 w-5 text-military-navy" />;
    case "training":
      return <FileText className="h-5 w-5 text-military-olive" />;
    case "message":
      return <MessageSquare className="h-5 w-5 text-[#FFB300]" />;
    case "system":
      return <Settings className="h-5 w-5 text-neutral-500" />;
    case "fire-team":
      return <Users className="h-5 w-5 text-military-red" />;
    case "resource":
      return <Truck className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [activeTab, setActiveTab] = React.useState("all");
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
    
    toast({
      title: "All Notifications Marked as Read",
      description: "You have cleared all unread notifications."
    });
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notif => notif.id !== id)
    );
    
    toast({
      title: "Notification Removed",
      description: "The notification has been deleted from your list."
    });
  };
  
  const handleAction = (notification: Notification) => {
    markAsRead(notification.id);
    
    toast({
      title: "Action Taken",
      description: `You've taken action on: ${notification.title}`
    });
  };
  
  // Filter notifications based on active tab
  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter(notif => !notif.read);
    return notifications.filter(notif => notif.type === activeTab);
  }, [notifications, activeTab]);
  
  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-military-navy flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm px-2 py-0.5 bg-military-navy text-white rounded-full">
              {unreadCount} new
            </span>
          )}
        </h3>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark All Read
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-military-beige/30 h-9">
          <TabsTrigger 
            value="all" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="unread" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger 
            value="mission" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Missions
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Training
          </TabsTrigger>
          <TabsTrigger 
            value="message" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger 
            value="fire-team" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Fire Team
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="h-8 px-3 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        {activeTab !== "settings" ? (
          <TabsContent value={activeTab} className="mt-4">
            <ScrollArea className="h-[500px] rounded-md">
              <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`border ${notification.read ? "bg-white" : "bg-military-beige/10 border-military-navy/20"}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className={`font-medium ${!notification.read ? "text-military-navy" : ""}`}>{notification.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {notification.timestamp}
                                </div>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-military-navy mt-1"></div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-2 mt-3">
                              {!notification.read && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCheck className="h-4 w-4 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              
                              {notification.actionable && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleAction(notification)}
                                  className={notification.type === "mission" ? "bg-military-navy" : 
                                             notification.type === "training" ? "bg-military-olive" :
                                             notification.type === "fire-team" ? "bg-military-red" :
                                             ""}
                                >
                                  View Details
                                </Button>
                              )}
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-muted-foreground"
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No notifications to display</p>
                    {activeTab === "unread" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        All caught up! You have no unread notifications.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ) : (
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-military-navy">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize which notifications you receive and how they are delivered.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {NotificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between">
                      <div>
                        <Label htmlFor={setting.id} className="font-medium">
                          {setting.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        id={setting.id}
                        defaultChecked={setting.defaultChecked}
                        onCheckedChange={(checked) => 
                          toast({
                            title: checked ? "Notifications Enabled" : "Notifications Disabled",
                            description: `${setting.label} notifications have been ${checked ? "enabled" : "disabled"}.`
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-military-navy mb-4">Delivery Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a daily digest of important notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        defaultChecked={true}
                        onCheckedChange={(checked) => 
                          toast({
                            title: checked ? "Email Notifications Enabled" : "Email Notifications Disabled",
                            description: `Email notifications have been ${checked ? "enabled" : "disabled"}.`
                          })
                        }
                      />
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <Label htmlFor="mobile-notifications" className="font-medium">
                          Mobile Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive real-time push notifications on your mobile device
                        </p>
                      </div>
                      <Switch
                        id="mobile-notifications"
                        defaultChecked={true}
                        onCheckedChange={(checked) => 
                          toast({
                            title: checked ? "Mobile Notifications Enabled" : "Mobile Notifications Disabled",
                            description: `Mobile push notifications have been ${checked ? "enabled" : "disabled"}.`
                          })
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Settings Saved",
                          description: "Your notification preferences have been updated successfully."
                        });
                        setActiveTab("all");
                      }}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Notifications;
