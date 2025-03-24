
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationCategoryProps {
  id: string;
  icon: LucideIcon;
  label: string;
  count: number;
  activeView: string;
  onClick: (view: string) => void;
}

const NavigationCategory: React.FC<NavigationCategoryProps> = ({
  id,
  icon: Icon,
  label,
  count,
  activeView,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md transition-colors text-left",
        activeView === id
          ? "bg-military-olive/20 text-military-navy font-medium"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        {count}
      </span>
    </button>
  );
};

export default NavigationCategory;
