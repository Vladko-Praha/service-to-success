
import React from "react";
import SidebarCategoryList from "./sidebar/SidebarCategoryList";
import CourseContentList from "./sidebar/CourseContentList";
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

  const counts = getCounts();

  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto hidden md:block h-screen">
      <div className="p-4 border-b border-gray-200 bg-military-olive/5">
        <h2 className="font-semibold text-lg text-military-navy">Training Center</h2>
      </div>
      
      <SidebarCategoryList 
        activeView={activeView} 
        handleViewChange={handleViewChange}
        counts={counts}
      />
      
      {activeView === "lessons" ? (
        <CourseContentList 
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
      ) : (
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
