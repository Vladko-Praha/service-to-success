
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TrainingCenterSidebar from "@/components/training/TrainingCenterSidebar";
import TrainingContent from "@/components/training/TrainingContent";

const TrainingCenter = () => {
  const [activeSection, setActiveSection] = useState("business-establishment");
  const [activeModule, setActiveModule] = useState("module-1");
  const [activeClass, setActiveClass] = useState("class-1");

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
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <TrainingContent 
              activeSection={activeSection}
              activeModule={activeModule}
              activeClass={activeClass}
              setActiveSection={setActiveSection}
              setActiveModule={setActiveModule}
              setActiveClass={setActiveClass}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;
