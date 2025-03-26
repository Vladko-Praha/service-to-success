
import React, { useState } from "react";
import { Paperclip, Image, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define MediaAttachment type and export it
export interface MediaAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document' | 'video' | 'audio';
  url: string;
  size?: number;
}

// Props interface with onAttachmentSelect
export interface MediaAttachmentButtonProps {
  onAttachmentSelect: (attachment: MediaAttachment) => void;
}

const MediaAttachmentButton: React.FC<MediaAttachmentButtonProps> = ({ onAttachmentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleAttachmentSelect = (type: string) => {
    // Create mock attachment for demo
    const attachment: MediaAttachment = {
      id: `attachment-${Date.now()}`,
      name: `${type}-file-${Date.now()}.${type === 'image' ? 'jpg' : type === 'pdf' ? 'pdf' : 'doc'}`,
      type: type as 'image' | 'pdf' | 'document',
      url: '#'
    };
    
    onAttachmentSelect(attachment);
    setIsOpen(false);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Paperclip className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="grid gap-1">
          <Button
            variant="ghost"
            className="flex justify-start"
            onClick={() => handleAttachmentSelect('image')}
          >
            <Image className="mr-2 h-4 w-4" />
            Image
          </Button>
          <Button
            variant="ghost"
            className="flex justify-start"
            onClick={() => handleAttachmentSelect('pdf')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Document (PDF)
          </Button>
          <Button
            variant="ghost"
            className="flex justify-start"
            onClick={() => handleAttachmentSelect('document')}
          >
            <File className="mr-2 h-4 w-4" />
            Other File
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MediaAttachmentButton;
