
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

// Initialize Supabase client
// In a real environment, these values would come from environment variables
// For the demo, we're using a fallback to a public demo database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nrgwihmgmkmzobjlosrd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dpaG1nbWttbW9iam9sc3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1NTgwNzcsImV4cCI6MjAxNTEzNDA3N30.fgSWYn6f5D52Jm8oDSHr5R-5I5xyEaWGJE42XP248VY';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize local storage for participants if Supabase is unavailable
const initLocalStorage = () => {
  const storedParticipants = localStorage.getItem('participants');
  if (!storedParticipants) {
    const initialParticipants = [
      {
        id: "P-001",
        name: "SSG Michael Johnson",
        email: "michael.johnson@military.com",
        phone: "(555) 123-4567",
        cohort: "Cohort #8",
        progress: 78,
        lastActive: "2 hours ago",
        status: "On Track",
        businessType: "Cybersecurity Consulting",
        risk: "low",
        location: "Fort Bragg, NC",
        joinDate: "Jan 15, 2023",
        expectedGraduation: "Dec 15, 2023",
        badges: ["Leadership", "Technical Excellence", "Teamwork"],
        skills: ["Cybersecurity", "Network Analysis", "Risk Assessment", "Project Management"],
        goals: ["Launch security consulting firm", "Obtain CISSP certification", "Develop client acquisition strategy"],
        reasonToJoin: "Transitioning after 12 years of service, looking to leverage military cybersecurity experience in civilian sector",
        mentorName: "Col. Robert Stevens (Ret.)",
        mentorNotes: "Michael shows strong aptitude for technical security concepts. Needs to develop business acumen.",
        assignments: [
          { name: "Business Plan Draft", status: "Completed", grade: "A" },
          { name: "Market Analysis", status: "In Progress", grade: null },
          { name: "Financial Projections", status: "Not Started", grade: null }
        ]
      },
      {
        id: "P-002",
        name: "CPT Sarah Williams",
        email: "sarah.williams@military.com",
        phone: "(555) 234-5678",
        cohort: "Cohort #8",
        progress: 92,
        lastActive: "1 day ago",
        status: "Exceeding",
        businessType: "Fitness Training",
        risk: "low",
        location: "Joint Base Lewis-McChord, WA",
        joinDate: "Jan 15, 2023",
        expectedGraduation: "Dec 15, 2023",
        badges: ["Innovation", "Leadership", "Peer Support", "Excellence"],
        skills: ["Personal Training", "Nutrition Planning", "Business Development", "Digital Marketing"],
        goals: ["Open fitness studio", "Develop online coaching program", "Create military-to-civilian transition fitness program"],
        reasonToJoin: "Passionate about fitness and helping veterans maintain physical and mental wellness after service",
        mentorName: "Maj. Lisa Thompson (Ret.)",
        mentorNotes: "Sarah is exceptionally motivated and organized. Already has several potential clients lined up.",
        assignments: [
          { name: "Business Plan Draft", status: "Completed", grade: "A+" },
          { name: "Market Analysis", status: "Completed", grade: "A" },
          { name: "Financial Projections", status: "Completed", grade: "A-" }
        ]
      },
    ];
    localStorage.setItem('participants', JSON.stringify(initialParticipants));
  }
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("command");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    // Initialize local storage as fallback
    initLocalStorage();
    
    // Check Supabase connection
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('participants').select('count');
        
        if (error) {
          console.error("Supabase connection error:", error);
          setIsSupabaseConnected(false);
          toast({
            title: "Using Local Storage Mode",
            description: "Database connection unavailable. Using local storage instead.",
            variant: "destructive"
          });
        } else {
          setIsSupabaseConnected(true);
          toast({
            title: "Database Connected",
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
        setIsSupabaseConnected(false);
        toast({
          title: "Using Local Storage Mode",
          description: "Database connection unavailable. Using local storage instead.",
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
          
          // Fallback to local storage
          const storedParticipants = JSON.parse(localStorage.getItem('participants') || '[]');
          storedParticipants.push(newParticipant);
          localStorage.setItem('participants', JSON.stringify(storedParticipants));
          
          toast({
            title: "New Participant Added (Local Storage)",
            description: `${newParticipant.name} has been added to the local participants list.`,
          });
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
                <ParticipantManagement supabase={supabase} isSupabaseConnected={isSupabaseConnected} />
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
