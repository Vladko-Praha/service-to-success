
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LessonContent from "./LessonContent";
import AssignmentSubmission from "./AssignmentSubmission";
import { trainingData } from "../trainingData";

interface TrainingContentProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  activeView: string;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
}

const TrainingContent: React.FC<TrainingContentProps> = ({
  activeSection,
  activeModule,
  activeClass,
  activeView,
  setActiveSection,
  setActiveModule,
  setActiveClass
}) => {
  // Find current section, module and class data
  const currentSection = trainingData.find(section => section.id === activeSection);
  const currentModule = currentSection?.modules.find(module => module.id === activeModule);
  const currentClass = currentModule?.classes.find(cls => cls.id === activeClass);
  
  if (!currentSection || !currentModule || !currentClass) {
    return <div className="p-4">Lesson not found</div>;
  }

  const renderContent = () => {
    switch (activeView) {
      case "lessons":
        return <LessonContent 
          currentClass={currentClass} 
          activeSection={activeSection}
          activeModule={activeModule}
          activeClass={activeClass}
        />;
      case "assignments":
        return <AssignmentSubmission currentClass={currentClass} />;
      case "quizzes":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Quiz: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "discussions":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Discussion Forum: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "files":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Resource Files: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      case "collaborations":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Collaborations: {currentClass.title}</h1>
            <p>This feature is coming soon.</p>
          </div>
        );
      default:
        return <p>Select a view from the sidebar.</p>;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingContent;
