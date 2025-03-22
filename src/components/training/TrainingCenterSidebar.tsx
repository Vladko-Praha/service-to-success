
import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  BookOpen, 
  CheckCircle, 
  FileText,
  MessageSquare,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trainingData } from "./trainingData";

interface TrainingCenterSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  activeClass: string;
  setActiveClass: (classId: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const TrainingCenterSidebar = ({
  activeSection,
  setActiveSection,
  activeModule,
  setActiveModule,
  activeClass,
  setActiveClass,
  activeTab = "lessons",
  setActiveTab = () => {},
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
      
      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1",
            activeTab === "lessons" 
              ? "border-b-2 border-military-olive text-military-navy" 
              : "text-gray-500 hover:text-military-navy"
          )}
          onClick={() => setActiveTab("lessons")}
        >
          <BookOpen className="h-4 w-4" />
          <span>Lessons</span>
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1",
            activeTab === "assignments" 
              ? "border-b-2 border-military-olive text-military-navy" 
              : "text-gray-500 hover:text-military-navy"
          )}
          onClick={() => setActiveTab("assignments")}
        >
          <FileText className="h-4 w-4" />
          <span>Assignments</span>
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1",
            activeTab === "discussions" 
              ? "border-b-2 border-military-olive text-military-navy" 
              : "text-gray-500 hover:text-military-navy"
          )}
          onClick={() => setActiveTab("discussions")}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Discussions</span>
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1",
            activeTab === "collaborations" 
              ? "border-b-2 border-military-olive text-military-navy" 
              : "text-gray-500 hover:text-military-navy"
          )}
          onClick={() => setActiveTab("collaborations")}
        >
          <Users className="h-4 w-4" />
          <span>Teams</span>
        </button>
      </div>
      
      {activeTab === "lessons" && (
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
      )}
      
      {activeTab === "assignments" && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Module assignments and exercises</p>
          {trainingData.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="font-medium text-sm text-military-navy mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.modules.map((module) => (
                  <button
                    key={module.id}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded text-left text-sm",
                      activeModule === module.id
                        ? "bg-military-olive/20 text-military-navy"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => {
                      setActiveSection(section.id);
                      setActiveModule(module.id);
                      setActiveClass(module.classes[0].id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-military-olive" />
                      <span>{module.title} Assignment</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === "discussions" && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Discuss course topics with peers</p>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-military-olive" />
                <span>Module Discussions</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-military-olive" />
                <span>General Q&A</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-military-olive" />
                <span>Success Stories</span>
              </div>
            </button>
          </div>
        </div>
      )}
      
      {activeTab === "collaborations" && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">Collaborate with other trainees</p>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-military-olive" />
                <span>Business Teams</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-military-olive" />
                <span>Fire Team Alpha</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-2 rounded text-left text-sm hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-military-olive" />
                <span>Create New Team</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCenterSidebar;
