
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
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback values for demo mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("command");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    // Check Supabase connection
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('ai_messages').select('count');
        
        if (error) {
          console.error("Supabase connection error:", error);
          toast({
            title: "Supabase Connection Issue",
            description: "Unable to connect to the database. Some features may be limited.",
            variant: "destructive"
          });
        } else {
          setIsSupabaseConnected(true);
          toast({
            title: "Supabase Connected",
            description: "Connected to the database successfully.",
          });
          
          // Check if the user is authenticated
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            // We have a logged-in user, let's make sure they're in the participants table
            const { data: existingParticipant } = await supabase
              .from('participants')
              .select('*')
              .eq('email', sessionData.session.user.email)
              .maybeSingle();
            
            if (!existingParticipant) {
              // If the user isn't in participants table yet, add them
              await createParticipantFromUser(sessionData.session.user);
            }
          }
        }
      } catch (error) {
        console.error("Database check error:", error);
        toast({
          title: "Database Connection Error",
          description: "Unable to communicate with the database. Some features may be limited.",
          variant: "destructive"
        });
      }
    };
    
    // Helper function to create a participant record from auth user
    const createParticipantFromUser = async (user) => {
      try {
        // Get existing participant count for ID generation
        const { data: participantCount } = await supabase
          .from('participants')
          .select('count');
        
        const count = participantCount?.[0]?.count || 0;
        const newId = `P-${String(count + 1).padStart(3, '0')}`;
        
        // Create new participant from user data
        const newParticipant = {
          id: newId,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'New User',
          email: user.email || '',
          phone: user.user_metadata?.phone || "(Not provided)",
          cohort: "Cohort #8",
          progress: 0,
          lastActive: "Just registered",
          status: "On Track",
          businessType: user.user_metadata?.businessGoals || "(Not specified)",
          risk: "low",
          location: user.user_metadata?.militaryBranch ? `${user.user_metadata.militaryBranch} veteran` : "(Not provided)",
          joinDate: new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          expectedGraduation: "TBD",
          badges: [],
          skills: user.user_metadata?.skillsets ? [user.user_metadata.skillsets] : [],
          goals: user.user_metadata?.businessGoals ? [user.user_metadata.businessGoals] : [],
          reasonToJoin: user.user_metadata?.heardFrom ? `Referred from: ${user.user_metadata.heardFrom}` : "New registration",
          mentorName: "Not assigned",
          mentorNotes: "",
          assignments: []
        };
        
        // Add to Supabase
        const { error } = await supabase
          .from('participants')
          .insert(newParticipant);
        
        if (error) {
          console.error("Error adding participant:", error);
        } else {
          toast({
            title: "New Participant Added",
            description: `${newParticipant.name} has been added to the participants list.`,
          });
        }
      } catch (error) {
        console.error("Error creating participant from user:", error);
      }
    };
    
    checkSupabaseConnection();
  }, [toast]);

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
                <ParticipantManagement supabase={supabase} />
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
