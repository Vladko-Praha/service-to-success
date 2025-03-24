
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Video, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIBuddyInteraction from "./AIBuddyInteraction";
import VideoSection from "./VideoSection";
import ResourceSection from "./ResourceSection";
import DiscussionSection from "./DiscussionSection";

interface LessonContentProps {
  currentClass: any;
  activeSection: string;
  activeModule: string;
  activeClass: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ 
  currentClass,
  activeSection,
  activeModule,
  activeClass
}) => {
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const savedLessons = localStorage.getItem("completedLessons");
    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons));
    }
  }, []);

  const handleMarkAsCompleted = () => {
    const lessonKey = `${activeSection}-${activeModule}-${activeClass}`;
    let updatedCompletedLessons: string[];

    if (completedLessons.includes(lessonKey)) {
      updatedCompletedLessons = completedLessons.filter(id => id !== lessonKey);
      toast({
        title: "Lesson marked as incomplete",
        description: `"${currentClass?.title}" has been removed from your completed lessons.`
      });
    } else {
      updatedCompletedLessons = [...completedLessons, lessonKey];
      toast({
        title: "Lesson completed! 🎉",
        description: `"${currentClass?.title}" has been marked as completed.`
      });
    }

    setCompletedLessons(updatedCompletedLessons);
    localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
  };

  const isLessonCompleted = () => {
    const lessonKey = `${activeSection}-${activeModule}-${activeClass}`;
    return completedLessons.includes(lessonKey);
  };

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
          variant={isLessonCompleted() ? "outline" : "default"}
          className={isLessonCompleted() ? "border-green-500 text-green-600" : "bg-military-olive hover:bg-military-olive/90"}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {isLessonCompleted() ? "Marked as Completed" : "Mark as Completed"}
        </Button>
      </div>
      
      <DiscussionSection />
    </div>
  );
};

export default LessonContent;
