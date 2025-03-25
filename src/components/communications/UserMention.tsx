
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserMentionProps {
  userId: string;
  name: string;
  status?: "online" | "offline" | "away";
  avatar?: string;
  role?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const UserMention: React.FC<UserMentionProps> = ({ 
  userId, 
  name, 
  status = "offline", 
  avatar, 
  role,
  clickable = true,
  onClick 
}) => {
  // Status indicator color
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-500"
  }[status];

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            className={`inline-flex items-center rounded-full bg-military-navy/10 px-2 py-0.5 text-sm font-medium text-military-navy hover:bg-military-navy/20 ${clickable ? 'cursor-pointer' : ''}`}
            onClick={handleClick}
            data-user-id={userId}
          >
            <span className="relative flex items-center">
              {avatar ? (
                <Avatar className="h-4 w-4 mr-1">
                  <img src={avatar} alt={name} />
                </Avatar>
              ) : (
                <User className="h-3 w-3 mr-1" />
              )}
              {status && (
                <span className={`absolute -bottom-0.5 -right-0.5 block h-1.5 w-1.5 rounded-full ${statusColor} ring-1 ring-white`}></span>
              )}
            </span>
            <span className="ml-1">@{name.split(' ')[0]}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            {role && <span className="text-xs text-gray-500">{role}</span>}
            <span className="text-xs flex items-center mt-1">
              <span className={`inline-block h-2 w-2 rounded-full ${statusColor} mr-1`}></span>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserMention;
