import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  CheckCheck,
  Star,
  Trash,
  Archive,
  Tag,
  MoreHorizontal,
  RefreshCw,
  Clock,
  Reply,
  Forward,
  Download,
  Inbox,
  ChevronDown,
  Mail,
  Edit3,
  FilePlus,
  Plus,
  Pencil,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Trash2,
  Clock3
} from "lucide-react";

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
  isStarred?: boolean;
  isImportant?: boolean;
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
  isStarred?: boolean;
  isImportant?: boolean;
  labels?: string[];
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
    unread: 2,
    isImportant: true
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
    unread: 0,
    isStarred: true
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

const ComposeButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button 
      onClick={onClick} 
      className="flex items-center gap-2 mb-4 w-full max-w-[200px] bg-white hover:bg-gray-100 text-gray-800 shadow-sm border"
    >
      <Pencil className="h-4 w-4" />
      <span>Compose</span>
    </Button>
  );
};

const SidebarNav = () => {
  return (
    <div className="py-2">
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start font-medium bg-blue-50 text-blue-700">
          <Inbox className="h-4 w-4 mr-3" />
          Inbox
          <Badge className="ml-auto bg-gray-700">3</Badge>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Star className="h-4 w-4 mr-3" />
          Starred
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Clock3 className="h-4 w-4 mr-3" />
          Snoozed
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Tag className="h-4 w-4 mr-3" />
          Important
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Send className="h-4 w-4 mr-3" />
          Sent
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FilePlus className="h-4 w-4 mr-3" />
          Drafts
          <Badge className="ml-auto bg-gray-500">5</Badge>
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ChevronDown className="h-4 w-4 mr-3" />
          More
        </Button>
      </div>
    </div>
  );
};

const ConversationListItem = ({ 
  conversation, 
  isActive,
  isSelected,
  onSelect,
  onCheckboxChange
}: { 
  conversation: Conversation,
  isActive: boolean,
  isSelected: boolean,
  onSelect: () => void,
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div 
      className={`flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer border-b ${
        isActive ? 'bg-gray-100' : ''
      } ${conversation.unread > 0 ? 'font-semibold' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 w-full">
        <input 
          type="checkbox" 
          className="h-4 w-4 rounded-sm border-gray-300"
          onClick={(e) => e.stopPropagation()}
          onChange={onCheckboxChange}
          checked={isSelected}
        />
        
        <button
          className="text-gray-400 hover:text-amber-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle star functionality
          }}
          aria-label="Star conversation"
        >
          <Star className={`h-4 w-4 ${conversation.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>
        
        <button
          className="text-gray-400 hover:text-amber-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle importance functionality
          }}
          aria-label="Mark as important"
        >
          <Tag className={`h-4 w-4 ${conversation.isImportant ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>
        
        <div className="flex-1 min-w-0 flex">
          <div className="w-1/4 truncate font-medium">
            {conversation.contact.name}
          </div>
          <div className="flex-1 truncate">
            {conversation.contact.isTyping ? (
              <span className="text-blue-600 italic">Typing...</span>
            ) : (
              <span className="text-gray-700">{conversation.lastMessage}</span>
            )}
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.timestamp}</span>
        </div>
        
        {conversation.unread > 0 && (
          <Badge className="bg-blue-600 ml-2 rounded-full text-xs h-5 w-5 flex items-center justify-center p-0">{conversation.unread}</Badge>
        )}
      </div>
    </div>
  );
};

const ConversationList = ({ 
  conversations, 
  activeConversationId, 
  selectedConversations,
  onSelectConversation,
  onCheckboxChange,
  searchTerm 
}: { 
  conversations: Conversation[], 
  activeConversationId: string,
  selectedConversations: string[],
  onSelectConversation: (conversation: Conversation) => void,
  onCheckboxChange: (id: string, checked: boolean) => void,
  searchTerm: string
}) => {
  const filteredConversations = conversations.filter(
    conv => conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b py-2 px-2 bg-gray-50 flex items-center gap-2">
        <input 
          type="checkbox" 
          className="h-4 w-4 rounded-sm border-gray-300"
        />
        <RefreshCw className="h-4 w-4 text-gray-500 ml-2" />
        <MoreVertical className="h-4 w-4 text-gray-500" />
        
        <div className="flex ml-auto gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredConversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeConversationId === conversation.id}
            isSelected={selectedConversations.includes(conversation.id)}
            onSelect={() => onSelectConversation(conversation)}
            onCheckboxChange={(e) => onCheckboxChange(conversation.id, e.target.checked)}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

const MessageAttachment = ({ 
  attachment,
  isCurrentUser
}: {
  attachment: { id: string, name: string, type: string, url: string },
  isCurrentUser: boolean
}) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Downloading ${attachment.name}`
    });
  };
  
  return (
    <div 
      className={`flex items-center gap-2 p-2 rounded ${
        isCurrentUser ? 'bg-military-navy/80' : 'bg-gray-100'
      }`}
    >
      {attachment.type === 'pdf' && <FileText className="h-4 w-4" />}
      {attachment.type === 'image' && <Image className="h-4 w-4" />}
      {attachment.type === 'document' && <FileText className="h-4 w-4" />}
      <span className="text-xs truncate flex-1">{attachment.name}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={handleDownload}
      >
        <Download className="h-3 w-3" />
      </Button>
    </div>
  );
};

const MessageBubble = ({ 
  message, 
  isCurrentUser,
  isHighlighted,
  onStar
}: { 
  message: Message, 
  isCurrentUser: boolean,
  isHighlighted?: boolean,
  onStar?: (messageId: string) => void
}) => {
  const [isStarred, setIsStarred] = useState(message.isStarred || false);
  const { toast } = useToast();
  
  const handleStarClick = () => {
    setIsStarred(!isStarred);
    if (onStar) {
      onStar(message.id);
    }
  };
  
  const handleReply = () => {
    toast({
      title: "Reply to message",
      description: "This feature will be available soon."
    });
  };
  
  const handleForward = () => {
    toast({
      title: "Forward message",
      description: "This feature will be available soon."
    });
  };
  
  return (
    <div 
      id={`message-${message.id}`}
      className={`group flex ${isCurrentUser ? 'justify-end' : 'justify-start'} transition-colors duration-300 mb-4 ${isHighlighted ? 'bg-military-sand/30 p-2 rounded-md' : ''}`}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1 bg-military-navy flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </Avatar>
      )}
      
      <div className="flex flex-col">
        <div className={`flex max-w-[80%] ${isCurrentUser ? 'bg-military-navy text-white' : 'bg-gray-100'} p-3 rounded-lg`}>
          {!isCurrentUser && (
            <div className="font-medium text-xs mb-1">{message.sender.name}</div>
          )}
          
          {message.content && <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content }} />}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map(attachment => (
                <MessageAttachment 
                  key={attachment.id}
                  attachment={attachment}
                  isCurrentUser={isCurrentUser}
                />
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
        
        <div className="flex items-center mt-1 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={handleReply}
            aria-label="Reply"
          >
            <Reply className="h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={handleForward}
            aria-label="Forward"
          >
            <Forward className="h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={handleStarClick}
            aria-label="Star message"
          >
            <Star className={`h-3 w-3 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
          </Button>
          
          <span className="text-xs text-gray-400">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const ThreadView = ({
  messages,
  activeConversation,
  highlightedMessageId,
  onStarMessage
}: {
  messages: Message[],
  activeConversation: Conversation | undefined,
  highlightedMessageId: string | null,
  onStarMessage: (messageId: string) => void
}) => {
  if (!activeConversation) return null;
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h2 className="text-lg font-medium">
            {activeConversation.contact.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id}
              message={message}
              isCurrentUser={message.sender.id === 'current-user'}
              isHighlighted={message.id === highlightedMessageId}
              onStar={onStarMessage}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

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
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  useEffect(() => {
    if (!selectedMessageId) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedMessageId]);

  useEffect(() => {
    if (activeConversationId && mockMessages[activeConversationId]) {
      setMessages(mockMessages[activeConversationId]);
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  useEffect(() => {
    if (selectedMessageId) {
      console.log("Looking for message with ID:", selectedMessageId);
      
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
        setActiveConversationId(foundConversationId);
        setHighlightedMessageId(selectedMessageId);
        
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === foundConversationId ? { ...conv, unread: 0 } : conv
          )
        );
        
        setTimeout(() => {
          const messageElement = document.getElementById(`message-${selectedMessageId}`);
          if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Clear the highlight after a delay
            setTimeout(() => {
              setHighlightedMessageId(null);
            }, 2000);
          }
        }, 500);
      }
    }
  }, [selectedMessageId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

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

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    
    mockMessages[activeConversationId] = updatedMessages;

    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'Just now', unread: 0 } 
          : conv
      )
    );

    setNewMessage("");
    
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

    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    );
    setConversations(updatedConversations);

    setActiveConversationId(conversation.id);
    setShowCompose(false);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedConversations(prev => [...prev, id]);
    } else {
      setSelectedConversations(prev => prev.filter(convId => convId !== id));
    }
  };

  const handleStarMessage = (messageId: string) => {
    setMessages(current => 
      current.map(msg => 
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  const handleComposeClick = () => {
    setShowCompose(true);
    toast({
      title: "Compose new message",
      description: "This feature will be fully implemented in a future update."
    });
  };

  return (
    <div className="flex h-[620px] border rounded-lg overflow-hidden bg-white">
      {/* Left sidebar - Navigation + conversations list */}
      <div className="w-[250px] border-r flex flex-col bg-white">
        <div className="p-3">
          <ComposeButton onClick={handleComposeClick} />
        </div>
        
        <SidebarNav />
        
        <Separator className="my-2" />
        
        <div className="relative flex-1">
          <div className="absolute inset-0 flex flex-col">
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mail"
                  className="pl-8 h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ConversationList 
                conversations={conversations}
                activeConversationId={activeConversationId}
                selectedConversations={selectedConversations}
                onSelectConversation={handleSelectConversation}
                onCheckboxChange={handleCheckboxChange}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Mail view */}
      <div className="flex-1 flex flex-col bg-white">
        {showCompose ? (
          <div className="flex flex-col h-full">
            <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
              <h3 className="font-medium">New Message</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={() => setShowCompose(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </Button>
            </div>
            
            <div className="p-4 flex-1">
              <div className="mb-4">
                <Input placeholder="To" className="mb-2" />
                <Input placeholder="Subject" />
              </div>
              
              <Textarea 
                placeholder="Compose email" 
                className="min-h-[300px]" 
              />
            </div>
            
            <div className="border-t p-3 flex justify-between">
              <Button>Send</Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ThreadView
              messages={messages}
              activeConversation={activeConversation}
              highlightedMessageId={highlightedMessageId}
              onStarMessage={handleStarMessage}
            />
            
            <MessageComposer
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DirectMessages;

