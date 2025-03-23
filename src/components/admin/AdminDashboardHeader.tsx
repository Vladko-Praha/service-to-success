
import React from "react";
import { Bell, Mail, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminDashboardHeaderProps = {
  onAction?: (actionName: string) => void;
};

const AdminDashboardHeader = ({ onAction = () => {} }: AdminDashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-military-olive/20 bg-military-beige px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:w-64">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-white/80"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => onAction("Opened knowledge base")}
          >
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => onAction("Checked notifications")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-military-red text-[10px] font-medium text-white">
              3
            </span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => onAction("Checked messages")}
          >
            <Mail className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-military-olive text-[10px] font-medium text-white">
              5
            </span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs text-muted-foreground">Program Director</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
