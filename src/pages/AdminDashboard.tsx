
import { useState, useEffect } from "react";
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

  // Single initial check for registration, without repeating or setting up intervals
  useEffect(() => {
    // Check once if there's any new user registration
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      console.log("Admin dashboard detected user info in localStorage on initial load");
      // We'll handle the actual user addition in the ParticipantManagement component
    }
  }, []);

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
              <TabsContent value="email">
                <EmailCampaignHQ />
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
