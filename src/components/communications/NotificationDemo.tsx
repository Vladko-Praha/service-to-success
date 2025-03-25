
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import { AlertTriangle, Bell, CheckCircle2, Info, AtSign, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cohortStudents } from "@/data/cohortStudents";
import UserMention from "./UserMention";

export const NotificationDemo = () => {
  const { addNotification, createMentionNotification } = useRealtimeNotifications();
  const [mentionInput, setMentionInput] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(cohortStudents);

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

  const handleMentionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMentionInput(value);
    
    // Filter users when typing after @
    const mentionMatch = value.match(/@(\w*)$/);
    if (mentionMatch) {
      const searchTerm = mentionMatch[1].toLowerCase();
      const filtered = cohortStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm) || 
        student.name.split(' ')[0].toLowerCase().includes(searchTerm)
      );
      setFilteredUsers(filtered);
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  const insertMention = (name: string) => {
    // Replace the last @word with the full name
    const newValue = mentionInput.replace(/@\w*$/, `@"${name}" `);
    setMentionInput(newValue);
    setShowUserList(false);
  };

  const handleSendMention = () => {
    if (!mentionInput.trim()) return;
    
    createMentionNotification("You", mentionInput, "test message");
    setMentionInput("");
  };

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md mb-4">
      <h3 className="font-medium mb-2">Test Notifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
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
        
        <div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Test User Mentions</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={mentionInput}
                  onChange={handleMentionInputChange}
                  placeholder='Type @ to mention users (e.g., "Hello @John")'
                  className="w-full"
                />
                
                {showUserList && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div 
                          key={user.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => insertMention(user.name)}
                        >
                          <UserMention
                            userId={user.id}
                            name={user.name}
                            status={user.status}
                            role={user.role}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No users found</div>
                    )}
                  </div>
                )}
              </div>
              
              <Button onClick={handleSendMention} size="sm" className="flex items-center gap-1">
                <AtSign className="h-4 w-4" />
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500">Try mentioning @John, @Maria, or @David</p>
          </div>
        </div>
      </div>
    </div>
  );
};
