
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/admin/AdminDashboardSidebar";
import CommandCenterOverview from "@/components/admin/CommandCenterOverview";
import ParticipantManagement from "@/components/admin/ParticipantManagement";
import CurriculumCommandPost from "@/components/admin/CurriculumCommandPost";
import BusinessVentureIntelligence from "@/components/admin/BusinessVentureIntelligence";
import AICoachManagement from "@/components/admin/AICoachManagement";
import CommunicationHeadquarters from "@/components/admin/CommunicationHeadquarters";
import ResourceOperations from "@/components/admin/ResourceOperations";
import ProgramAnalytics from "@/components/admin/ProgramAnalytics";
import AdministrativeFunctions from "@/components/admin/AdministrativeFunctions";
import GraduationTracking from "@/components/admin/GraduationTracking";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("command");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige">
        <AdminDashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <AdminDashboardHeader />
          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="command">
                <CommandCenterOverview />
              </TabsContent>
              <TabsContent value="participants">
                <ParticipantManagement />
              </TabsContent>
              <TabsContent value="curriculum">
                <CurriculumCommandPost />
              </TabsContent>
              <TabsContent value="business">
                <BusinessVentureIntelligence />
              </TabsContent>
              <TabsContent value="ai">
                <AICoachManagement />
              </TabsContent>
              <TabsContent value="communication">
                <CommunicationHeadquarters />
              </TabsContent>
              <TabsContent value="resources">
                <ResourceOperations />
              </TabsContent>
              <TabsContent value="analytics">
                <ProgramAnalytics />
              </TabsContent>
              <TabsContent value="administrative">
                <AdministrativeFunctions />
              </TabsContent>
              <TabsContent value="graduation">
                <GraduationTracking />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
