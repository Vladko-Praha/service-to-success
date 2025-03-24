import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  Folder,
  GraduationCap,
  ClipboardList,
  Users,
  FileQuestion
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trainingData } from "./trainingData";
import { useTraining } from "@/context/TrainingContext";

const TrainingCenterSidebar = () => {
  const { 
    state, 
    isLessonCompleted, 
    setActiveSection, 
    setActiveModule, 
    setActiveClass, 
    setActiveView 
  } = useTraining();
  
  const { activeSection, activeModule, activeClass, activeView } = state;
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection]);
  const [expandedModules, setExpandedModules] = useState<string[]>([activeModule]);

  useEffect(() => {
    if (!expandedSections.includes(activeSection)) {
      setExpandedSections([...expandedSections, activeSection]);
    }
    if (!expandedModules.includes(activeModule)) {
      setExpandedModules([...expandedModules, activeModule]);
    }
  }, [activeSection, activeModule]);

  const handleSectionClick = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
    setActiveSection(sectionId);
    
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
    setActiveView("lessons");
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const navigationCategories = [
    { id: "lessons", icon: BookOpen, label: "Modules" },
    { id: "assignments", icon: ClipboardList, label: "Assignments" },
    { id: "discussions", icon: MessageSquare, label: "Discussions" },
    { id: "quizzes", icon: FileQuestion, label: "Quizzes" },
    { id: "files", icon: Folder, label: "Files" },
    { id: "collaborations", icon: Users, label: "Collaborations" }
  ];

  const getCounts = () => {
    return {
      modules: trainingData.reduce((acc, section) => acc + section.modules.length, 0),
      lessons: trainingData.reduce((acc, section) => 
        acc + section.modules.reduce((sum, module) => sum + module.classes.length, 0), 0),
      assignments: 8,
      discussions: 3,
      quizzes: 5,
      files: 12,
      collaborations: 4
    };
  };
  
  const counts = getCounts();

  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto hidden md:block h-screen">
      <div className="p-4 border-b border-gray-200 bg-military-olive/5">
        <h2 className="font-semibold text-lg text-military-navy">Training Center</h2>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="flex flex-col p-2 gap-1">
          {navigationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleViewChange(category.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-colors text-left",
                activeView === category.id
                  ? "bg-military-olive/20 text-military-navy font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
              <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {counts[category.id as keyof typeof counts] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {activeView === "lessons" && (
        <div className="p-2">
          <div className="p-2 text-sm font-medium text-gray-500 uppercase">Course Content</div>
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
      
      {activeView !== "lessons" && (
        <div className="p-4">
          <div className="text-sm font-medium mb-4 text-gray-700">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item} 
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {activeView === "assignments" && <ClipboardList className="h-4 w-4 text-blue-500" />}
                  {activeView === "discussions" && <MessageSquare className="h-4 w-4 text-indigo-500" />}
                  {activeView === "quizzes" && <FileQuestion className="h-4 w-4 text-orange-500" />}
                  {activeView === "files" && <FileText className="h-4 w-4 text-green-500" />}
                  {activeView === "collaborations" && <Users className="h-4 w-4 text-purple-500" />}
                  <span className="text-sm font-medium">
                    {activeView.slice(0, -1).charAt(0).toUpperCase() + activeView.slice(0, -1).slice(1)} {item}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {activeView === "assignments" && "Due date: In 7 days"}
                  {activeView === "discussions" && "3 replies"}
                  {activeView === "quizzes" && "10 questions · 15 minutes"}
                  {activeView === "files" && "PDF · 2.3 MB"}
                  {activeView === "collaborations" && "5 participants"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCenterSidebar;
