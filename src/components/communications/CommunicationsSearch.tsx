
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export type SearchResult = {
  id: string;
  type: "direct-message" | "fireteam" | "notification" | "broadcast";
  title: string;
  content: string;
  sender?: string;
  timestamp: string;
  tab: string;
};

interface CommunicationsSearchProps {
  onResultSelect?: (result: SearchResult) => void;
}

const CommunicationsSearch = ({ onResultSelect }: CommunicationsSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock search results - in a real app, this would come from an API call
  const mockSearchResults: SearchResult[] = [
    {
      id: "dm1",
      type: "direct-message",
      title: "Captain Sarah Johnson",
      content: "When will you complete the market analysis assignment?",
      sender: "Captain Sarah Johnson",
      timestamp: "10:32 AM",
      tab: "messages"
    },
    {
      id: "dm2",
      type: "direct-message",
      title: "Sgt. Michael Brooks",
      content: "I've reviewed your business plan draft",
      sender: "Sgt. Michael Brooks",
      timestamp: "Yesterday",
      tab: "messages"
    },
    {
      id: "ft1",
      type: "fireteam",
      title: "Alpha Entrepreneurs",
      content: "Just shared a new resource on securing VA small business loans",
      sender: "Major James Wilson",
      timestamp: "2 hours ago",
      tab: "fireteam"
    },
    {
      id: "ft2",
      type: "fireteam",
      title: "E-commerce Success",
      content: "My e-commerce business just hit its first $10K month!",
      sender: "Corporal Alex Rivera",
      timestamp: "Yesterday",
      tab: "fireteam"
    },
    {
      id: "notif1",
      type: "notification",
      title: "Assignment Due",
      content: "Your market research assignment is due tomorrow",
      timestamp: "1 hour ago",
      tab: "notifications"
    },
    {
      id: "bc1",
      type: "broadcast",
      title: "Program Update",
      content: "Important changes to the entrepreneurship training schedule",
      sender: "Program Director",
      timestamp: "Yesterday",
      tab: "broadcasts"
    }
  ];

  const filteredResults = searchQuery.length > 0
    ? mockSearchResults.filter(
        result => 
          result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (result.sender && result.sender.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setSearchQuery("");
    
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      // Navigate to the communications page with the appropriate tab selected
      navigate(`/communications?tab=${result.tab}&id=${result.id}`);
    }
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button 
          variant="outline" 
          className="flex-1 justify-start text-muted-foreground pl-3"
          onClick={() => setIsOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search communications...</span>
        </Button>
      </div>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput 
          placeholder="Search messages, posts, notifications..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredResults.length > 0 && (
            <>
              <CommandGroup heading="Direct Messages">
                {filteredResults
                  .filter(result => result.type === "direct-message")
                  .map(result => (
                    <CommandItem 
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {result.content}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{result.timestamp}</div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              
              <CommandGroup heading="Fire Team Network">
                {filteredResults
                  .filter(result => result.type === "fireteam")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.sender}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {result.content}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{result.timestamp}</div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              
              <CommandGroup heading="Notifications & Broadcasts">
                {filteredResults
                  .filter(result => result.type === "notification" || result.type === "broadcast")
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{result.title}</div>
                        {result.sender && (
                          <div className="text-xs text-muted-foreground">{result.sender}</div>
                        )}
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {result.content}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{result.timestamp}</div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommunicationsSearch;
