
import { 
  Award, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  FileText, 
  Folder, 
  GraduationCap, 
  Globe, 
  MessageSquare, 
  Settings, 
  Star, 
  Users,
  Mail
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type AdminDashboardSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AdminDashboardSidebar = ({ activeTab, setActiveTab }: AdminDashboardSidebarProps) => {
  const menuItems = [
    {
      id: "command",
      title: "Command Center",
      icon: Star,
    },
    {
      id: "participants",
      title: "Participant Management",
      icon: Users,
    },
    {
      id: "curriculum",
      title: "Curriculum Command",
      icon: BookOpen,
    },
    {
      id: "business",
      title: "Business Intelligence",
      icon: Briefcase,
    },
    {
      id: "ai",
      title: "AI Coach Management",
      icon: Cpu,
    },
    {
      id: "communication",
      title: "Communication HQ",
      icon: MessageSquare,
    },
    {
      id: "email",
      title: "Email Campaign HQ",
      icon: Mail,
    },
    {
      id: "resources",
      title: "Resource Operations",
      icon: Folder,
    },
    {
      id: "analytics",
      title: "Program Analytics",
      icon: BarChart3,
    },
    {
      id: "administrative",
      title: "Admin Functions",
      icon: Settings,
    },
    {
      id: "graduation",
      title: "Graduation Tracking",
      icon: GraduationCap,
    },
  ];
  
  return (
    <Sidebar className="border-r border-military-olive/20 bg-military-navy text-military-sand">
      <SidebarContent>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-military-olive" />
            <h2 className="text-xl font-bold tracking-tight">VETERAN OPS</h2>
          </div>
          <p className="mt-1 text-xs text-military-sand/70">
            Admin Command Center
          </p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>COMMAND CENTER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    className={activeTab === item.id ? "bg-military-olive text-military-sand hover:bg-military-olive/90" : ""}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>QUICK ACTIONS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard" className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Student View</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span>Main Site</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminDashboardSidebar;
