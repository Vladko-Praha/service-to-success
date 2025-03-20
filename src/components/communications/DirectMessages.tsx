import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Search, Send, User, FileText, Paperclip, Image, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    status: "online" | "offline" | "away";
  };
  content: string;
  timestamp: string;
  read: boolean;
};

type Conversation = {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar?: string;
    status: "online" | "offline" | "away";
    role?: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    contact: {
      id: "user1",
      name: "Captain Sarah Johnson",
      status: "online",
      role: "Training Coordinator"
    },
    lastMessage: "When will you complete the market analysis assignment?",
    timestamp: "10:32 AM",
    unread: 2
  },
  {
    id: "2",
    contact: {
      id: "user2",
      name: "Sgt. Michael Brooks",
      status: "online",
      role: "Business Mentor"
    },
    lastMessage: "I've reviewed your business plan draft",
    timestamp: "Yesterday",
    unread: 1
  },
  {
    id: "3",
    contact: {
      id: "user3",
      name: "Lt. Jessica Martinez",
      status: "away",
      role: "Finance Advisor"
    },
    lastMessage: "Let's schedule a funding strategy call",
    timestamp: "Monday",
    unread: 0
  },
  {
    id: "4",
    contact: {
      id: "user4",
      name: "Lt. Col. David Clark",
      status: "offline",
      role: "Program Director"
    },
    lastMessage: "Congratulations on completing Phase 1!",
    timestamp: "3/20/25",
    unread: 0
  }
];

const mockActiveConversation: {
  contact: Conversation['contact'];
  messages: Message[];
} = {
  contact: {
    id: "user1",
    name: "Captain Sarah Johnson",
    status: "online",
    role: "Training Coordinator"
  },
  messages: [
    {
      id: "msg1",
      sender: {
        id: "user1",
        name: "Captain Sarah Johnson",
        status: "online"
      },
      content: "Good morning! How is your progress on the market analysis assignment? The deadline is approaching this Friday.",
      timestamp: "10:15 AM",
      read: true
    },
    {
      id: "msg2",
      sender: {
        id: "current-user",
        name: "You",
        status: "online"
      },
      content: "I'm about 75% complete. I've analyzed the market size and competitors but need more time for the opportunity assessment section.",
      timestamp: "10:20 AM",
      read: true
    },
    {
      id: "msg3",
      sender: {
        id: "user1",
        name: "Captain Sarah Johnson",
        status: "online"
      },
      content: "That's good progress. Would you like me to review what you have so far? I might be able to provide some guidance on the opportunity assessment.",
      timestamp: "10:25 AM",
      read: true
    },
    {
      id: "msg4",
      sender: {
        id: "user1",
        name: "Captain Sarah Johnson",
        status: "online"
      },
      content: "When will you complete the market analysis assignment?",
      timestamp: "10:32 AM",
      read: false
    }
  ]
};

interface DirectMessagesProps {
  selectedMessageId?: string | null;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ selectedMessageId }) => {
  const { toast } = useToast();
  const [conversations, setConversations] = React.useState(mockConversations);
  const [activeConversation, setActiveConversation] = React.useState(mockActiveConversation);
  const [newMessage, setNewMessage] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation.messages]);

  React.useEffect(() => {
    if (selectedMessageId) {
      // Find the conversation that contains the selected message
      const conversation = conversations.find(conv => 
        mockActiveConversation.messages.some(msg => msg.id === selectedMessageId)
      );
      
      if (conversation) {
        // Mark messages as read
        const updatedConversations = conversations.map(conv => 
          conv.id === conversation.id ? { ...conv, unread: 0 } : conv
        );
        setConversations(updatedConversations);

        // Focus on the conversation with the selected message
        setActiveConversation(mockActiveConversation);
      }
    }
  }, [selectedMessageId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, this would make an API call
    const newMsg: Message = {
      id: `msg${activeConversation.messages.length + 1}`,
      sender: {
        id: "current-user",
        name: "You",
        status: "online"
      },
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));

    // Update conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.contact.id 
          ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'Just now', unread: 0 } 
          : conv
      )
    );

    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    // In a real app, this would make an API call to fetch messages
    if (conversation.id === activeConversation.contact.id) return;

    // Mark messages as read
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    );
    setConversations(updatedConversations);

    // Set active conversation (mocked for demo)
    setActiveConversation({
      contact: conversation.contact,
      messages: [
        {
          id: "msg1",
          sender: {
            id: conversation.contact.id,
            name: conversation.contact.name,
            status: conversation.contact.status
          },
          content: "This is the beginning of your conversation with " + conversation.contact.name,
          timestamp: conversation.timestamp,
          read: true
        }
      ]
    });
  };

  const filteredConversations = conversations.filter(
    conv => conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[620px] border rounded-lg overflow-hidden">
      {/* Left sidebar - Conversations list */}
      <div className="w-1/3 border-r bg-military-sand/50">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[574px]">
          {filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-3 hover:bg-military-beige cursor-pointer transition-colors border-b ${
                activeConversation.contact.id === conversation.contact.id ? 'bg-military-beige' : ''
              }`}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-military-navy">
                    <User className="h-6 w-6 text-white" />
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    conversation.contact.status === 'online' ? 'bg-green-500' : 
                    conversation.contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{conversation.contact.name}</h4>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  {conversation.contact.role && (
                    <p className="text-xs text-muted-foreground">{conversation.contact.role}</p>
                  )}
                  <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <Badge className="bg-military-navy">{conversation.unread}</Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right side - Message content */}
      <div className="flex-1 flex flex-col">
        {/* Conversation header */}
        <div className="p-3 border-b flex items-center justify-between bg-military-sand/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-military-navy">
              <User className="h-6 w-6 text-white" />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{activeConversation.contact.name}</h3>
                <div className={`h-2 w-2 rounded-full ${
                  activeConversation.contact.status === 'online' ? 'bg-green-500' : 
                  activeConversation.contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                }`} />
              </div>
              {activeConversation.contact.role && (
                <p className="text-xs text-muted-foreground">{activeConversation.contact.role}</p>
              )}
            </div>
          </div>
          <div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({
                title: "Feature coming soon",
                description: "Additional conversation options will be available in the next update."
              })}
            >
              <FileText className="h-4 w-4 mr-1" />
              Files
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {activeConversation.messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender.id === 'current-user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender.id === 'current-user' ? 'bg-military-navy text-white' : 'bg-military-beige'} p-3 rounded-lg`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex justify-end mt-1 text-xs ${message.sender.id === 'current-user' ? 'text-military-sand/70' : 'text-muted-foreground'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-3 border-t bg-white">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder="Type your message..."
                  className="pr-20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-2 top-2 flex gap-1">
                  <button 
                    className="text-muted-foreground hover:text-military-navy"
                    onClick={() => toast({
                      title: "Feature coming soon",
                      description: "File attachments will be available in the next update."
                    })}
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-muted-foreground hover:text-military-navy"
                    onClick={() => toast({
                      title: "Feature coming soon",
                      description: "Image uploads will be available in the next update."
                    })}
                  >
                    <Image className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-muted-foreground hover:text-military-navy"
                    onClick={() => toast({
                      title: "Feature coming soon",
                      description: "Emoji selector will be available in the next update."
                    })}
                  >
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-military-navy hover:bg-military-navy/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
