
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Search, User, X } from "lucide-react";
import { CohortStudent, cohortStudents } from "@/data/cohortStudents";
import UserMention from "./UserMention";

interface CohortStudentSelectorProps {
  onSelectStudent: (student: CohortStudent) => void;
  placeholder?: string;
  selectedStudents?: CohortStudent[];
  className?: string;
}

const CohortStudentSelector: React.FC<CohortStudentSelectorProps> = ({
  onSelectStudent,
  placeholder = "Search students...",
  selectedStudents = [],
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<CohortStudent[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter students based on search term - using dependency on searchTerm and selectedStudents
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([]);
    } else {
      const filtered = cohortStudents.filter(
        (student) =>
          !selectedStudents.some((s) => s.id === student.id) &&
          (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.email &&
              student.email.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, selectedStudents]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectStudent = (student: CohortStudent) => {
    onSelectStudent(student);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pl-8"
        />
      </div>

      {isDropdownOpen && filteredStudents.length > 0 && (
        <div className="absolute z-50 w-full mt-1 border rounded-md shadow-lg bg-white">
          <ScrollArea className="max-h-64" type="auto">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectStudent(student)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} />
                    ) : (
                      <User className="h-3 w-3" />
                    )}
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {student.role} • {student.cohort}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    student.status === "online"
                      ? "bg-green-500"
                      : student.status === "away"
                      ? "bg-amber-500"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default CohortStudentSelector;
