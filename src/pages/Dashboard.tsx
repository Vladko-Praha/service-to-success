
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissionProgressTracker from "@/components/dashboard/MissionProgressTracker";
import BusinessDeploymentCenter from "@/components/dashboard/BusinessDeploymentCenter";
import TargetAcquisitionHub from "@/components/dashboard/TargetAcquisitionHub";
import OperationsMonitoringStation from "@/components/dashboard/OperationsMonitoringStation";
import IntelligenceRepository from "@/components/dashboard/IntelligenceRepository";
import AIBattleBuddySystem from "@/components/dashboard/AIBattleBuddySystem";
import FireTeamNetwork from "@/components/dashboard/FireTeamNetwork";
import CivilianIntegrationSupport from "@/components/dashboard/CivilianIntegrationSupport";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardCommunications from "@/components/dashboard/DashboardCommunications";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("progress");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="progress">
                <MissionProgressTracker />
              </TabsContent>
              <TabsContent value="deployment">
                <BusinessDeploymentCenter />
              </TabsContent>
              <TabsContent value="target">
                <TargetAcquisitionHub />
              </TabsContent>
              <TabsContent value="operations">
                <OperationsMonitoringStation />
              </TabsContent>
              <TabsContent value="intelligence">
                <IntelligenceRepository />
              </TabsContent>
              <TabsContent value="ai">
                <AIBattleBuddySystem />
              </TabsContent>
              <TabsContent value="communications">
                <DashboardCommunications />
              </TabsContent>
              <TabsContent value="fireteam">
                <FireTeamNetwork />
              </TabsContent>
              <TabsContent value="civilian">
                <CivilianIntegrationSupport />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
