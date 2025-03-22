
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TrainingCenterSidebar from "@/components/training/TrainingCenterSidebar";
import TrainingContent from "@/components/training/TrainingContent";
import AssignmentContent from "@/components/training/AssignmentContent";
import DiscussionContent from "@/components/training/DiscussionContent";
import CollaborationContent from "@/components/training/CollaborationContent";
import { trainingData } from "@/components/training/trainingData";

const TrainingCenter = () => {
  const [activeSection, setActiveSection] = useState("business-establishment");
  const [activeModule, setActiveModule] = useState("module-1");
  const [activeClass, setActiveClass] = useState("class-1");
  const [activeTab, setActiveTab] = useState("lessons");
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [totalLessonsCount, setTotalLessonsCount] = useState(0);

  useEffect(() => {
    // Calculate total lessons count
    let total = 0;
    trainingData.forEach(section => {
      section.modules.forEach(module => {
        total += module.classes.length;
      });
    });
    setTotalLessonsCount(total);

    // Get completed lessons count from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessonsCount(JSON.parse(savedCompletedLessons).length);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "lessons":
        return (
          <TrainingContent 
            activeSection={activeSection}
            activeModule={activeModule}
            activeClass={activeClass}
            setActiveSection={setActiveSection}
            setActiveModule={setActiveModule}
            setActiveClass={setActiveClass}
          />
        );
      case "assignments":
        return (
          <AssignmentContent
            activeSection={activeSection}
            activeModule={activeModule}
          />
        );
      case "discussions":
        return <DiscussionContent />;
      case "collaborations":
        return <CollaborationContent />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige">
        <TrainingCenterSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          activeClass={activeClass}
          setActiveClass={setActiveClass}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="bg-military-navy p-4 text-white">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-xl font-bold">Training Center</h1>
              <div className="flex items-center gap-4">
                <div className="bg-military-olive/20 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{completedLessonsCount}</span> of <span>{totalLessonsCount}</span> lessons completed
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;
