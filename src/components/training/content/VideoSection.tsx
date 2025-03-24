
import React from "react";
import { Video, ChevronDown, ChevronUp } from "lucide-react";

interface VideoSectionProps {
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ showVideo, setShowVideo }) => {
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
        {showVideo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>
      
      {showVideo && (
        <div className="p-4">
          <div className="aspect-video bg-gray-800 flex items-center justify-center mb-2 rounded">
            <p className="text-white">Video player would be embedded here</p>
          </div>
          <p className="text-sm text-muted-foreground">
            This video covers the key concepts of business establishment and legal structures.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
