
import React from "react";
import CourseSection from "./CourseSection";
import { trainingData } from "../trainingData";

interface CourseContentListProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  expandedSections: string[];
  expandedModules: string[];
  handleSectionClick: (sectionId: string) => void;
  handleModuleClick: (moduleId: string) => void;
  handleClassClick: (classId: string) => void;
  isLessonCompleted: (section: string, module: string, classId: string) => boolean;
}

const CourseContentList: React.FC<CourseContentListProps> = ({
  activeSection,
  activeModule,
  activeClass,
  expandedSections,
  expandedModules,
  handleSectionClick,
  handleModuleClick,
  handleClassClick,
  isLessonCompleted
}) => {
  return (
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
  );
};

export default CourseContentList;
