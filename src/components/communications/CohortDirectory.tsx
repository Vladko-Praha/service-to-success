
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useRealtimeMessages } from "@/hooks/use-realtime-messages";
import { CohortStudent, cohortStudents, getCohorts, searchStudents } from "@/data/cohortStudents";
import UserMention from "@/components/communications/UserMention";
import { Search, MessageSquare, Users, AtSign } from "lucide-react";

interface CohortDirectoryProps {
  onSelectUser?: (user: CohortStudent) => void;
  mode?: 'compact' | 'full';
  className?: string;
}

const CohortDirectory: React.FC<CohortDirectoryProps> = ({ 
  onSelectUser, 
  mode = 'full',
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(getCohorts()[0] || "");
  const { toast } = useToast();
  const { createConversation } = useRealtimeMessages();

  const handleNewMessage = (student: CohortStudent) => {
    if (onSelectUser) {
      onSelectUser(student);
    } else {
      // Create a new conversation with this student
      const contact = {
        id: student.id,
        name: student.name,
        avatar: student.avatar,
        status: student.status,
        role: student.role
      };
      
      const newConversationId = createConversation(contact);
      
      toast({
        title: "New Conversation",
        description: `Started a new conversation with ${student.name}`
      });
    }
  };

  // Filter students based on search query or by active cohort
  const filteredStudents = searchQuery.trim() 
    ? searchStudents(searchQuery)
    : cohortStudents.filter(student => student.cohort === activeTab);

  // Get all unique cohorts
  const cohorts = getCohorts();

  return (
    <div className={`border rounded-md ${className}`}>
      <div className="p-3 border-b">
        <h3 className="font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-2" /> Cohort Directory
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {!searchQuery && cohorts.length > 0 && (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-2 pt-2">
            <TabsList className="grid grid-cols-3">
              {cohorts.map(cohort => (
                <TabsTrigger key={cohort} value={cohort}>
                  {cohort}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {cohorts.map(cohort => (
            <TabsContent key={cohort} value={cohort} className="m-0">
              {/* Students list will be populated here */}
            </TabsContent>
          ))}
        </Tabs>
      )}

      <ScrollArea className={mode === 'compact' ? 'h-48' : 'h-72'} type="always">
        <div className="p-2 space-y-2">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <UserMention
                    userId={student.id}
                    name={student.name}
                    status={student.status}
                    avatar={student.avatar}
                    role={student.role}
                    clickable={false}
                  />
                  {mode === 'full' && (
                    <span className="ml-2 text-sm text-gray-500">{student.email}</span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleNewMessage(student)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No students found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CohortDirectory;
