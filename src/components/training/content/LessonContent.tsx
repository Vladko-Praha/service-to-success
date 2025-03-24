
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import AIBuddyInteraction from "./AIBuddyInteraction";
import VideoSection from "./VideoSection";
import ResourceSection from "./ResourceSection";
import DiscussionSection from "./DiscussionSection";
import { useTraining } from "@/context/TrainingContext";

interface LessonContentProps {
  currentClass: any;
}

const LessonContent: React.FC<LessonContentProps> = ({ currentClass }) => {
  const { state, markLessonCompleted, isLessonCompleted } = useTraining();
  const { activeSection, activeModule, activeClass } = state;
  const [showVideo, setShowVideo] = React.useState(false);

  const handleMarkAsCompleted = () => {
    markLessonCompleted(activeSection, activeModule, activeClass);
  };

  const isCompleted = isLessonCompleted(activeSection, activeModule, activeClass);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{currentClass.title}</h1>
      
      <div className="prose max-w-none">
        {currentClass.content ? (
          <div dangerouslySetInnerHTML={{ __html: currentClass.content }} />
        ) : (
          <p>No content available for this lesson.</p>
        )}
        
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>
            In this lesson, we'll explore the essential steps for establishing your business correctly.
            Setting up your business with the right legal structure and registrations is crucial for
            long-term success and protection of your assets.
          </p>
          
          <p>
            Throughout this lesson, you'll learn about different business structures, 
            how to register your business with local and federal authorities, and the essential
            paperwork needed to operate legally in your jurisdiction.
          </p>
          
          <h2 className="text-xl font-semibold">Key Concepts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Business Structures</strong> - Understanding the differences between sole proprietorships, LLCs, corporations, and partnerships</li>
            <li><strong>Business Registration</strong> - Steps to register your business name and entity with appropriate government agencies</li>
            <li><strong>Licenses and Permits</strong> - Industry-specific and location-specific requirements for legal operation</li>
            <li><strong>Tax Considerations</strong> - Tax implications of different business structures and registration requirements</li>
          </ul>
        </div>
      </div>
      
      <VideoSection showVideo={showVideo} setShowVideo={setShowVideo} />
      
      <ResourceSection />
      
      <AIBuddyInteraction currentClass={currentClass} />
      
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleMarkAsCompleted}
          variant={isCompleted ? "outline" : "default"}
          className={isCompleted ? "border-green-500 text-green-600" : "bg-military-olive hover:bg-military-olive/90"}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {isCompleted ? "Marked as Completed" : "Mark as Completed"}
        </Button>
      </div>
      
      <DiscussionSection />
    </div>
  );
};

export default LessonContent;
