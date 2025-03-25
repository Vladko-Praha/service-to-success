
import React, { useState, useEffect } from "react";
import { Video, ChevronDown, ChevronUp, RefreshCw, Upload } from "lucide-react";
import { useContentDelivery } from "@/hooks/use-content-delivery";
import LazyContentLoader from "./LazyContentLoader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoResource, videoService } from "@/services/media/videoService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface VideoSectionProps {
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
  videoId?: string; // Optional - if not provided, use default demo video
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  showVideo, 
  setShowVideo,
  videoId = "video-101" // Default demo video ID
}) => {
  const { toast } = useToast();
  const { 
    fetchVideo, 
    videoResources, 
    loading, 
    errors, 
    trackVideoProgress,
    isResourceExpiring,
    refreshResourceUrl
  } = useContentDelivery({
    prefetchThreshold: 70 // Start prefetching when 70% through the video
  });
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  
  // When the video is shown, check if it needs to be loaded or refreshed
  useEffect(() => {
    if (showVideo) {
      const video = videoResources[videoId];
      
      if (!video && !loading[videoId]) {
        fetchVideo(videoId);
      } else if (video && isResourceExpiring(videoId, 'video')) {
        refreshResourceUrl(videoId, 'video');
      }
    }
  }, [showVideo, videoId, videoResources, loading, fetchVideo, isResourceExpiring, refreshResourceUrl]);
  
  // Track video progress for analytics and prefetching
  useEffect(() => {
    if (showVideo && currentTime > 0 && duration > 0) {
      const trackingInterval = setInterval(() => {
        trackVideoProgress(videoId, currentTime, duration);
      }, 10000); // Track every 10 seconds
      
      return () => clearInterval(trackingInterval);
    }
  }, [showVideo, videoId, currentTime, duration, trackVideoProgress]);
  
  // Function to handle video player events
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
    setDuration(e.currentTarget.duration);
  };
  
  // Function to handle video upload
  const handleVideoUpload = async () => {
    if (!videoFile || !videoTitle || !videoDescription) {
      toast({
        title: "Upload Failed",
        description: "Please provide a file, title, and description",
        variant: "destructive"
      });
      return;
    }
    
    setUploadingVideo(true);
    
    try {
      // Upload the video
      const newVideoId = await videoService.uploadVideo(videoFile, {
        title: videoTitle,
        description: videoDescription
      });
      
      if (newVideoId) {
        toast({
          title: "Upload Successful",
          description: `${videoTitle} has been uploaded successfully`,
        });
        
        // Reset the form
        setVideoFile(null);
        setVideoTitle("");
        setVideoDescription("");
        
        // Fetch the video to add it to the resources list and switch to it
        fetchVideo(newVideoId);
      } else {
        toast({
          title: "Upload Failed",
          description: "Could not upload the video",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading",
        variant: "destructive"
      });
    } finally {
      setUploadingVideo(false);
    }
  };
  
  // Render the video player with the resource
  const renderVideoPlayer = (resource: VideoResource) => {
    return (
      <div className="aspect-video bg-gray-800 flex flex-col items-center mb-2 rounded overflow-hidden">
        {resource.hlsUrl ? (
          <video 
            className="w-full h-full"
            controls
            src={resource.streamUrl} // Fallback for browsers that don't support HLS
            onTimeUpdate={handleVideoTimeUpdate}
            poster={resource.thumbnailUrl}
            preload="metadata"
          >
            {/* For HLS support, you would use a library like hls.js or video.js */}
            <source src={resource.hlsUrl} type="application/x-mpegURL" />
            <source src={resource.streamUrl} type="video/mp4" />
            <p className="text-white bg-black p-4">
              Your browser doesn't support HTML5 video. Here is a 
              <a href={resource.downloadUrl} className="text-blue-400 underline ml-1">
                link to the video
              </a> instead.
            </p>
          </video>
        ) : (
          <video 
            className="w-full h-full"
            controls
            src={resource.streamUrl}
            onTimeUpdate={handleVideoTimeUpdate}
            poster={resource.thumbnailUrl}
            preload="metadata"
          />
        )}
        
        <div className="w-full bg-gray-900 p-2 text-xs text-gray-300">
          {resource.title} - Video expires in {formatTimeRemaining(resource.expiresAt)}
        </div>
      </div>
    );
  };
  
  // Function to format time remaining until URL expiration
  const formatTimeRemaining = (expiresAt?: number): string => {
    if (!expiresAt) return 'Unknown';
    
    const now = Date.now();
    const remaining = expiresAt - now;
    
    if (remaining <= 0) return 'Expired';
    
    const minutes = Math.floor(remaining / 60000);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };
  
  // Function to fetch the video resource
  const fetchVideoResource = async () => {
    return fetchVideo(videoId);
  };
  
  return (
    <div className="mt-8 border rounded-lg overflow-hidden">
      <div 
        className="bg-military-beige/20 p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setShowVideo(!showVideo)}
      >
        <div className="flex items-center">
          <Video className="h-5 w-5 mr-2 text-military-olive" />
          <h3 className="font-medium">Lesson Video</h3>
        </div>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="mr-2" onClick={(e) => e.stopPropagation()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Video</DialogTitle>
                <DialogDescription>
                  Upload a video to share with your team.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="videoTitle">Title</Label>
                  <Input 
                    id="videoTitle" 
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Video title" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="videoDescription">Description</Label>
                  <Textarea 
                    id="videoDescription" 
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Video description" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="videoFile">Video File</Label>
                  <Input 
                    id="videoFile" 
                    type="file" 
                    accept="video/mp4,video/quicktime,video/x-msvideo"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  onClick={handleVideoUpload}
                  disabled={uploadingVideo || !videoFile || !videoTitle || !videoDescription}
                >
                  {uploadingVideo ? "Uploading..." : "Upload Video"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {showVideo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {showVideo && (
        <div className="p-4">
          {errors[videoId] && (
            <div className="text-red-500 mb-2 p-2 bg-red-50 rounded border border-red-200">
              {errors[videoId]}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => fetchVideo(videoId)}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            </div>
          )}
          
          <LazyContentLoader
            resourceId={videoId}
            resourceType="video"
            fetchResource={fetchVideoResource}
            renderContent={renderVideoPlayer}
            placeholder={(
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <Skeleton className="h-36 w-full mb-4" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </div>
            )}
          />
          
          <p className="text-sm text-muted-foreground mt-2">
            This video covers the key concepts of business establishment and legal structures.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
