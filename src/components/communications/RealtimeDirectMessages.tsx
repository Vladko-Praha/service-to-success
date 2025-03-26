
import React, { useState, useEffect, useRef } from "react";
import { useRealtimeMessages, RealTimeMessage, RealTimeConversation } from "@/hooks/use-realtime-messages";
import { SearchIcon, Star, Flag, Trash2, CheckCheck, Check, Clock, Paperclip, SendHorizontal, MoreVertical, ChevronDown, X, FilePlus, PlusCircle, Image, FileText, File, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CohortStudentSelector from "./CohortStudentSelector";
import { CohortStudent, cohortStudents } from "@/data/cohortStudents";
import UserMention from "./UserMention";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MediaAttachmentButton, { MediaAttachment } from "./MediaAttachmentButton";
import MediaPreview from "./MediaPreview";
import { useToast } from "@/hooks/use-toast";

interface RealtimeDirectMessagesProps {
  selectedMessageId: string | null;
}

const getRelativeTime = (timestamp: string) => {
  if (timestamp.includes("AM") || timestamp.includes("PM")) return timestamp;
  return timestamp;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "sending":
      return <Clock className="h-3 w-3 text-muted-foreground" />;
    case "sent":
      return <Check className="h-3 w-3 text-muted-foreground" />;
    case "delivered":
      return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    case "read":
      return <CheckCheck className="h-3 w-3 text-green-500" />;
    default:
      return null;
  }
};

const RealtimeDirectMessages: React.FC<RealtimeDirectMessagesProps> = ({ selectedMessageId }) => {
  const {
    conversations,
    messages,
    sendMessage,
    markConversationAsRead,
    toggleConversationStar,
    toggleMessageStar,
    toggleConversationImportant,
    createConversation,
    deleteConversation
  } = useRealtimeMessages();
  
  const [selectedConversation, setSelectedConversation] = useState<RealTimeConversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CohortStudent | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDeleteAllMessages, setShowDeleteAllMessages] = useState(false);
  const [starredFilter, setStarredFilter] = useState(false);
  const [unreadFilter, setUnreadFilter] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Filtered conversations based on search term and filters
  const filteredConversations = conversations
    .filter(conversation => 
      (starredFilter ? conversation.isStarred : true) &&
      (unreadFilter ? conversation.unread > 0 : true) &&
      (searchTerm === "" || 
        conversation.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (conversation.lastMessage && conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      // Sort by unread first, then by timestamp
      if (a.unread > 0 && b.unread === 0) return -1;
      if (a.unread === 0 && b.unread > 0) return 1;
      
      // For same unread status, sort by timestamp (would need parsing in a real app)
      return 0;
    });
    
  // Select a conversation if none is selected
  useEffect(() => {
    if (!selectedConversation && filteredConversations.length > 0 && !isCreatingNew) {
      setSelectedConversation(filteredConversations[0]);
    }
  }, [filteredConversations, selectedConversation, isCreatingNew]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedConversation]);
  
  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversation && selectedConversation.unread > 0) {
      markConversationAsRead(selectedConversation.id);
    }
  }, [selectedConversation, markConversationAsRead]);
  
  // Focus on message input when conversation is selected
  useEffect(() => {
    if (selectedConversation && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [selectedConversation]);
  
  // Handle selecting a conversation
  const handleSelectConversation = (conversation: RealTimeConversation) => {
    setSelectedConversation(conversation);
    setIsCreatingNew(false);
    
    if (conversation.unread > 0) {
      markConversationAsRead(conversation.id);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    
    if (selectedConversation && messageText.trim()) {
      sendMessage(selectedConversation.id, messageText, attachments);
      setMessageText("");
      setAttachments([]);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    } else if (isCreatingNew && selectedStudent && messageText.trim()) {
      const newConversationId = createConversation({
        id: selectedStudent.id,
        name: selectedStudent.name,
        avatar: selectedStudent.avatar,
        status: selectedStudent.status || "offline",
        role: selectedStudent.role
      });
      
      sendMessage(newConversationId, messageText, attachments);
      setMessageText("");
      setAttachments([]);
      setIsCreatingNew(false);
      
      // Find and select the newly created conversation
      const newConversation = conversations.find(conv => conv.id === newConversationId);
      if (newConversation) {
        setSelectedConversation(newConversation);
      }
      
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${selectedStudent.name}.`,
      });
    }
  };
  
  // Handle creating a new conversation
  const handleNewConversation = () => {
    setIsCreatingNew(true);
    setSelectedConversation(null);
    setSelectedStudent(null);
    setMessageText("");
    setAttachments([]);
  };
  
  // Handle selecting a student for a new conversation
  const handleSelectStudent = (student: CohortStudent) => {
    setSelectedStudent(student);
    
    // Check if conversation with this student already exists
    const existingConversation = conversations.find(
      conv => conv.contact.id === student.id
    );
    
    if (existingConversation) {
      setSelectedConversation(existingConversation);
      setIsCreatingNew(false);
    }
  };
  
  // Handle adding an attachment
  const handleAddAttachment = (attachment: any) => {
    setAttachments([...attachments, attachment]);
  };
  
  // Handle removing an attachment
  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  // Handle deleting a conversation
  const handleDeleteConversation = () => {
    if (selectedConversation) {
      const contactName = selectedConversation.contact.name;
      deleteConversation(selectedConversation.id);
      setSelectedConversation(null);
      setShowConfirmDelete(false);
      
      toast({
        title: "Conversation Deleted",
        description: `Your conversation with ${contactName} has been deleted.`,
      });
    }
  };
  
  // Handle deleting all messages in a conversation
  const handleDeleteAllMessages = () => {
    if (selectedConversation) {
      const conversationId = selectedConversation.id;
      
      // Delete the conversation and create a new empty one with the same contact
      deleteConversation(conversationId);
      
      // Create a new conversation with the same contact
      const newConversationId = createConversation({
        id: selectedConversation.contact.id,
        name: selectedConversation.contact.name,
        avatar: selectedConversation.contact.avatar,
        status: selectedConversation.contact.status,
        role: selectedConversation.contact.role
      });
      
      // Find and select the newly created conversation
      const newConversation = conversations.find(conv => conv.id === newConversationId);
      if (newConversation) {
        setSelectedConversation(newConversation);
      }
      
      setShowDeleteAllMessages(false);
      
      toast({
        title: "Messages Deleted",
        description: `All messages with ${selectedConversation.contact.name} have been deleted.`,
      });
    }
  };
  
  return (
    <div className="border rounded-md grid grid-cols-1 md:grid-cols-3 h-[600px]">
      {/* Conversations List */}
      <div className="md:col-span-1 border-r">
        <div className="p-3 border-b">
          <div className="relative mb-3">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search messages..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="space-x-1">
              <Button 
                size="sm" 
                variant={starredFilter ? "default" : "outline"} 
                className={starredFilter ? "bg-military-navy text-military-sand" : ""}
                onClick={() => setStarredFilter(!starredFilter)}
              >
                <Star className={`h-4 w-4 ${starredFilter ? "fill-military-sand" : ""} mr-1`} />
                Starred
              </Button>
              
              <Button 
                size="sm" 
                variant={unreadFilter ? "default" : "outline"}
                className={unreadFilter ? "bg-military-navy text-military-sand" : ""}
                onClick={() => setUnreadFilter(!unreadFilter)}
              >
                Unread
                {unreadFilter && conversations.filter(c => c.unread > 0).length > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-military-sand text-military-navy">
                    {conversations.filter(c => c.unread > 0).length}
                  </Badge>
                )}
              </Button>
            </div>
            
            <Button 
              size="sm" 
              onClick={handleNewConversation}
              className="bg-military-navy text-military-sand"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(600px-70px)]">
          {filteredConversations.length > 0 ? (
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar className="h-10 w-10 mr-3">
                          {conversation.contact.avatar ? (
                            <img src={conversation.contact.avatar} alt={conversation.contact.name} className="object-cover" />
                          ) : (
                            <div className="bg-military-navy text-military-sand h-full w-full flex items-center justify-center font-semibold">
                              {conversation.contact.name.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-2 h-3 w-3 rounded-full border-2 border-white ${
                            conversation.contact.status === "online"
                              ? "bg-green-500"
                              : conversation.contact.status === "away"
                              ? "bg-amber-500"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{conversation.contact.name}</div>
                        <div className="text-xs text-muted-foreground">{conversation.contact.role}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{conversation.timestamp}</div>
                  </div>
                  
                  <div className="ml-[52px] flex justify-between items-center">
                    <div className="text-sm truncate pr-2 max-w-[70%]">{conversation.lastMessage}</div>
                    <div className="flex items-center space-x-1">
                      {conversation.isStarred && (
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      )}
                      {conversation.isImportant && (
                        <Flag className="h-3 w-3 fill-military-red text-military-red" />
                      )}
                      {conversation.unread > 0 && (
                        <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center bg-military-navy text-military-sand text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm
                ? "No conversations matching your search"
                : starredFilter
                ? "No starred conversations"
                : unreadFilter
                ? "No unread messages"
                : "No conversations yet"}
            </div>
          )}
        </ScrollArea>
      </div>
      
      {/* Conversation View */}
      <div className="md:col-span-2 flex flex-col h-full">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {selectedConversation.contact.avatar ? (
                    <img src={selectedConversation.contact.avatar} alt={selectedConversation.contact.name} className="object-cover" />
                  ) : (
                    <div className="bg-military-navy text-military-sand h-full w-full flex items-center justify-center font-semibold">
                      {selectedConversation.contact.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium flex items-center">
                    {selectedConversation.contact.name}
                    <div
                      className={`ml-2 h-2 w-2 rounded-full ${
                        selectedConversation.contact.status === "online"
                          ? "bg-green-500"
                          : selectedConversation.contact.status === "away"
                          ? "bg-amber-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    {selectedConversation.contact.status === "online"
                      ? "Online"
                      : selectedConversation.contact.status === "away"
                      ? "Away"
                      : "Offline"}{" "}
                    • {selectedConversation.contact.role}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleConversationStar(selectedConversation.id)}
                  className="h-8 w-8"
                >
                  <Star className={`h-4 w-4 ${
                    selectedConversation.isStarred ? "fill-amber-400 text-amber-400" : ""
                  }`} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleConversationImportant(selectedConversation.id)}
                  className="h-8 w-8"
                >
                  <Flag className={`h-4 w-4 ${
                    selectedConversation.isImportant ? "fill-military-red text-military-red" : ""
                  }`} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={() => setShowDeleteAllMessages(true)}>
                      <Trash2 className="h-4 w-4 mr-2 text-military-red" />
                      Delete All Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowConfirmDelete(true)}>
                      <Trash2 className="h-4 w-4 mr-2 text-military-red" />
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages[selectedConversation.id]?.length > 0 ? (
                  messages[selectedConversation.id].map((message, index) => {
                    const isCurrentUser = message.sender_id === "current-user";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[75%] flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8 mr-2">
                              {message.sender_avatar ? (
                                <img src={message.sender_avatar} alt={message.sender_name} className="object-cover" />
                              ) : (
                                <div className="bg-military-navy text-military-sand h-full w-full flex items-center justify-center text-xs font-semibold">
                                  {message.sender_name.charAt(0)}
                                </div>
                              )}
                            </Avatar>
                          )}
                          
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser
                                  ? "bg-military-navy text-military-sand mr-2"
                                  : "bg-gray-100 ml-2"
                              }`}
                            >
                              <p>{message.content}</p>
                              
                              {/* Attachments */}
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center p-2 rounded-md bg-white/20"
                                    >
                                      {attachment.type === "pdf" ? (
                                        <FileText className="h-4 w-4 mr-2" />
                                      ) : attachment.type === "image" ? (
                                        <Image className="h-4 w-4 mr-2" />
                                      ) : (
                                        <File className="h-4 w-4 mr-2" />
                                      )}
                                      <span className="text-sm truncate">{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div
                              className={`text-xs text-muted-foreground mt-1 flex items-center ${
                                isCurrentUser ? "justify-end mr-2" : "justify-start ml-2"
                              }`}
                            >
                              {getRelativeTime(message.timestamp)}
                              {isCurrentUser && (
                                <span className="ml-1">{getStatusIcon(message.status)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center h-full text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No messages yet</p>
                      <p className="text-sm">Start a conversation with {selectedConversation.contact.name}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-3 border-t">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-md py-1 px-3 text-sm flex items-center"
                    >
                      <span className="truncate max-w-[150px]">{attachment.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <MediaAttachmentButton onSelect={handleAddAttachment} />
                
                <Input
                  ref={messageInputRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                
                <Button 
                  type="button"
                  onClick={handleSendMessage}
                  className="bg-military-navy hover:bg-military-navy/90"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : isCreatingNew ? (
          <>
            {/* New Conversation */}
            <div className="p-3 border-b">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">New Message</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsCreatingNew(false);
                    if (filteredConversations.length > 0) {
                      setSelectedConversation(filteredConversations[0]);
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <CohortStudentSelector
                onSelectStudent={handleSelectStudent}
                placeholder="Search for a recipient..."
                className="mb-3"
                selectedStudents={selectedStudent ? [selectedStudent] : []}
              />
              
              {selectedStudent && (
                <div className="bg-gray-100 rounded-md p-2 flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      {selectedStudent.avatar ? (
                        <img src={selectedStudent.avatar} alt={selectedStudent.name} className="object-cover" />
                      ) : (
                        <div className="bg-military-navy text-military-sand h-full w-full flex items-center justify-center text-xs font-semibold">
                          {selectedStudent.name.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                    <span>{selectedStudent.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStudent(null)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4">
                {selectedStudent ? (
                  <div className="text-center text-muted-foreground mt-12">
                    <p>Start a new conversation with {selectedStudent.name}</p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground mt-12">
                    <p>Select a recipient to start a new conversation</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t">
                {attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-md py-1 px-3 text-sm flex items-center"
                      >
                        <span className="truncate max-w-[150px]">{attachment.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(index)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <MediaAttachmentButton onSelect={handleAddAttachment} />
                  
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={selectedStudent ? "Type your message..." : "Select a recipient first..."}
                    className="flex-1"
                    disabled={!selectedStudent}
                  />
                  
                  <Button 
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-military-navy hover:bg-military-navy/90"
                    disabled={!selectedStudent || !messageText.trim()}
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-16 w-16 mx-auto mb-3 opacity-20" />
              <h3 className="text-lg font-medium mb-1">No Conversation Selected</h3>
              <p>Select a conversation from the list or start a new one</p>
              <Button
                onClick={handleNewConversation}
                className="mt-4 bg-military-navy hover:bg-military-navy/90"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this conversation with {selectedConversation?.contact.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConversation}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete All Messages Confirmation Dialog */}
      <Dialog open={showDeleteAllMessages} onOpenChange={setShowDeleteAllMessages}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete All Messages</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all messages in this conversation with {selectedConversation?.contact.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteAllMessages(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAllMessages}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealtimeDirectMessages;
