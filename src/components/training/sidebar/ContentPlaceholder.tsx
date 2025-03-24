
import React from "react";
import { FileQuestion, MessageSquare, FileText, Users, ClipboardList } from "lucide-react";

interface ContentPlaceholderProps {
  activeView: string;
}

const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({ activeView }) => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div 
          key={item} 
          className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {activeView === "assignments" && <ClipboardList className="h-4 w-4 text-blue-500" />}
            {activeView === "discussions" && <MessageSquare className="h-4 w-4 text-indigo-500" />}
            {activeView === "quizzes" && <FileQuestion className="h-4 w-4 text-orange-500" />}
            {activeView === "files" && <FileText className="h-4 w-4 text-green-500" />}
            {activeView === "collaborations" && <Users className="h-4 w-4 text-purple-500" />}
            <span className="text-sm font-medium">
              {activeView.slice(0, -1).charAt(0).toUpperCase() + activeView.slice(0, -1).slice(1)} {item}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {activeView === "assignments" && "Due date: In 7 days"}
            {activeView === "discussions" && "3 replies"}
            {activeView === "quizzes" && "10 questions · 15 minutes"}
            {activeView === "files" && "PDF · 2.3 MB"}
            {activeView === "collaborations" && "5 participants"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContentPlaceholder;
