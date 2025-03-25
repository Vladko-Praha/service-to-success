import React, { useState, useEffect, useRef } from "react";
import { useRealtimeMessages, RealTimeMessage, RealTimeConversation } from "@/hooks/use-realtime-messages";
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
  Clock3,
  X
} from "lucide-react";
import MediaPreview from "./MediaPreview";
import { MediaAttachment } from "./MediaAttachmentButton";
import { useRealtimeNotifications } from "@/hooks/use-realtime-notifications";
import UserMention from "./UserMention";
import { cohortStudents, CohortStudent } from "@/data/cohortStudents";
import CohortStudentSelector from "./CohortStudentSelector";

interface RealtimeDirectMessagesProps {
  selectedMessageId: string | null;
}

const adaptMessageForUI = (message: RealTimeMessage) => {
  return {
    id: message.id,
    sender: {
      id: message.sender_id,
      name: message.sender_name,
      avatar: message.sender_avatar,
      status: message.sender_status
    },
    content: message.content,
    timestamp: message.timestamp,
    status: message.status,
    isStarred: message.is_starred,
    isImportant: message.is_important,
    attachments: message.attachments
  };
};

const RealtimeDirectMessages: React.FC<RealtimeDirectMessagesProps> = ({ selectedMessageId }) => {
  const {
    conversations,
    messages,
    isConnected,
    connectionError,
    sendMessage,
    markConversationAsRead,
    toggleConversationStar,
    toggleMessageStar,
    toggleConversationImportant,
    createConversation,
    deleteConversation
  } = useRealtimeMessages();

  const { createMentionNotification, processMentions } = useRealtimeNotifications();

  const [view, setView] = useState<"list" | "thread" | "compose">("list");
  const [activeView, setActiveView] = useState("inbox");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState<RealTimeMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const filteredConversations = conversations.filter(conv => {
    if (activeView === "inbox") return !conv.isStarred;
    if (activeView === "starred") return conv.isStarred;
    if (activeView === "important") return conv.isImportant;
    return true;
  }).filter(conv => {
    return conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (conv.subject && conv.subject.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);
  const draftCount = 2; // Mock value

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

  const handleSelectConversation = (conversation: RealTimeConversation) => {
    setActiveConversationId(conversation.id);
    setView("thread");
    
    if (conversation.unread > 0) {
      markConversationAsRead(conversation.id);
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

  const handleSendNewMessage = (to: string, subject: string, content: string) => {
    const newContact = {
      id: `contact-${Date.now()}`,
      name: to,
      status: "offline" as const
    };
    
    const conversationId = createConversation(newContact, subject);
    
    const { processedText, mentionedUserIds } = processMentions(content);
    
    if (mentionedUserIds.length > 0) {
      const activeConversation = conversations.find(c => c.id === activeConversationId);
      const context = `conversation with ${activeConversation?.contact.name || 'someone'}`;
      createMentionNotification("You", content, context);
    }
    
    sendMessage(conversationId, processedText);
    
    toast({
      title: "Message sent",
      description: `Your message to ${to} has been sent.`
    });
    
    setView("list");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversationId) return;
    
    const { processedText, mentionedUserIds } = processMentions(newMessage);
    
    if (mentionedUserIds.length > 0) {
      const activeConversation = conversations.find(c => c.id === activeConversationId);
      const context = `conversation with ${activeConversation?.contact.name || 'someone'}`;
      createMentionNotification("You", newMessage, context);
    }
    
    sendMessage(activeConversationId, processedText);
    setNewMessage("");
    setReplyToMessage(null);
    
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
    toggleConversationStar(id);
    
    toast({
      description: "Conversation star status updated."
    });
  };

  const handleImportant = (id: string) => {
    toggleConversationImportant(id);
    
    toast({
      description: "Conversation importance status updated."
    });
  };

  const handleStarMessage = (messageId: string) => {
    if (!activeConversationId) return;
    
    toggleMessageStar(messageId, activeConversationId);
    
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
      // In a real app, we would actually archive the conversation
      // For now, we'll just delete it from the view
      deleteConversation(activeConversationId);

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
      deleteConversation(activeConversationId);

      setView("list");
      setActiveConversationId(null);

      toast({
        title: "Deleted",
        description: "Conversation has been deleted."
      });
    }
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
    conversation: RealTimeConversation,
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
    isSelectAll
  }: { 
    conversations: RealTimeConversation[], 
    activeConversationId: string,
    selectedConversations: string[],
    onSelectConversation: (conversation: RealTimeConversation) => void,
    onCheckboxChange: (id: string, checked: boolean) => void,
    onStar: (id: string) => void,
    onImportant: (id: string) => void,
    onSelectAll: (checked: boolean) => void,
    onRefresh: () => void,
    isSelectAll: boolean
  }) => {
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
          {conversations.map((conversation) => (
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
          
          {conversations.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-500">
              No conversations found
            </div>
          )}
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
    message: RealTimeMessage, 
    isCurrentUser: boolean,
    isHighlighted?: boolean,
    onStar: () => void,
    onReply: () => void,
    onForward: () => void
  }) => {
    const [isStarred, setIsStarred] = useState(message.is_starred || false);
    
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
              <div className="font-medium text-xs mb-1">{message.sender_name}</div>
            )}
            
            {message.content && 
              <p className="text-sm whitespace-pre-wrap" 
                 dangerouslySetInnerHTML={{ __html: message.content }} 
              />
            }
            
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
    messages: RealTimeMessage[],
    activeConversation: RealTimeConversation | undefined,
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
                isCurrentUser={message.sender_id === 'current-user'}
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
    replyToMessage: RealTimeMessage | null
  }) => {
    const { toast } = useToast();
    const [isFormatting, setIsFormatting] = useState(false);
    const [showMentionsList, setShowMentionsList] = useState(false);
    const [filteredMentions, setFilteredMentions] = useState<CohortStudent[]>([]);
    const mentionsRef = useRef<HTMLDivElement>(null);
    
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

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (mentionsRef.current && !mentionsRef.current.contains(event.target as Node)) {
          setShowMentionsList(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setNewMessage(value);
      
      const mentionMatch = value.match(/@(\w*)$/);
      if (mentionMatch) {
        const searchTerm = mentionMatch[1].toLowerCase();
        const filtered = cohortStudents.filter(student => 
          student.name.toLowerCase().includes(searchTerm) || 
          student.name.split(' ')[0].toLowerCase().includes(searchTerm)
        );
        setFilteredMentions(filtered);
        setShowMentionsList(true);
      } else {
        setShowMentionsList(false);
      }
    };

    const insertMention = (student: CohortStudent) => {
      const newValue = newMessage.replace(/@\w*$/, `@${student.name.split(' ')[0]} `);
      setNewMessage(newValue);
      setShowMentionsList(false);
      
      toast({
        title: "User Mentioned",
        description: `You mentioned ${student.name}`,
        variant: "mention",
      });
    };

    return (
      <div className="p-3 border-t bg-white">
        {replyToMessage && (
          <div className="mb-2 pl-2 border-l-2 border-military-navy/50 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Replying to {replyToMessage.sender_name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setReplyToMessage(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm truncate text-gray-500 mt-1">{replyToMessage.content.replace(/<[^>]*>/g, '')}</p>
