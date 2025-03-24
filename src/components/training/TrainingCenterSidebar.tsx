
import React from "react";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  Folder,
  FileQuestion,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trainingData } from "./trainingData";
import NavigationCategory from "./sidebar/NavigationCategory";
import CourseSection from "./sidebar/CourseSection";
import ContentPlaceholder from "./sidebar/ContentPlaceholder";
import { useTrainingNavigation } from "@/hooks/use-training-navigation";

const TrainingCenterSidebar = () => {
  const {
    activeSection,
    activeModule,
    activeClass,
    activeView,
    expandedSections,
    expandedModules,
    handleSectionClick,
    handleModuleClick,
    handleClassClick,
    handleViewChange,
    isLessonCompleted,
    getCounts
  } = useTrainingNavigation();

  const navigationCategories = [
    { id: "lessons", icon: BookOpen, label: "Modules" },
    { id: "assignments", icon: ClipboardList, label: "Assignments" },
    { id: "discussions", icon: MessageSquare, label: "Discussions" },
    { id: "quizzes", icon: FileQuestion, label: "Quizzes" },
    { id: "files", icon: Folder, label: "Files" },
    { id: "collaborations", icon: Users, label: "Collaborations" }
  ];
  
  const counts = getCounts();

  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto hidden md:block h-screen">
      <div className="p-4 border-b border-gray-200 bg-military-olive/5">
        <h2 className="font-semibold text-lg text-military-navy">Training Center</h2>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="flex flex-col p-2 gap-1">
          {navigationCategories.map((category) => (
            <NavigationCategory
              key={category.id}
              id={category.id}
              icon={category.icon}
              label={category.label}
              count={counts[category.id as keyof typeof counts] || 0}
              activeView={activeView}
              onClick={handleViewChange}
            />
          ))}
        </div>
      </div>
      
      {activeView === "lessons" && (
        <div className="p-2">
          <div className="p-2 text-sm font-medium text-gray-500 uppercase">Course Content</div>
          {trainingData.map((section) => (
            <CourseSection
              key={section.id}
              section={section}
              activeSection={activeSection}
              activeModule={activeModule}
              activeClass={activeClass}
              expandedSections={expandedSections}
              expandedModules={expandedModules}
              handleSectionClick={handleSectionClick}
              handleModuleClick={handleModuleClick}
              handleClassClick={handleClassClick}
              isLessonCompleted={isLessonCompleted}
            />
          ))}
        </div>
      )}
      
      {activeView !== "lessons" && (
        <div className="p-4">
          <div className="text-sm font-medium mb-4 text-gray-700">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </div>
          <ContentPlaceholder activeView={activeView} />
        </div>
      )}
    </div>
  );
};

export default TrainingCenterSidebar;
