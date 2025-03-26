
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaperclipIcon, FileVideo, FileImage, FileAudio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { videoService } from '@/services/media/videoService';
import { documentCdnService } from '@/services/media/documentCdnService';

export type MediaAttachment = {
  id: string;
  type: 'video' | 'document' | 'image' | 'audio';
  name: string;
  url?: string;
  thumbnailUrl?: string;
  size?: number;
};

interface MediaAttachmentButtonProps {
  onAttach: (attachment: MediaAttachment) => void;
}

const MediaAttachmentButton: React.FC<MediaAttachmentButtonProps> = ({ onAttach }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("document");
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMediaFile(file);
    
    if (file) {
      // Auto-set title from filename if not already set
      if (!mediaTitle) {
        const titleFromFilename = file.name.split('.').slice(0, -1).join('.');
        setMediaTitle(titleFromFilename);
      }
    }
  };

  const handleUpload = async () => {
    if (!mediaFile || !mediaTitle) {
      toast({
        title: "Upload Failed",
        description: "Please provide a file and title",
        variant: "destructive"
      });
      return;
    }

    setUploadingMedia(true);

    try {
      let attachmentId: string | null = null;
      let attachment: MediaAttachment | null = null;

      if (activeTab === "document") {
        // Upload document
        attachmentId = await documentCdnService.uploadDocument(mediaFile, {
          title: mediaTitle,
          description: mediaDescription
        });

        if (attachmentId) {
          attachment = {
            id: attachmentId,
            type: 'document',
            name: mediaTitle,
            size: mediaFile.size
          };
        }
      } else if (activeTab === "video") {
        // Upload video
        attachmentId = await videoService.uploadVideo(mediaFile, {
          title: mediaTitle,
          description: mediaDescription
        });

        if (attachmentId) {
          attachment = {
            id: attachmentId,
            type: 'video',
            name: mediaTitle
          };
        }
      } else if (activeTab === "image") {
        // For demo purposes, treat images like documents
        attachmentId = await documentCdnService.uploadDocument(mediaFile, {
          title: mediaTitle,
          description: mediaDescription
        });

        if (attachmentId) {
          attachment = {
            id: attachmentId,
            type: 'image',
            name: mediaTitle,
            size: mediaFile.size
          };
        }
      } else if (activeTab === "audio") {
        // For demo purposes, treat audio like documents
        attachmentId = await documentCdnService.uploadDocument(mediaFile, {
          title: mediaTitle,
          description: mediaDescription
        });

        if (attachmentId) {
          attachment = {
            id: attachmentId,
            type: 'audio',
            name: mediaTitle,
            size: mediaFile.size
          };
        }
      }

      if (attachment) {
        toast({
          title: "Upload Successful",
          description: `${mediaTitle} has been uploaded successfully`,
        });

        // Call the onAttach callback with the new attachment
        onAttach(attachment);

        // Reset the form
        setMediaFile(null);
        setMediaTitle("");
        setMediaDescription("");

        return true;
      } else {
        toast({
          title: "Upload Failed",
          description: "Could not upload the file",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading",
        variant: "destructive"
      });
      return false;
    } finally {
      setUploadingMedia(false);
    }
  };

  // Helper function to get accept attribute for file input
  const getAcceptAttribute = () => {
    switch (activeTab) {
      case "document":
        return ".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx,.ppt,.pptx";
      case "video":
        return ".mp4,.webm,.mov,.avi";
      case "image":
        return ".jpg,.jpeg,.png,.gif,.webp";
      case "audio":
        return ".mp3,.wav,.ogg,.m4a";
      default:
        return "*";
    }
  };

  // Helper function to get icon for media type
  const getMediaIcon = () => {
    switch (activeTab) {
      case "document":
        return <FileImage className="h-4 w-4" />;
      case "video":
        return <FileVideo className="h-4 w-4" />;
      case "image":
        return <FileImage className="h-4 w-4" />;
      case "audio":
        return <FileAudio className="h-4 w-4" />;
      default:
        return <PaperclipIcon className="h-4 w-4" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PaperclipIcon className="h-4 w-4 mr-1" />
          Attach
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Attach Media</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="document" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="media-file">Select {activeTab} file</Label>
              <Input 
                id="media-file" 
                type="file" 
                accept={getAcceptAttribute()}
                onChange={handleFileChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="media-title">Title</Label>
              <Input 
                id="media-title" 
                value={mediaTitle}
                onChange={(e) => setMediaTitle(e.target.value)}
                placeholder={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} title`} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="media-description">Description (optional)</Label>
              <Input 
                id="media-description" 
                value={mediaDescription}
                onChange={(e) => setMediaDescription(e.target.value)}
                placeholder="Brief description" 
              />
            </div>
            
            <Button 
              onClick={handleUpload}
              disabled={uploadingMedia || !mediaFile || !mediaTitle}
              className="w-full"
            >
              {uploadingMedia ? (
                "Uploading..."
              ) : (
                <>
                  {getMediaIcon()}
                  <span className="ml-2">Upload {activeTab}</span>
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MediaAttachmentButton;
