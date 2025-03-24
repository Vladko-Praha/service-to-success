
import { useState, useEffect } from "react";
import { trainingData } from "@/components/training/trainingData";
import { useTraining } from "@/context/TrainingContext";

export const useTrainingNavigation = () => {
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

  return {
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
  };
};
