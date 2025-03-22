
import { useState, useEffect } from "react";
import { ChevronDown, BookOpen, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { trainingData } from "./trainingData";

interface TrainingCenterSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  activeClass: string;
  setActiveClass: (classId: string) => void;
}

const TrainingCenterSidebar = ({
  activeSection,
  setActiveSection,
  activeModule,
  setActiveModule,
  activeClass,
  setActiveClass,
}: TrainingCenterSidebarProps) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection]);
  const [expandedModules, setExpandedModules] = useState<string[]>([activeModule]);

  useEffect(() => {
    // Load completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }
  }, []);

  const isLessonCompleted = (sectionId: string, moduleId: string, classId: string) => {
    const lessonId = `${sectionId}-${moduleId}-${classId}`;
    return completedLessons.includes(lessonId);
  };

  const handleSectionClick = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
    setActiveSection(sectionId);
    
    // Select first module and class of section
    const section = trainingData.find(s => s.id === sectionId);
    if (section && section.modules.length > 0) {
      const firstModule = section.modules[0];
      setActiveModule(firstModule.id);
      
      if (firstModule.classes.length > 0) {
        setActiveClass(firstModule.classes[0].id);
      }
    }
  };

  const handleModuleClick = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
    setActiveModule(moduleId);
    
    // Select first class of module
    const section = trainingData.find(s => s.id === activeSection);
    if (section) {
      const module = section.modules.find(m => m.id === moduleId);
      if (module && module.classes.length > 0) {
        setActiveClass(module.classes[0].id);
      }
    }
  };

  const handleClassClick = (classId: string) => {
    setActiveClass(classId);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg text-military-navy">Course Content</h2>
      </div>
      <div className="p-2">
        {trainingData.map((section) => (
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
        ))}
      </div>
    </div>
  );
};

export default TrainingCenterSidebar;
