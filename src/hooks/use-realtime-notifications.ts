import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from './use-toast';
import { cohortStudents } from '@/data/cohortStudents';

// Define notification type
export type RealtimeNotification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "mission-critical" | "high-priority" | "standard" | "informational" | "mention";
  mentionedBy?: string;
  mentionedUsers?: string[];
};

// Create a Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pbxfeajucqhjxzqyylpo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieGZlYWp1Y3Foanh6cXl5bHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxOTg5MzAsImV4cCI6MTk5NTc3NDkzMH0.0h66UMDJgXKOLx-sspYwI6jTH6XVCcnLGME9ITxXlIw';

const supabase = createClient(supabaseUrl, supabaseKey);

// Initial mock notifications
const initialNotifications: RealtimeNotification[] = [
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

// Regex to find user mentions in text - matches @username or @"User Name"
const mentionRegex = /@(?:"([^"]+)"|([^\s]+))/g;

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>(initialNotifications);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Supabase realtime subscription
  useEffect(() => {
    // Connect to Supabase realtime
    console.log("Setting up Supabase realtime for notifications...");
    setIsConnected(true);

    // Subscribe to notification changes
    const subscription = supabase
      .channel('notifications-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications' 
      }, (payload) => {
        console.log('Received real-time notification:', payload);
        
        // For demonstration purposes, let's add a demo notification after 8 seconds
        const timer = setTimeout(() => {
          const newNotification: RealtimeNotification = {
            id: `realtime-${Date.now()}`,
            title: "Real-time Alert",
            description: "This is a real-time notification from the system. [Demo]",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
            type: "high-priority"
          };
          
          // Add the new notification
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast notification
          toast({
            title: newNotification.title,
            description: newNotification.description,
          });
        }, 8000);
        
        return () => clearTimeout(timer);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    
    toast({
      title: "All Notifications Marked as Read",
      description: "Your notification center has been cleared.",
    });
  };

  // Process text to find and highlight mentions
  const processMentions = (text: string): { 
    processedText: string, 
    mentionedUserIds: string[] 
  } => {
    const mentionedUserIds: string[] = [];
    
    // Replace mentions with HTML for highlighted mentions
    const processedText = text.replace(mentionRegex, (match, quotedName, simpleName) => {
      const nameToFind = quotedName || simpleName;
      const user = cohortStudents.find(student => 
        student.name.toLowerCase() === nameToFind.toLowerCase() || 
        student.name.split(' ')[0].toLowerCase() === nameToFind.toLowerCase()
      );
      
      if (user) {
        mentionedUserIds.push(user.id);
        return `<span class="inline-flex items-center rounded-full bg-military-olive/20 px-1 text-military-olive">@${user.name}</span>`;
      }
      
      return match; // Keep original text if no user found
    });
    
    return { processedText, mentionedUserIds };
  };

  // Function to add a new notification (for testing)
  const addNotification = (notification: Omit<RealtimeNotification, 'id' | 'time'>) => {
    const { processedText, mentionedUserIds } = processMentions(notification.description);
    
    const newNotification: RealtimeNotification = {
      id: `notification-${Date.now()}`,
      ...notification,
      description: processedText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mentionedUsers: mentionedUserIds.length > 0 ? mentionedUserIds : undefined
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Determine if this is a mention notification
    const isMention = notification.type === "mention" || mentionedUserIds.length > 0;
    
    toast({
      title: newNotification.title,
      description: newNotification.description,
      variant: notification.type === "mission-critical" 
        ? "destructive" 
        : isMention 
          ? "mention" 
          : "default",
    });
  };

  // Add a method to create mention notifications
  const createMentionNotification = (
    fromUser: string, 
    message: string, 
    context: string = "direct message"
  ) => {
    const { processedText, mentionedUserIds } = processMentions(message);
    
    if (mentionedUserIds.length > 0) {
      addNotification({
        title: `${fromUser} mentioned you in a ${context}`,
        description: processedText,
        read: false,
        type: "mention",
        mentionedBy: fromUser,
        mentionedUsers: mentionedUserIds
      });
    }
    
    return { processedText, mentionedUserIds };
  };

  return {
    notifications,
    isConnected,
    connectionError,
    markAsRead,
    markAllAsRead,
    addNotification,
    createMentionNotification,
    processMentions,
    unreadCount: notifications.filter(n => !n.read).length
  };
}
