
import { 
  Award, 
  Briefcase, 
  Compass, 
  FileText, 
  Flag, 
  Globe, 
  HeartHandshake, 
  Shield, 
  Target, 
  Users 
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

type DashboardSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  const menuItems = [
    {
      id: "progress",
      title: "Mission Progress",
      icon: Flag,
    },
    {
      id: "deployment",
      title: "Business Deployment",
      icon: Briefcase,
    },
    {
      id: "target",
      title: "Target Acquisition",
      icon: Target,
    },
    {
      id: "operations",
      title: "Operations Monitoring",
      icon: Compass,
    },
    {
      id: "intelligence",
      title: "Intel Repository",
      icon: FileText,
    },
    {
      id: "ai",
      title: "AI Battle Buddy",
      icon: Shield,
    },
    {
      id: "fireteam",
      title: "Fire Team Network",
      icon: Users,
    },
    {
      id: "civilian",
      title: "Civilian Integration",
      icon: HeartHandshake,
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
            Business Deployment Platform
          </p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>MISSION CENTER</SidebarGroupLabel>
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
          <SidebarGroupLabel>QUICK LINKS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span>Resources</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Veteran Network</span>
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

export default DashboardSidebar;
