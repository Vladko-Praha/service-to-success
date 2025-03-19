
import { 
  Award, 
  Briefcase, 
  Compass, 
  FileText, 
  Flag, 
  Globe, 
  GraduationCap,
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
import { Link } from "react-router-dom";

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
    <Sidebar className="border-r border-military-olive/20 bg-white text-black">
      <SidebarContent>
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-military-olive" />
            <h2 className="text-xl font-bold tracking-tight">VETERAN OPS</h2>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Business Deployment Platform
          </p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700">MISSION CENTER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    className={activeTab === item.id ? "bg-military-olive text-military-sand hover:bg-military-olive/90" : "text-black hover:bg-gray-100"}
                  >
                    <item.icon className={`h-5 w-5 ${activeTab === item.id ? "" : "text-gray-700"}`} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-gray-700">TRAINING CENTER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/training" className="flex items-center gap-2 text-black hover:bg-gray-100">
                    <GraduationCap className="h-5 w-5 text-gray-700" />
                    <span>Training Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-gray-700">QUICK LINKS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2 text-black hover:bg-gray-100">
                    <Globe className="h-5 w-5 text-gray-700" />
                    <span>Resources</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2 text-black hover:bg-gray-100">
                    <Users className="h-5 w-5 text-gray-700" />
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
