
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
import EmailCampaignHQ from "@/components/admin/EmailCampaignHQ";
import ResourceOperations from "@/components/admin/ResourceOperations";
import ProgramAnalytics from "@/components/admin/ProgramAnalytics";
import AdministrativeFunctions from "@/components/admin/AdministrativeFunctions";
import GraduationTracking from "@/components/admin/GraduationTracking";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("command");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle navigation to other pages
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Handle actions that require feedback to the user
  const handleAction = (actionName: string) => {
    toast({
      title: "Action triggered",
      description: `The '${actionName}' action was triggered successfully.`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige">
        <AdminDashboardSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onNavigate={handleNavigation}
          onAction={handleAction}
        />
        <div className="flex-1 flex flex-col">
          <AdminDashboardHeader onAction={handleAction} />
          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="command">
                <CommandCenterOverview onAction={handleAction} />
              </TabsContent>
              <TabsContent value="participants">
                <ParticipantManagement />
              </TabsContent>
              <TabsContent value="curriculum">
                <CurriculumCommandPost onAction={handleAction} />
              </TabsContent>
              <TabsContent value="business">
                <BusinessVentureIntelligence onAction={handleAction} />
              </TabsContent>
              <TabsContent value="ai">
                <AICoachManagement onAction={handleAction} />
              </TabsContent>
              <TabsContent value="communication">
                <CommunicationHeadquarters onAction={handleAction} />
              </TabsContent>
              <TabsContent value="email">
                <EmailCampaignHQ onAction={handleAction} />
              </TabsContent>
              <TabsContent value="resources">
                <ResourceOperations onAction={handleAction} />
              </TabsContent>
              <TabsContent value="analytics">
                <ProgramAnalytics onAction={handleAction} />
              </TabsContent>
              <TabsContent value="administrative">
                <AdministrativeFunctions onAction={handleAction} />
              </TabsContent>
              <TabsContent value="graduation">
                <GraduationTracking onAction={handleAction} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
