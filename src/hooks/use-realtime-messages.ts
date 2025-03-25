
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from './use-toast';

// Define message type
export type RealTimeMessage = {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_status: "online" | "offline" | "away";
  content: string;
  timestamp: string;
  conversation_id: string;
  status: "sending" | "sent" | "delivered" | "read";
  is_starred?: boolean;
  is_important?: boolean;
  attachments?: {
    id: string;
    name: string;
    type: "pdf" | "image" | "document" | "video" | "audio";
    url: string;
  }[];
};

// Conversation type
export type RealTimeConversation = {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar?: string;
    status: "online" | "offline" | "away";
    role?: string;
    isTyping?: boolean;
  };
  subject?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isStarred?: boolean;
  isImportant?: boolean;
  labels?: string[];
};

// Create a Supabase client (using public key only - this is safe for client-side code)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pbxfeajucqhjxzqyylpo.supabase.co'; // Default to a placeholder URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieGZlYWp1Y3Foanh6cXl5bHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxOTg5MzAsImV4cCI6MTk5NTc3NDkzMH0.0h66UMDJgXKOLx-sspYwI6jTH6XVCcnLGME9ITxXlIw';

const supabase = createClient(supabaseUrl, supabaseKey);

// Initial mock data for development
const initialMockConversations: RealTimeConversation[] = [
  {
    id: "1",
    contact: {
      id: "user1",
      name: "Samsung",
      status: "online",
      role: "Training Coordinator",
      isTyping: false
    },
    subject: "We've missed you. Ready to win? Enter our $5k Bespoke AI sweepstakes",
    lastMessage: "When will you complete the market analysis assignment?",
    timestamp: "23:11",
    unread: 2,
    isImportant: true
  },
  {
    id: "2",
    contact: {
      id: "user2",
      name: "The Substack Post",
      status: "online",
      role: "Business Mentor",
      isTyping: false
    },
    subject: "Substack on Film - Watch now (2 mins) | A new series celebrating writers and ...",
    lastMessage: "I've reviewed your business plan draft",
    timestamp: "21:06",
    unread: 0
  },
  {
    id: "3",
    contact: {
      id: "user3",
      name: "Rohlik.cz",
      status: "away",
      role: "Finance Advisor",
      isTyping: false
    },
    subject: "Udržitelné, certifikované a dokonale chlazené",
    lastMessage: "Let's schedule a funding strategy call",
    timestamp: "18:04",
    unread: 0,
    isStarred: false
  },
  {
    id: "4",
    contact: {
      id: "user4",
      name: "Kajabi",
      status: "offline",
      role: "Program Director",
      isTyping: false
    },
    subject: "Step 2: Time to Make Your Brand Stand Out - Unleash your creativity and make...",
    lastMessage: "Congratulations on completing Phase 1!",
    timestamp: "17:56",
    unread: 0
  },
  {
    id: "5",
    contact: {
      id: "user5",
      name: "Instagram",
      status: "online",
      role: "Social Media",
      isTyping: false
    },
    subject: "Máte 1 nepřečtenou zprávu. - Máte nepřečtené zpr...",
    lastMessage: "You have 1 unread message",
    timestamp: "15:30",
    unread: 1
  }
];

const initialMockMessages: Record<string, RealTimeMessage[]> = {
  "1": [
    {
      id: "msg1",
      sender_id: "user1",
      sender_name: "Captain Sarah Johnson",
      sender_status: "online",
      content: "Good morning! How is your progress on the market analysis assignment? The deadline is approaching this Friday.",
      timestamp: "10:15 AM",
      conversation_id: "1",
      status: "read"
    },
    {
      id: "msg2",
      sender_id: "current-user",
      sender_name: "You",
      sender_status: "online",
      content: "I'm about 75% complete. I've analyzed the market size and competitors but need more time for the opportunity assessment section.",
      timestamp: "10:20 AM",
      conversation_id: "1",
      status: "read"
    },
    {
      id: "msg3",
      sender_id: "user1",
      sender_name: "Captain Sarah Johnson",
      sender_status: "online",
      content: "That's good progress. Would you like me to review what you have so far? I might be able to provide some guidance on the opportunity assessment.",
      timestamp: "10:25 AM",
      conversation_id: "1",
      status: "read"
    },
    {
      id: "msg4",
      sender_id: "user1",
      sender_name: "Captain Sarah Johnson",
      sender_status: "online",
      content: "When will you complete the market analysis assignment?",
      timestamp: "10:32 AM",
      conversation_id: "1",
      status: "delivered",
      attachments: [
        {
          id: "attach1",
          name: "Market Analysis Template.pdf",
          type: "pdf",
          url: "#"
        }
      ]
    }
  ],
  "2": [
    {
      id: "msg5",
      sender_id: "user2",
      sender_name: "Sgt. Michael Brooks",
      sender_status: "online",
      content: "I've reviewed your business plan draft. It has potential but needs work on the financial projections.",
      timestamp: "Yesterday",
      conversation_id: "2",
      status: "read",
      attachments: [
        {
          id: "attach2",
          name: "Financial Projections Feedback.pdf",
          type: "pdf",
          url: "#"
        }
      ]
    }
  ],
  "3": [
    {
      id: "msg6",
      sender_id: "user3",
      sender_name: "Lt. Jessica Martinez",
      sender_status: "away",
      content: "Let's schedule a funding strategy call. I have some resources that might help with your venture.",
      timestamp: "Monday",
      conversation_id: "3",
      status: "read"
    }
  ],
  "4": [
    {
      id: "msg7",
      sender_id: "user4",
      sender_name: "Lt. Col. David Clark",
      sender_status: "offline",
      content: "Congratulations on completing Phase 1! You're making excellent progress in the program.",
      timestamp: "3/20/25",
      conversation_id: "4",
      status: "read"
    }
  ]
};

export function useRealtimeMessages() {
  const [conversations, setConversations] = useState<RealTimeConversation[]>(initialMockConversations);
  const [messages, setMessages] = useState<Record<string, RealTimeMessage[]>>(initialMockMessages);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Supabase realtime subscription
  useEffect(() => {
    // Set up Supabase tables if they don't exist (in a real app, this would be done in migrations)
    const setupTables = async () => {
      try {
        console.log("Setting up Supabase tables for messages...");
        
        // In a real app, the tables would already be created in Supabase
        // For demo purposes, we'll pretend this is successful
        setIsConnected(true);
      } catch (error) {
        console.error("Error setting up tables:", error);
        setConnectionError("Could not set up tables");
      }
    };

    setupTables();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('messages-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        console.log('Received real-time message:', payload);
        
        // In a real application, we would process the payload here
        // For now, we're using mock data
        
        // For demonstration purposes, let's pretend we received a real-time message
        // after 5 seconds when the hook is first used
        const timer = setTimeout(() => {
          const newMessage: RealTimeMessage = {
            id: `realtime-${Date.now()}`,
            sender_id: "user1",
            sender_name: "Captain Sarah Johnson",
            sender_status: "online",
            content: "This is a real-time message from Supabase! [Demo]",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            conversation_id: "1",
            status: "sent"
          };
          
          // Add the new message to the conversation
          setMessages(prev => ({
            ...prev,
            "1": [...(prev["1"] || []), newMessage]
          }));
          
          // Update the conversation's last message
          setConversations(prev => 
            prev.map(conv => 
              conv.id === "1" 
                ? { 
                    ...conv, 
                    lastMessage: newMessage.content,
                    timestamp: newMessage.timestamp,
                    unread: conv.unread + 1
                  } 
                : conv
            )
          );
          
          // Show a toast notification
          toast({
            title: "New Message",
            description: `${newMessage.sender_name}: ${newMessage.content.substring(0, 30)}${newMessage.content.length > 30 ? '...' : ''}`,
          });
        }, 5000);
        
        return () => clearTimeout(timer);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Function to send a new message
  const sendMessage = async (conversationId: string, content: string, attachments?: any[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;
    
    // Create a new message object
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessageId = `msg-${Date.now()}`;
    
    const newMessage: RealTimeMessage = {
      id: newMessageId,
      sender_id: "current-user",
      sender_name: "You",
      sender_status: "online",
      content,
      timestamp,
      conversation_id: conversationId,
      status: "sending",
      attachments: attachments ? attachments.map((attachment, index) => ({
        id: `attach-${Date.now()}-${index}`,
        name: attachment.name || `Attachment ${index + 1}`,
        type: attachment.type || "document",
        url: attachment.url || "#"
      })) : undefined
    };
    
    // Optimistically update UI
    setMessages(prevMessages => ({
      ...prevMessages,
      [conversationId]: [
        ...(prevMessages[conversationId] || []),
        newMessage
      ]
    }));

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: content,
              timestamp
            }
          : conv
      )
    );
    
    // In a real app, we would send the message to Supabase here
    // For demonstration, we'll simulate the process
    
    // Simulate sending (after a short delay)
    setTimeout(() => {
      setMessages(prevMessages => {
        const updatedMessages = prevMessages[conversationId].map(msg =>
          msg.id === newMessageId ? { ...msg, status: "sent" as const } : msg
        );

        return {
          ...prevMessages,
          [conversationId]: updatedMessages
        };
      });

      // Simulate delivery (after another delay)
      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = prevMessages[conversationId].map(msg =>
            msg.id === newMessageId ? { ...msg, status: "delivered" as const } : msg
          );

          return {
            ...prevMessages,
            [conversationId]: updatedMessages
          };
        });

        // Simulate read (after final delay)
        setTimeout(() => {
          setMessages(prevMessages => {
            const updatedMessages = prevMessages[conversationId].map(msg =>
              msg.id === newMessageId ? { ...msg, status: "read" as const } : msg
            );

            return {
              ...prevMessages,
              [conversationId]: updatedMessages
            };
          });
        }, 2000);
      }, 1500);
    }, 1000);

    return newMessageId;
  };

  // Function to update message status
  const updateMessageStatus = (messageId: string, conversationId: string, status: "sent" | "delivered" | "read") => {
    setMessages(prevMessages => {
      if (!prevMessages[conversationId]) return prevMessages;
      
      const updatedMessages = prevMessages[conversationId].map(msg =>
        msg.id === messageId ? { ...msg, status } : msg
      );

      return {
        ...prevMessages,
        [conversationId]: updatedMessages
      };
    });
  };

  // Function to mark a conversation as read
  const markConversationAsRead = (conversationId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
    
    // Mark all messages in the conversation as read
    setMessages(prevMessages => {
      if (!prevMessages[conversationId]) return prevMessages;
      
      const updatedMessages = prevMessages[conversationId].map(msg =>
        msg.sender_id !== "current-user" && msg.status !== "read" 
          ? { ...msg, status: "read" as const } 
          : msg
      );

      return {
        ...prevMessages,
        [conversationId]: updatedMessages
      };
    });
  };

  // Function to toggle star status of a conversation
  const toggleConversationStar = (conversationId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, isStarred: !conv.isStarred } : conv
      )
    );
  };

  // Function to toggle star status of a message
  const toggleMessageStar = (messageId: string, conversationId: string) => {
    setMessages(prevMessages => {
      if (!prevMessages[conversationId]) return prevMessages;
      
      const updatedMessages = prevMessages[conversationId].map(msg =>
        msg.id === messageId ? { ...msg, is_starred: !msg.is_starred } : msg
      );

      return {
        ...prevMessages,
        [conversationId]: updatedMessages
      };
    });
  };

  // Function to toggle important status of a conversation
  const toggleConversationImportant = (conversationId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, isImportant: !conv.isImportant } : conv
      )
    );
  };

  // Function to create a new conversation
  const createConversation = (contact: RealTimeConversation['contact'], subject?: string) => {
    const newConversationId = `conv-${Date.now()}`;
    const newConversation: RealTimeConversation = {
      id: newConversationId,
      contact,
      subject,
      lastMessage: "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: 0
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConversationId]: []
    }));
    
    return newConversationId;
  };

  // Function to delete a conversation
  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    
    setMessages(prev => {
      const { [conversationId]: removed, ...rest } = prev;
      return rest;
    });
  };

  return {
    conversations,
    messages,
    isConnected,
    connectionError,
    sendMessage,
    updateMessageStatus,
    markConversationAsRead,
    toggleConversationStar,
    toggleMessageStar,
    toggleConversationImportant,
    createConversation,
    deleteConversation
  };
}
