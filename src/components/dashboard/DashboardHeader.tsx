
import { Bell, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  email: string;
  rank?: string;
  isLoggedIn: boolean;
}

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({ 
    name: "CPT Smith", 
    email: "default@example.com",
    isLoggedIn: false
  });

  useEffect(() => {
    // Get user info from localStorage on component mount
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleSignOut = () => {
    // Clear user info from localStorage
    localStorage.removeItem('userInfo');
    
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    
    // Redirect to home page
    navigate("/");
  };

  return (
    <header className="border-b border-military-olive/20 bg-military-sand p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold text-military-navy">COMBAT BUSINESS COMMAND CENTER</h1>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-military-navy/10">
                <Bell className="h-5 w-5 text-military-navy" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuItem>
                <span className="text-military-olive font-semibold">New mission briefing available</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Your latest operation report is ready</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Command feedback on your business plan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2 hover:bg-military-navy/10">
                <Settings className="h-5 w-5 text-military-navy" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full py-1 px-3 hover:bg-military-navy/10">
                <div className="h-8 w-8 rounded-full bg-military-navy flex items-center justify-center">
                  <User className="h-5 w-5 text-military-sand" />
                </div>
                <span className="text-sm font-semibold text-military-navy">{userInfo.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userInfo.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal text-xs text-gray-500">{userInfo.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Missions</DropdownMenuItem>
              <DropdownMenuItem>My Resources</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
