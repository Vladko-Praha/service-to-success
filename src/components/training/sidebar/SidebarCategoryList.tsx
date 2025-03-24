
import React from "react";
import NavigationCategory from "./NavigationCategory";
import { BookOpen, ClipboardList, MessageSquare, Folder, FileQuestion, Users } from "lucide-react";

interface SidebarCategoryListProps {
  activeView: string;
  handleViewChange: (view: string) => void;
  counts: Record<string, number>;
}

const SidebarCategoryList: React.FC<SidebarCategoryListProps> = ({ 
  activeView, 
  handleViewChange,
  counts
}) => {
  const navigationCategories = [
    { id: "lessons", icon: BookOpen, label: "Modules" },
    { id: "assignments", icon: ClipboardList, label: "Assignments" },
    { id: "discussions", icon: MessageSquare, label: "Discussions" },
    { id: "quizzes", icon: FileQuestion, label: "Quizzes" },
    { id: "files", icon: Folder, label: "Files" },
    { id: "collaborations", icon: Users, label: "Collaborations" }
  ];
  
  return (
    <div className="border-b border-gray-200">
      <div className="flex flex-col p-2 gap-1">
        {navigationCategories.map((category) => (
          <NavigationCategory
            key={category.id}
            id={category.id}
            icon={category.icon}
            label={category.label}
            count={counts[category.id as keyof typeof counts] || 0}
            activeView={activeView}
            onClick={handleViewChange}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarCategoryList;
