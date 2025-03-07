
import { Bell, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AdminDashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-military-olive/20 bg-military-sand p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold text-military-navy">ADMIN COMMAND CENTER</h1>
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
                <span className="text-military-olive font-semibold">5 participants require intervention</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Cohort #7 graduation approaching</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>New resource approvals pending</span>
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
              <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
              <DropdownMenuItem>System Configuration</DropdownMenuItem>
              <DropdownMenuItem>User Permissions</DropdownMenuItem>
              <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
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
                <span className="text-sm font-semibold text-military-navy">COL Anderson</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>COL James Anderson</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Program Administrator</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
              <DropdownMenuItem>Admin Tools</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
