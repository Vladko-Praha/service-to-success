
import React from "react";
import { ChevronDown, BookOpen, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSectionProps {
  section: {
    id: string;
    title: string;
    modules: {
      id: string;
      title: string;
      classes: {
        id: string;
        title: string;
      }[];
    }[];
  };
  activeSection: string;
  activeModule: string;
  activeClass: string;
  expandedSections: string[];
  expandedModules: string[];
  handleSectionClick: (sectionId: string) => void;
  handleModuleClick: (moduleId: string) => void;
  handleClassClick: (classId: string) => void;
  isLessonCompleted: (sectionId: string, moduleId: string, classId: string) => boolean;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  section,
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
    <div key={section.id} className="mb-2">
      <button
        className={cn(
          "w-full flex items-center justify-between p-2 rounded text-left",
          activeSection === section.id
            ? "bg-military-beige text-military-navy font-medium"
            : "hover:bg-gray-100"
        )}
        onClick={() => handleSectionClick(section.id)}
      >
        <span className="truncate">{section.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            expandedSections.includes(section.id) ? "transform rotate-180" : ""
          )}
        />
      </button>
      
      {expandedSections.includes(section.id) && (
        <div className="ml-2 pl-2 border-l border-gray-200 mt-1">
          {section.modules.map((module) => (
            <div key={module.id} className="mb-1">
              <button
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded text-left text-sm",
                  activeModule === module.id && activeSection === section.id
                    ? "bg-military-olive/10 text-military-navy font-medium"
                    : "hover:bg-gray-100"
                )}
                onClick={() => handleModuleClick(module.id)}
              >
                <span className="truncate">{module.title}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedModules.includes(module.id) ? "transform rotate-180" : ""
                  )}
                />
              </button>
              
              {expandedModules.includes(module.id) && (
                <div className="ml-2 pl-2 border-l border-gray-200 mt-1">
                  {module.classes.map((cls) => (
                    <button
                      key={cls.id}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded text-left text-sm",
                        activeClass === cls.id &&
                          activeModule === module.id &&
                          activeSection === section.id
                          ? "bg-military-olive/20 text-military-navy font-medium"
                          : "hover:bg-gray-100"
                      )}
                      onClick={() => handleClassClick(cls.id)}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isLessonCompleted(section.id, module.id, cls.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="truncate">{cls.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
