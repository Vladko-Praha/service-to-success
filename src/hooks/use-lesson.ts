
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTraining } from "@/context/TrainingContext";

interface UseLessonProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
}

export const useLesson = ({ activeSection, activeModule, activeClass }: UseLessonProps) => {
  const { toast } = useToast();
  const { state, markLessonCompleted, isLessonCompleted } = useTraining();
  const [showVideo, setShowVideo] = useState(false);

  const handleMarkAsCompleted = () => {
    markLessonCompleted(activeSection, activeModule, activeClass);
    toast({
      title: "Lesson Completed",
      description: "Your progress has been saved.",
    });
  };

  const isLessonCompletedCheck = () => {
    return isLessonCompleted(activeSection, activeModule, activeClass);
  };

  return {
    completedLessons: state.completedLessons,
    showVideo,
    setShowVideo,
    handleMarkAsCompleted,
    isLessonCompleted: isLessonCompletedCheck
  };
};
