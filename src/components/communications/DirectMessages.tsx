import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  FileText, 
  Paperclip, 
  Image, 
  Smile, 
  Bold,
  Italic,
  Underline,
  Code,
  List,
  ListOrdered,
  CheckCheck
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type MessageStatus = "sending" | "sent" | "delivered" | "read";

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
  status: MessageStatus;
  attachments?: {
    id: string;
    name: string;
    type: "pdf" | "image" | "document";
    url: string;
  }[];
};

type Conversation = {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar?: string;
    status: "online" | "offline" | "away";
    role?: string;
    isTyping?: boolean;
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
      role: "Training Coordinator",
      isTyping: false
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
      role: "Business Mentor",
      isTyping: true
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
      role: "Finance Advisor",
      isTyping: false
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
      role: "Program Director",
      isTyping: false
    },
    lastMessage: "Congratulations on completing Phase 1!",
    timestamp: "3/20/25",
    unread: 0
  }
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "msg1",
      sender: {
        id: "user1",
        name: "Captain Sarah Johnson",
        status: "online"
      },
      content: "Good morning! How is your progress on the market analysis assignment? The deadline is approaching this Friday.",
      timestamp: "10:15 AM",
      status: "read"
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
      status: "read"
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
      status: "read"
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
      sender: {
        id: "user2",
        name: "Sgt. Michael Brooks",
        status: "online"
      },
      content: "I've reviewed your business plan draft. It has potential but needs work on the financial projections.",
      timestamp: "Yesterday",
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
      sender: {
        id: "user3",
        name: "Lt. Jessica Martinez",
        status: "away"
      },
      content: "Let's schedule a funding strategy call. I have some resources that might help with your venture.",
      timestamp: "Monday",
      status: "read"
    }
  ],
  "4": [
    {
      id: "msg7",
      sender: {
        id: "user4",
        name: "Lt. Col. David Clark",
        status: "offline"
      },
      content: "Congratulations on completing Phase 1! You're making excellent progress in the program.",
      timestamp: "3/20/25",
      status: "read"
    }
  ]
};

// Component for conversation list
const ConversationList = ({ 
  conversations, 
  activeConversationId, 
  onSelectConversation,
  searchTerm 
}: { 
  conversations: Conversation[], 
  activeConversationId: string,
  onSelectConversation: (conversation: Conversation) => void,
  searchTerm: string
}) => {
  const filteredConversations = conversations.filter(
    conv => conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollArea className="h-[574px]">
      {filteredConversations.map((conversation) => (
        <div 
          key={conversation.id}
          className={`p-3 hover:bg-military-beige cursor-pointer transition-colors border-b ${
            activeConversationId === conversation.id ? 'bg-military-beige' : ''
          }`}
          onClick={() => onSelectConversation(conversation)}
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
              <div className="flex items-center gap-1 mt-1">
                {conversation.contact.isTyping ? (
                  <span className="text-xs italic text-military-navy">Typing...</span>
                ) : (
                  <p className="text-sm truncate">{conversation.lastMessage}</p>
                )}
              </div>
            </div>
            {conversation.unread > 0 && (
              <Badge className="bg-military-navy">{conversation.unread}</Badge>
            )}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

// Component for conversation header
const ConversationHeader = ({ 
  activeConversation,
  onFilesClick 
}: { 
  activeConversation: Conversation | undefined,
  onFilesClick: () => void
}) => {
  if (!activeConversation) return <div>Select a conversation</div>;
  
  return (
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
          onClick={onFilesClick}
        >
          <FileText className="h-4 w-4 mr-1" />
          Files
        </Button>
      </div>
    </div>
  );
};

// Component for message bubble
const MessageBubble = ({ 
  message, 
  isCurrentUser,
  ref 
}: { 
  message: Message, 
  isCurrentUser: boolean,
  ref?: React.RefObject<HTMLDivElement> | null
}) => {
  return (
    <div 
      id={`message-${message.id}`}
      ref={ref || null}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} transition-colors duration-300 mb-4`}
    >
      <div className={`max-w-[80%] ${isCurrentUser ? 'bg-military-navy text-white' : 'bg-military-beige'} p-3 rounded-lg`}>
        {message.content && <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content }} />}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map(attachment => (
              <div 
                key={attachment.id}
                className={`flex items-center gap-2 p-2 rounded ${isCurrentUser ? 'bg-military-navy/80' : 'bg-military-beige/80'}`}
              >
                {attachment.type === 'pdf' && <FileText className="h-4 w-4" />}
                {attachment.type === 'image' && <Image className="h-4 w-4" />}
                {attachment.type === 'document' && <FileText className="h-4 w-4" />}
                <span className="text-xs truncate">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className={`flex justify-end items-center gap-1 mt-1 text-xs ${isCurrentUser ? 'text-military-sand/70' : 'text-muted-foreground'}`}>
          {message.timestamp}
          {isCurrentUser && (
            <span className="ml-1">
              {message.status === "read" && <CheckCheck className="h-3 w-3 text-green-400" />}
              {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {message.status === "sent" && <CheckCheck className="h-3 w-3 opacity-70" />}
              {message.status === "sending" && <span className="text-[10px] opacity-70">•••</span>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for message composer
const MessageComposer = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown
}: {
  newMessage: string,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>,
  handleSendMessage: () => void,
  handleKeyDown: (e: React.KeyboardEvent) => void
}) => {
  const { toast } = useToast();
  const [isFormatting, setIsFormatting] = useState(false);
  
  const applyFormatting = (tag: string) => {
    switch(tag) {
      case 'b':
        setNewMessage(prev => `<b>${prev}</b>`);
        break;
      case 'i':
        setNewMessage(prev => `<i>${prev}</i>`);
        break;
      case 'u':
        setNewMessage(prev => `<u>${prev}</u>`);
        break;
      case 'code':
        setNewMessage(prev => `<code>${prev}</code>`);
        break;
      case 'ul':
        setNewMessage(prev => `<ul><li>${prev}</li></ul>`);
        break;
      case 'ol':
        setNewMessage(prev => `<ol><li>${prev}</li></ol>`);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="p-3 border-t bg-white">
      {isFormatting && (
        <div className="flex gap-1 mb-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('b')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('i')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('u')}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('code')}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('ul')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2 py-1" 
            onClick={() => applyFormatting('ol')}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[120px] pr-20 py-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute right-2 top-2 flex gap-1">
              <button 
                className="text-muted-foreground hover:text-military-navy"
                onClick={() => setIsFormatting(!isFormatting)}
              >
                <Bold className="h-4 w-4" />
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-military-navy">
                    <Paperclip className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => toast({
                        title: "Feature coming soon",
                        description: "Document upload will be available in the next update."
                      })}
                    >
                      <FileText className="h-4 w-4 mr-2" /> Document
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => toast({
                        title: "Feature coming soon",
                        description: "Image upload will be available in the next update."
                      })}
                    >
                      <Image className="h-4 w-4 mr-2" /> Image
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
  );
};

// Main Direct Messages component
interface DirectMessagesProps {
  selectedMessageId?: string | null;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ selectedMessageId }) => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages["1"]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageElementRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (!selectedMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedMessageId]);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversationId && mockMessages[activeConversationId]) {
      setMessages(mockMessages[activeConversationId]);
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  // Handle selected message from search
  useEffect(() => {
    if (selectedMessageId) {
      console.log("Looking for message with ID:", selectedMessageId);
      
      // Find which conversation contains this message
      let foundConversationId = null;
      
      for (const [convId, msgList] of Object.entries(mockMessages)) {
        const foundMessage = msgList.find(msg => msg.id === selectedMessageId);
        
        if (foundMessage) {
          console.log("Found message in conversation:", convId);
          foundConversationId = convId;
          break;
        }
      }
      
      if (foundConversationId) {
        // Set the active conversation
        setActiveConversationId(foundConversationId);
        
        // Mark conversation as read
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === foundConversationId ? { ...conv, unread: 0 } : conv
          )
        );
        
        // Scroll to the message after a short delay to allow rendering
        setTimeout(() => {
          const messageElement = document.getElementById(`message-${selectedMessageId}`);
          if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
            messageElement.classList.add("bg-military-sand/30");
            setTimeout(() => {
              messageElement.classList.remove("bg-military-sand/30");
            }, 2000);
          }
        }, 500); // Increased delay to ensure rendering
      }
    }
  }, [selectedMessageId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Create a new message with 'sending' status first
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      sender: {
        id: "current-user",
        name: "You",
        status: "online"
      },
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    };

    // Update the messages for the active conversation
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    
    // Update the mock messages data
    mockMessages[activeConversationId] = updatedMessages;

    // Update the conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'Just now', unread: 0 } 
          : conv
      )
    );

    setNewMessage("");
    
    // Simulate status changes for the message
    setTimeout(() => {
      setMessages(current => 
        current.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: "sent" } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(current => 
          current.map(msg => 
            msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
          )
        );
        
        // If the other user is "online", simulate read receipt after a few seconds
        if (activeConversation?.contact.status === "online") {
          setTimeout(() => {
            setMessages(current => 
              current.map(msg => 
                msg.id === newMsg.id ? { ...msg, status: "read" } : msg
              )
            );
          }, 3000);
        }
      }, 1000);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    if (conversation.id === activeConversationId) return;

    // Mark conversation as read
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    );
    setConversations(updatedConversations);

    // Set active conversation
    setActiveConversationId(conversation.id);
  };

  const handleFilesClick = () => {
    toast({
      title: "Files and attachments",
      description: "View and manage files shared in this conversation."
    });
  };

  // Simulate typing indicators
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setConversations(prev => 
        prev.map(conv => {
          if (conv.id === "2") { // Only for conversation 2 (Sgt. Michael Brooks)
            return { 
              ...conv, 
              contact: { 
                ...conv.contact, 
                isTyping: !conv.contact.isTyping 
              } 
            };
          }
          return conv;
        })
      );
    }, 5000);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex h-[620px] border rounded-lg overflow-hidden">
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
        <ConversationList 
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          searchTerm={searchTerm}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <ConversationHeader 
          activeConversation={activeConversation}
          onFilesClick={handleFilesClick}
        />

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id}
                message={message}
                isCurrentUser={message.sender.id === 'current-user'}
                ref={messageElementRefs.current[message.id]}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <MessageComposer
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default DirectMessages;
