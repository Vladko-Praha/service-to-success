
// Mock data for cohort students
export interface CohortStudent {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  cohort: string;
  role: string;
  email?: string;
}

export const cohortStudents: CohortStudent[] = [
  {
    id: "student1",
    name: "John Smith",
    status: "online",
    cohort: "Cohort A",
    role: "Student",
    email: "jsmith@example.mil"
  },
  {
    id: "student2",
    name: "Maria Rodriguez",
    status: "online",
    cohort: "Cohort A",
    role: "Student",
    email: "mrodriguez@example.mil"
  },
  {
    id: "student3",
    name: "David Johnson",
    status: "away",
    cohort: "Cohort A",
    role: "Student",
    email: "djohnson@example.mil"
  },
  {
    id: "student4",
    name: "Sarah Williams",
    status: "offline",
    cohort: "Cohort B",
    role: "Student",
    email: "swilliams@example.mil"
  },
  {
    id: "student5",
    name: "Michael Chen",
    status: "online",
    cohort: "Cohort B",
    role: "Student",
    email: "mchen@example.mil"
  },
  {
    id: "mentor1",
    name: "Captain Jessica Martinez",
    status: "online",
    cohort: "Mentors",
    role: "Mentor",
    email: "jmartinez@example.mil"
  },
  {
    id: "admin1",
    name: "Major Robert Wilson",
    status: "away",
    cohort: "Program Admin",
    role: "Administrator",
    email: "rwilson@example.mil"
  }
];

// Function to get students by cohort
export const getStudentsByCohort = (cohortName: string) => {
  return cohortStudents.filter(student => student.cohort === cohortName);
};

// Function to get all cohorts
export const getCohorts = (): string[] => {
  const cohorts = new Set(cohortStudents.map(student => student.cohort));
  return Array.from(cohorts);
};

// Function to search students by name or email
export const searchStudents = (query: string): CohortStudent[] => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return cohortStudents.filter(student => 
    student.name.toLowerCase().includes(lowerQuery) || 
    (student.email && student.email.toLowerCase().includes(lowerQuery))
  );
};
