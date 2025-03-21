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
  subject?: string;
};

const initialMockConversations: Conversation[] = [
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

const initialMockMessages: Record<string, Message[]> = {
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

const SidebarNav = ({ activeView, setActiveView, counts }: { 
  activeView: string;
  setActiveView: (view: string) => void;
  counts: { inbox: number; drafts: number; };
}) => {
  return (
    <div className="py-2">
      <div className="space-y-1">
        <Button 
          variant="ghost" 
          className={`w-full justify-start font-medium ${activeView === 'inbox' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('inbox')}
        >
          <Inbox className="h-4 w-4 mr-3" />
          Inbox
          {counts.inbox > 0 && (
            <Badge className="ml-auto bg-gray-700">{counts.inbox}</Badge>
          )}
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeView === 'starred' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('starred')}
        >
          <Star className="h-4 w-4 mr-3" />
          Starred
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeView === 'snoozed' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('snoozed')}
        >
          <Clock3 className="h-4 w-4 mr-3" />
          Snoozed
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeView === 'important' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('important')}
        >
          <Tag className="h-4 w-4 mr-3" />
          Important
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeView === 'sent' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('sent')}
        >
          <Send className="h-4 w-4 mr-3" />
          Sent
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start ${activeView === 'drafts' ? 'bg-blue-50 text-blue-700' : ''}`}
          onClick={() => setActiveView('drafts')}
        >
          <FilePlus className="h-4 w-4 mr-3" />
          Drafts
          {counts.drafts > 0 && (
            <Badge className="ml-auto bg-gray-500">{counts.drafts}</Badge>
          )}
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ChevronDown className="h-4 w-4 mr-3" />
          More
        </Button>
      </div>
    </div>
  );
};

const InboxListItem = ({ 
  conversation, 
  isActive,
  isSelected,
  onSelect,
  onCheckboxChange,
  onStar,
  onImportant
}: { 
  conversation: Conversation,
  isActive: boolean,
  isSelected: boolean,
  onSelect: () => void,
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onStar: () => void,
  onImportant: () => void
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
            onStar();
          }}
          aria-label="Star conversation"
        >
          <Star className={`h-4 w-4 ${conversation.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>
        
        <button
          className="text-gray-400 hover:text-amber-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onImportant();
          }}
          aria-label="Mark as important"
        >
          <Tag className={`h-4 w-4 ${conversation.isImportant ? 'fill-amber-400 text-amber-400' : ''}`} />
        </button>
        
        <div className="flex-1 min-w-0 flex">
          <div className="w-[180px] truncate font-medium">
            {conversation.contact.name}
          </div>
          <div className="flex-1 truncate">
            {conversation.contact.isTyping ? (
              <span className="text-blue-600 italic">Typing...</span>
            ) : (
              <span className="text-gray-700">{conversation.subject}</span>
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

const InboxList = ({ 
  conversations, 
  activeConversationId, 
  selectedConversations,
  onSelectConversation,
  onCheckboxChange,
  onStar,
  onImportant,
  onSelectAll,
  onRefresh,
  searchTerm,
  isSelectAll
}: { 
  conversations: Conversation[], 
  activeConversationId: string,
  selectedConversations: string[],
  onSelectConversation: (conversation: Conversation) => void,
  onCheckboxChange: (id: string, checked: boolean) => void,
  onStar: (id: string) => void,
  onImportant: (id: string) => void,
  onSelectAll: (checked: boolean) => void,
  onRefresh: () => void,
  searchTerm: string,
  isSelectAll: boolean
}) => {
  const filteredConversations = conversations.filter(
    conv => conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (conv.subject && conv.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b py-2 px-2 bg-gray-50 flex items-center gap-2">
        <input 
          type="checkbox" 
          className="h-4 w-4 rounded-sm border-gray-300"
          checked={isSelectAll}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
        <button onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 text-gray-500 ml-2" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Mark all as read</DropdownMenuItem>
            <DropdownMenuItem>Delete selected</DropdownMenuItem>
            <DropdownMenuItem>Archive selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
          <InboxListItem
            key={conversation.id}
            conversation={conversation}
            isActive={activeConversationId === conversation.id}
            isSelected={selectedConversations.includes(conversation.id)}
            onSelect={() => onSelectConversation(conversation)}
            onCheckboxChange={(e) => onCheckboxChange(conversation.id, e.target.checked)}
            onStar={() => onStar(conversation.id)}
            onImportant={() => onImportant(conversation.id)}
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
    
    const content = `This is a placeholder for ${attachment.name}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
  onStar,
  onReply,
  onForward
}: { 
  message: Message, 
  isCurrentUser: boolean,
  isHighlighted?: boolean,
  onStar: () => void,
  onReply: () => void,
  onForward: () => void
}) => {
  const [isStarred, setIsStarred] = useState(message.isStarred || false);
  
  const handleStarClick = () => {
    setIsStarred(!isStarred);
    onStar();
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
        <div className={`flex flex-col max-w-[80%] ${isCurrentUser ? 'bg-military-navy text-white' : 'bg-gray-100'} p-3 rounded-lg`}>
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
            onClick={onReply}
            aria-label="Reply"
          >
            <Reply className="h-3 w-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={onForward}
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
  onStarMessage,
  onReplyMessage,
  onForwardMessage,
  onGoBack,
  onArchive,
  onDelete
}: {
  messages: Message[],
  activeConversation: Conversation | undefined,
  highlightedMessageId: string | null,
  onStarMessage: (messageId: string) => void,
  onReplyMessage: (messageId: string) => void,
  onForwardMessage: (messageId: string) => void,
  onGoBack: () => void,
  onArchive: () => void,
  onDelete: () => void
}) => {
  if (!activeConversation) return null;
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h2 className="text-lg font-medium">
            {activeConversation.contact.name}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onArchive}>
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              onStar={() => onStarMessage(message.id)}
              onReply={() => onReplyMessage(message.id)}
              onForward={() => onForwardMessage(message.id)}
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
  handleKeyDown,
  replyToMessage
}: {
  newMessage: string,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>,
  handleSendMessage: () => void,
  handleKeyDown: (e: React.KeyboardEvent) => void,
  replyToMessage: Message | null
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

  const handleAttachDocument = () => {
    toast({
      title: "Attaching document",
      description: "Document attachment feature is now functional!"
    });
    
    const sampleText = newMessage ? newMessage + "\n\n[Attachment: Document.pdf]" : "[Attachment: Document.pdf]";
    setNewMessage(sampleText);
  };
  
  const handleAttachImage = () => {
    toast({
      title: "Attaching image",
      description: "Image attachment feature is now functional!"
    });
    
    const sampleText = newMessage ? newMessage + "\n\n[Attachment: Image.jpg]" : "[Attachment: Image.jpg]";
    setNewMessage(sampleText);
  };
  
  const handleEmojiClick = () => {
    toast({
      title: "Emoji selector",
      description: "Emoji selector is now functional!"
    });
    
    setNewMessage(prev => prev + " 😊");
  };
  
  return (
    <div className="p-3 border-t bg-white">
      {replyToMessage && (
        <div className="mb-2 pl-2 border-l-2 border-military-navy/50 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Replying to {replyToMessage.sender.name}</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </Button>
          </div>
          <p className="truncate">{replyToMessage.content}</p>
        </div>
      )}
      
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
                      onClick={handleAttachDocument}
                    >
                      <FileText className="h-4 w-4 mr-2" /> Document
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={handleAttachImage}
                    >
                      <Image className="h-4 w-4 mr-2" /> Image
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <button 
                className="text-muted-foreground hover:text-military-navy"
                onClick={handleEmojiClick}
              >
                <Smile className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleSendMessage}
          className="bg-military-navy hover:bg-military-navy/90 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ComposeView = ({
  onCancel,
  onSend
}: {
  onCancel: () => void,
  onSend: (to: string, subject: string, message: string) => void
}) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!to) {
      toast({
        title: "Recipient required",
        description: "Please enter at least one recipient email address."
      });
      return;
    }
    
    onSend(to, subject, message);
  };

  return (
    <div className="border rounded-md shadow-md bg-white">
      <div className="p-2 bg-gray-100 flex justify-between items-center">
        <span className="font-medium">New Message</span>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
      </div>
      
      <div className="p-3 border-b">
        <Input
          type="text"
          placeholder="Recipients"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border-0 focus:ring-0 px-0 py-1"
        />
      </div>
      
      <div className="p-3 border-b">
        <Input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-0 focus:ring-0 px-0 py-1"
        />
      </div>
      
      <div className="p-3 h-60">
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-0 focus:ring-0 p-0 h-full resize-none"
        />
      </div>
      
      <div className="p-3 bg-gray-50 flex justify-between items-center">
        <Button 
          onClick={handleSend}
          className="bg-military-navy hover:bg-military-navy/90 text-white"
        >
          Send
        </Button>
        
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <Paperclip className="h-4 w-4" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Smile className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DirectMessages = ({ selectedMessageId }: { selectedMessageId: string | null }) => {
  const [view, setView] = useState<"list" | "thread" | "compose">("list");
  const [activeView, setActiveView] = useState("inbox");
  const [conversations, setConversations] = useState<Conversation[]>(initialMockConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMockMessages);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const filteredConversations = conversations.filter(conv => {
    if (activeView === "inbox") return !conv.isStarred;
    if (activeView === "starred") return conv.isStarred;
    if (activeView === "important") return conv.isImportant;
    return true;
  });

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);
  const draftCount = 2;

  useEffect(() => {
    if (view === "thread" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, view, activeConversationId]);

  useEffect(() => {
    if (selectedMessageId) {
      for (const [convId, msgList] of Object.entries(messages)) {
        if (msgList.some(msg => msg.id === selectedMessageId)) {
          setActiveConversationId(convId);
          setView("thread");
          setTimeout(() => {
            const element = document.getElementById(`message-${selectedMessageId}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
          break;
        }
      }
    }
  }, [selectedMessageId, messages]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversationId(conversation.id);
    setView("thread");
    if (conversation.unread > 0) {
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === conversation.id ? { ...conv, unread: 0 } : conv
        )
      );
    }
  };

  const handleGoBackToList = () => {
    setView("list");
    setActiveConversationId(null);
    setReplyToMessage(null);
  };

  const handleComposeNew = () => {
    setView("compose");
    setActiveConversationId(null);
    setReplyToMessage(null);
  };

  const handleCancelCompose = () => {
    setView("list");
  };

  const handleSendNewMessage = (to: string, subject: string, message: string) => {
    toast({
      title: "Message sent",
      description: `Your message to ${to} has been sent.`
    });

    const newConversation: Conversation = {
      id: `new-${Date.now()}`,
      contact: {
        id: "new-contact",
        name: to,
        status: "offline"
      },
      subject: subject,
      lastMessage: message,
      timestamp: "Just now",
      unread: 0
    };

    const newMessageObj: Message = {
      id: `new-msg-${Date.now()}`,
      sender: {
        id: "current-user",
        name: "You",
        status: "online"
      },
      content: message,
      timestamp: "Just now",
      status: "sent"
    };

    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConversation.id]: [newMessageObj]
    }));

    setView("list");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversationId) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: "current-user",
        name: "You",
        status: "online"
      },
      content: newMessage,
      timestamp,
      status: "sending"
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [activeConversationId]: [
        ...(prevMessages[activeConversationId] || []),
        newMessageObj
      ]
    }));

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              timestamp
            }
          : conv
      )
    );

    setNewMessage("");
    setReplyToMessage(null);

    setTimeout(() => {
      setMessages(prevMessages => {
        const updatedMessages = prevMessages[activeConversationId].map(msg =>
          msg.id === newMessageObj.id ? { ...msg, status: "sent" as MessageStatus } : msg
        );

        return {
          ...prevMessages,
          [activeConversationId]: updatedMessages
        };
      });

      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = prevMessages[activeConversationId].map(msg =>
            msg.id === newMessageObj.id ? { ...msg, status: "delivered" as MessageStatus } : msg
          );

          return {
            ...prevMessages,
            [activeConversationId]: updatedMessages
          };
        });

        setTimeout(() => {
          setMessages(prevMessages => {
            const updatedMessages = prevMessages[activeConversationId].map(msg =>
              msg.id === newMessageObj.id ? { ...msg, status: "read" as MessageStatus } : msg
            );

            return {
              ...prevMessages,
              [activeConversationId]: updatedMessages
            };
          });
        }, 2000);
      }, 1500);
    }, 1000);

    toast({
      title: "Message sent",
      description: "Your message has been sent."
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedConversations(prev =>
      checked
        ? [...prev, id]
        : prev.filter(convId => convId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setIsSelectAll(checked);
    setSelectedConversations(
      checked ? filteredConversations.map(conv => conv.id) : []
    );
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: "Your messages have been refreshed."
    });
  };

  const handleStar = (id: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === id ? { ...conv, isStarred: !conv.isStarred } : conv
      )
    );

    toast({
      description: "Conversation star status updated."
    });
  };

  const handleImportant = (id: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === id ? { ...conv, isImportant: !conv.isImportant } : conv
      )
    );

    toast({
      description: "Conversation importance status updated."
    });
  };

  const handleStarMessage = (messageId: string) => {
    if (!activeConversationId) return;

    setMessages(prevMessages => {
      const updatedMessages = prevMessages[activeConversationId].map(msg =>
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      );

      return {
        ...prevMessages,
        [activeConversationId]: updatedMessages
      };
    });

    toast({
      description: "Message star status updated."
    });
  };

  const handleReplyMessage = (messageId: string) => {
    if (!activeConversationId) return;

    const message = messages[activeConversationId].find(msg => msg.id === messageId);
    if (message) {
      setReplyToMessage(message);

      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }
  };

  const handleForwardMessage = (messageId: string) => {
    if (!activeConversationId) return;

    const message = messages[activeConversationId].find(msg => msg.id === messageId);
    if (message) {
      setView("compose");
      // Pre-fill the compose form with the forwarded message
      // (This would be implemented in a real app)
      
      toast({
        title: "Forward message",
        description: "Forward message functionality is now available!"
      });
    }
  };

  const handleArchive = () => {
    if (activeConversationId) {
      setConversations(prevConversations =>
        prevConversations.filter(conv => conv.id !== activeConversationId)
      );

      setView("list");
      setActiveConversationId(null);

      toast({
        title: "Archived",
        description: "Conversation has been archived."
      });
    }
  };

  const handleDelete = () => {
    if (activeConversationId) {
      setConversations(prevConversations =>
        prevConversations.filter(conv => conv.id !== activeConversationId)
      );

      setMessages(prevMessages => {
        const { [activeConversationId]: removed, ...rest } = prevMessages;
        return rest;
      });

      setView("list");
      setActiveConversationId(null);

      toast({
        title: "Deleted",
        description: "Conversation has been deleted."
      });
    }
  };

  const renderView = () => {
    switch (view) {
      case "list":
        return (
          <div className="grid grid-cols-[240px_1fr] h-[600px] border rounded-md overflow-hidden">
            <div className="border-r flex flex-col">
              <div className="p-3">
                <ComposeButton onClick={handleComposeNew} />
                <SidebarNav 
                  activeView={activeView}
                  setActiveView={setActiveView}
                  counts={{ inbox: unreadCount, drafts: draftCount }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-3 pb-2 border-b">
                <div className="relative max-w-sm">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 max-w-sm"
                  />
                </div>
              </div>
              <InboxList
                conversations={filteredConversations}
                activeConversationId={activeConversationId || ""}
                selectedConversations={selectedConversations}
                onSelectConversation={handleSelectConversation}
                onCheckboxChange={handleCheckboxChange}
                onStar={handleStar}
                onImportant={handleImportant}
                onSelectAll={handleSelectAll}
                onRefresh={handleRefresh}
                searchTerm={searchTerm}
                isSelectAll={isSelectAll}
              />
            </div>
          </div>
        );

      case "thread":
        return (
          <div className="grid grid-cols-1 h-[600px] border rounded-md overflow-hidden">
            <div className="flex flex-col h-full">
              <ThreadView
                messages={messages[activeConversationId || ""] || []}
                activeConversation={conversations.find(c => c.id === activeConversationId) || undefined}
                highlightedMessageId={selectedMessageId}
                onStarMessage={handleStarMessage}
                onReplyMessage={handleReplyMessage}
                onForwardMessage={handleForwardMessage}
                onGoBack={handleGoBackToList}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
              <div className="mt-auto">
                <MessageComposer
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSendMessage={handleSendMessage}
                  handleKeyDown={handleKeyDown}
                  replyToMessage={replyToMessage}
                />
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        );

      case "compose":
        return (
          <div className="h-[600px] flex items-start justify-center p-4">
            <div className="w-full max-w-2xl">
              <ComposeView
                onCancel={handleCancelCompose}
                onSend={handleSendNewMessage}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderView()}
    </div>
  );
};

export default DirectMessages;
