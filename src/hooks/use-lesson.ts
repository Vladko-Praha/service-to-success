
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseLessonProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
}

export const useLesson = ({ activeSection, activeModule, activeClass }: UseLessonProps) => {
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
        description: `"${activeClass}" has been removed from your completed lessons.`
      });
    } else {
      updatedCompletedLessons = [...completedLessons, lessonKey];
      toast({
        title: "Lesson completed! 🎉",
        description: `"${activeClass}" has been marked as completed.`
      });
    }

    setCompletedLessons(updatedCompletedLessons);
    localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
  };

  const isLessonCompleted = () => {
    const lessonKey = `${activeSection}-${activeModule}-${activeClass}`;
    return completedLessons.includes(lessonKey);
  };

  return {
    completedLessons,
    showVideo,
    setShowVideo,
    handleMarkAsCompleted,
    isLessonCompleted
  };
};
