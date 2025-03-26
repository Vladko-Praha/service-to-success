import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileVideo, FileImage, FileAudio, File, ExternalLink } from "lucide-react";
import { MediaAttachment } from './MediaAttachmentButton';
import { useContentDelivery } from '@/hooks/use-content-delivery';
import { useToast } from '@/hooks/use-toast';

interface MediaPreviewProps {
  attachment: MediaAttachment;
  compact?: boolean;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ attachment, compact = false }) => {
  const { toast } = useToast();
  const { 
    fetchDocument, 
    fetchVideo,
    documentResources, 
    videoResources
  } = useContentDelivery();

  const getFileIcon = () => {
    switch (attachment.type) {
      case 'video':
        return <FileVideo className={compact ? "h-5 w-5" : "h-8 w-8"} />;
      case 'image':
        return <FileImage className={compact ? "h-5 w-5" : "h-8 w-8"} />;
      case 'audio':
        return <FileAudio className={compact ? "h-5 w-5" : "h-8 w-8"} />;
      case 'document':
      default:
        return <File className={compact ? "h-5 w-5" : "h-8 w-8"} />;
    }
  };

  const handleViewMedia = async () => {
    try {
      if (attachment.type === 'video') {
        // Fetch video resource if needed
        if (!videoResources[attachment.id]) {
          await fetchVideo(attachment.id);
        }
        
        if (videoResources[attachment.id]) {
          // Open video in a new window
          window.open(videoResources[attachment.id].streamUrl, '_blank');
        } else {
          toast({
            title: "Error",
            description: "Could not load video",
            variant: "destructive"
          });
        }
      } else {
        // Fetch document resource if needed
        if (!documentResources[attachment.id]) {
          await fetchDocument(attachment.id);
        }
        
        if (documentResources[attachment.id]) {
          // Open document in a new window
          window.open(documentResources[attachment.id].viewUrl, '_blank');
        } else {
          toast({
            title: "Error",
            description: "Could not load document",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error viewing media:", error);
      toast({
        title: "Error",
        description: "Could not open the media file",
        variant: "destructive"
      });
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "";
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  if (compact) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="h-auto py-1 px-2 gap-1.5 overflow-hidden"
        onClick={handleViewMedia}
      >
        {getFileIcon()}
        <span className="truncate max-w-32">{attachment.name}</span>
        {attachment.size && (
          <span className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</span>
        )}
      </Button>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted/50 p-2 rounded-md">
            {getFileIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{attachment.name}</p>
            <p className="text-xs text-muted-foreground">
              {attachment.type.charAt(0).toUpperCase() + attachment.type.slice(1)}
              {attachment.size && ` • ${formatFileSize(attachment.size)}`}
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleViewMedia}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPreview;
