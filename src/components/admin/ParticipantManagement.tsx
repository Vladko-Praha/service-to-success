import React, { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronDown, Mail, MapPin, Award, GraduationCap, Target, Briefcase, BadgeCheck, User, Phone, Calendar, FileText, MessageSquare, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserInfo {
  name: string;
  email: string;
  phone?: string;
  militaryBranch?: string;
  yearsOfService?: string;
  skillsets?: string;
  businessGoals?: string;
  timeCommitment?: string;
  investmentReady?: boolean;
  heardFrom?: string;
  rank?: string;
  twoFactorEnabled?: boolean;
  isLoggedIn?: boolean;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  cohort: string;
  progress: number;
  lastActive: string;
  status: string;
  businessType: string;
  risk: string;
  location: string;
  joinDate: string;
  expectedGraduation: string;
  badges: string[];
  skills: string[];
  goals: string[];
  reasonToJoin: string;
  mentorName: string;
  mentorNotes: string;
  assignments: {
    name: string;
    status: string;
    grade: string | null;
  }[];
}

interface ParticipantManagementProps {
  supabase: SupabaseClient;
}

const ParticipantManagement = ({ supabase }: ParticipantManagementProps) => {
  const { toast } = useToast();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddParticipantDialogOpen, setIsAddParticipantDialogOpen] = useState(false);
  const [isClearParticipantsDialogOpen, setIsClearParticipantsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Fetch participants from Supabase on component mount
  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    setIsLoading(true);
    try {
      // Check for an authenticated user first
      const { data: session } = await supabase.auth.getSession();
      const currentUser = session?.session?.user;
      
      // Get participants from the "participants" table in Supabase
      const { data, error } = await supabase
        .from('participants')
        .select('*');

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setParticipants(data as Participant[]);
      } else {
        // If no data in Supabase yet, load initial example data
        const initialParticipants = [
          {
            id: "P-001",
            name: "SSG Michael Johnson",
            email: "michael.johnson@military.com",
            phone: "(555) 123-4567",
            cohort: "Cohort #8",
            progress: 78,
            lastActive: "2 hours ago",
            status: "On Track",
            businessType: "Cybersecurity Consulting",
            risk: "low",
            location: "Fort Bragg, NC",
            joinDate: "Jan 15, 2023",
            expectedGraduation: "Dec 15, 2023",
            badges: ["Leadership", "Technical Excellence", "Teamwork"],
            skills: ["Cybersecurity", "Network Analysis", "Risk Assessment", "Project Management"],
            goals: ["Launch security consulting firm", "Obtain CISSP certification", "Develop client acquisition strategy"],
            reasonToJoin: "Transitioning after 12 years of service, looking to leverage military cybersecurity experience in civilian sector",
            mentorName: "Col. Robert Stevens (Ret.)",
            mentorNotes: "Michael shows strong aptitude for technical security concepts. Needs to develop business acumen.",
            assignments: [
              { name: "Business Plan Draft", status: "Completed", grade: "A" },
              { name: "Market Analysis", status: "In Progress", grade: null },
              { name: "Financial Projections", status: "Not Started", grade: null }
            ]
          },
          {
            id: "P-002",
            name: "CPT Sarah Williams",
            email: "sarah.williams@military.com",
            phone: "(555) 234-5678",
            cohort: "Cohort #8",
            progress: 92,
            lastActive: "1 day ago",
            status: "Exceeding",
            businessType: "Fitness Training",
            risk: "low",
            location: "Joint Base Lewis-McChord, WA",
            joinDate: "Jan 15, 2023",
            expectedGraduation: "Dec 15, 2023",
            badges: ["Innovation", "Leadership", "Peer Support", "Excellence"],
            skills: ["Personal Training", "Nutrition Planning", "Business Development", "Digital Marketing"],
            goals: ["Open fitness studio", "Develop online coaching program", "Create military-to-civilian transition fitness program"],
            reasonToJoin: "Passionate about fitness and helping veterans maintain physical and mental wellness after service",
            mentorName: "Maj. Lisa Thompson (Ret.)",
            mentorNotes: "Sarah is exceptionally motivated and organized. Already has several potential clients lined up.",
            assignments: [
              { name: "Business Plan Draft", status: "Completed", grade: "A+" },
              { name: "Market Analysis", status: "Completed", grade: "A" },
              { name: "Financial Projections", status: "Completed", grade: "A-" }
            ]
          },
        ];
        
        setParticipants(initialParticipants);
        
        // Populate Supabase with the initial example data
        for (const participant of initialParticipants) {
          await supabase.from('participants').insert(participant);
        }
      }
      
      // Add current authenticated user if they're not already in the database
      if (currentUser && !data?.some(p => p.email === currentUser.email)) {
        console.log("Current authenticated user not found in participants, will be added:", currentUser.email);
        
        // Create a participant record for this user
        await addCurrentUserToParticipants(currentUser);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
      toast({
        title: "Error",
        description: "Failed to fetch participants data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to add the current authenticated user to participants
  const addCurrentUserToParticipants = async (user) => {
    try {
      const newId = `P-${String(participants.length + 1).padStart(3, '0')}`;
      
      const newParticipant: Participant = {
        id: newId,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'New User',
        email: user.email || '',
        phone: user.user_metadata?.phone || "(Not provided)",
        cohort: "Cohort #8",
        progress: 0,
        lastActive: "Just now",
        status: "On Track",
        businessType: user.user_metadata?.businessGoals || "(Not specified)",
        risk: "low",
        location: user.user_metadata?.militaryBranch ? `${user.user_metadata.militaryBranch} veteran` : "(Not provided)",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        expectedGraduation: "TBD",
        badges: [],
        skills: user.user_metadata?.skillsets ? [user.user_metadata.skillsets] : [],
        goals: user.user_metadata?.businessGoals ? [user.user_metadata.businessGoals] : [],
        reasonToJoin: user.user_metadata?.heardFrom ? `Referred from: ${user.user_metadata.heardFrom}` : "New registration",
        mentorName: "Not assigned",
        mentorNotes: "",
        assignments: []
      };
      
      // Add to Supabase
      const { error } = await supabase
        .from('participants')
        .insert(newParticipant);
      
      if (error) {
        console.error("Error adding current user as participant:", error);
      } else {
        // Update local state
        setParticipants(prev => [...prev, newParticipant]);
        
        toast({
          title: "Current User Added",
          description: `${newParticipant.name} has been added to the participants list.`,
        });
      }
    } catch (error) {
      console.error("Error adding current user as participant:", error);
    }
  };

  const handleClearAllParticipants = async () => {
    setIsLoading(true);
    try {
      // Delete all records from the participants table
      const { error } = await supabase
        .from('participants')
        .delete()
        .neq('id', ''); // This will delete all rows
      
      if (error) {
        throw error;
      }
      
      // Clear participants from state
      setParticipants([]);
      
      setIsClearParticipantsDialogOpen(false);
      toast({
        title: "All Participants Cleared",
        description: "The participant database has been cleared successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error clearing participants:", error);
      toast({
        title: "Error",
        description: "Failed to clear participants data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    cohort: z.string().min(1, { message: "Please select a cohort." }),
    businessType: z.string().min(2, { message: "Business type must be at least 2 characters." }),
    status: z.string().min(1, { message: "Please select a status." }),
    location: z.string().optional(),
    reasonToJoin: z.string().optional(),
  });

  const filteredParticipants = participants.filter(participant => {
    if (!searchTerm) return true;
    return (
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParticipants = filteredParticipants.slice(indexOfFirstItem, indexOfLastItem);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cohort: "Cohort #8",
      businessType: "",
      status: "On Track",
      location: "",
      reasonToJoin: "",
    },
  });

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsViewDialogOpen(true);
    setActiveTab("profile");
  };

  const handleMessageParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsMessageDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedParticipant?.name}`,
    });
    setIsMessageDialogOpen(false);
  };

  const handleRequestReport = () => {
    toast({
      title: "Report Requested",
      description: `Progress report for ${selectedParticipant?.name} has been requested`,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const newId = `P-${String(participants.length + 1).padStart(3, '0')}`;
      
      const newParticipant: Participant = {
        id: newId,
        name: data.name,
        email: data.email,
        phone: data.phone || "(Not provided)",
        cohort: data.cohort,
        progress: 0,
        lastActive: "Just now",
        status: data.status,
        businessType: data.businessType,
        risk: data.status === "At Risk" ? "high" : data.status === "Needs Support" ? "medium" : "low",
        location: data.location || "(Not provided)",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        expectedGraduation: "TBD",
        badges: [],
        skills: [],
        goals: [],
        reasonToJoin: data.reasonToJoin || "Not specified",
        mentorName: "Not assigned",
        mentorNotes: "",
        assignments: []
      };
      
      // Add to Supabase
      const { error } = await supabase
        .from('participants')
        .insert(newParticipant);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setParticipants([...participants, newParticipant]);
      
      toast({
        title: "Participant Added",
        description: `${data.name} has been added to ${data.cohort}`,
      });
      
      setIsAddParticipantDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding participant:", error);
      toast({
        title: "Error",
        description: "Failed to add participant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(null);
      }
    }
    
    return pageNumbers.filter((num, index, array) => {
      if (num === null && array[index - 1] === null) {
        return false;
      }
      return true;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Participant Management
        </h2>
        <div className="flex space-x-2">
          <Button 
            className="bg-military-navy hover:bg-military-navy/90"
            onClick={() => setIsAddParticipantDialogOpen(true)}
          >
            + Add Participant
          </Button>
          <Button 
            variant="destructive"
            onClick={() => setIsClearParticipantsDialogOpen(true)}
            className="flex items-center space-x-1"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participant Directory</CardTitle>
          <CardDescription>
            View, manage, and monitor all program participants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Participants</DropdownMenuItem>
                    <DropdownMenuItem>At Risk</DropdownMenuItem>
                    <DropdownMenuItem>Exceeding</DropdownMenuItem>
                    <DropdownMenuItem>Needs Support</DropdownMenuItem>
                    <DropdownMenuItem>On Track</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      Cohort #8
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Cohorts</DropdownMenuItem>
                    <DropdownMenuItem>Cohort #8</DropdownMenuItem>
                    <DropdownMenuItem>Cohort #7</DropdownMenuItem>
                    <DropdownMenuItem>Cohort #6</DropdownMenuItem>
                    <DropdownMenuItem>Cohort #5</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 mx-auto mb-4 border-4 border-military-navy/20 border-t-military-navy rounded-full animate-spin"></div>
                <p>Loading participants...</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <div className="grid grid-cols-8 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                    <div>Participant</div>
                    <div>Email</div>
                    <div>Location</div>
                    <div>Cohort</div>
                    <div>Progress</div>
                    <div>Status</div>
                    <div>Business Focus</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  {currentParticipants.length > 0 ? (
                    currentParticipants.map((participant) => (
                      <div key={participant.id}>
                        <div className={`grid grid-cols-8 px-4 py-3 text-sm ${participant.risk === 'high' ? 'bg-military-red/5' : participant.risk === 'medium' ? 'bg-amber-50' : ''}`}>
                          <div className="font-medium text-military-navy">{participant.name}</div>
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1 text-slate-400" />
                            <span className="truncate">{participant.email}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                            <span className="truncate">{participant.location}</span>
                          </div>
                          <div>{participant.cohort}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-200 rounded-full">
                                <div 
                                  className={`h-full rounded-full ${
                                    participant.progress >= 80 ? 'bg-emerald-500' : 
                                    participant.progress >= 60 ? 'bg-amber-500' : 
                                    'bg-military-red'
                                  }`} 
                                  style={{ width: `${participant.progress}%` }}
                                ></div>
                              </div>
                              <span>{participant.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <span 
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                participant.status === 'Exceeding' ? 'bg-emerald-100 text-emerald-700' : 
                                participant.status === 'On Track' ? 'bg-blue-100 text-blue-700' : 
                                participant.status === 'Needs Support' ? 'bg-amber-100 text-amber-700' : 
                                'bg-military-red/10 text-military-red'
                              }`}
                            >
                              {participant.status}
                            </span>
                          </div>
                          <div className="truncate">{participant.businessType}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewParticipant(participant)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleMessageParticipant(participant)}
                              >
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No participants found
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredParticipants.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredParticipants.length)} of {filteredParticipants.length} participants
                  </div>
                  
                  {totalPages > 0 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {getPageNumbers().map((pageNumber, index) => (
                          <PaginationItem key={index}>
                            {pageNumber === null ? (
                              <span className="px-4 py-2">...</span>
                            ) : (
                              <PaginationLink
                                isActive={currentPage === pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Participant Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedParticipant && (
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{selectedParticipant.name}</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      selectedParticipant.status === 'Exceeding' ? 'bg-emerald-100 text-emerald-700' : 
                      selectedParticipant.status === 'On Track' ? 'bg-blue-100 text-blue-700' : 
                      selectedParticipant.status === 'Needs Support' ? 'bg-amber-100 text-amber-700' : 
                      'bg-military-red/10 text-military-red'
                    }`}>
                      {selectedParticipant.status}
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <span className="block">ID: {selectedParticipant.id}</span>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {selectedParticipant.email}
                    </span>
                    <span className="flex items-center text-sm">
                      <Phone className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      {selectedParticipant.phone}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Goals</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Basic Information
                      </h4>
                      <div className="rounded-md border p-3">
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Cohort:</span>
                            <span className="font-medium">{selectedParticipant.cohort}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span className="font-medium">{selectedParticipant.location}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Join Date:</span>
                            <span className="font-medium">{selectedParticipant.joinDate}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Expected Graduation:</span>
                            <span className="font-medium">{selectedParticipant.expectedGraduation}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Business Focus
                      </h4>
                      <div className="rounded-md border p-3">
                        <p className="text-sm font-medium">{selectedParticipant.businessType}</p>
                        <p className="text-sm mt-2">Last active: {selectedParticipant.lastActive}</p>
                      </div>
                      
                      <h4 className="text-sm font-medium mt-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Reason to Join
                      </h4>
                      <div className="rounded-md border p-3">
                        <p className="text-sm">{selectedParticipant.reasonToJoin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Mentor Information
                    </h4>
                    <div className="rounded-md border p-3">
                      <p className="text-sm font-medium">{selectedParticipant.mentorName}</p>
                      <p className="text-sm mt-2">{selectedParticipant.mentorNotes || "No mentor notes available."}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="progress" className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Program Progress</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{selectedParticipant.progress}% Complete</span>
                      <span className="text-xs text-muted-foreground">Last active: {selectedParticipant.lastActive}</span>
                    </div>
                    <Progress 
                      value={selectedParticipant.progress} 
                      className="h-2.5" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Completion Status</h4>
                      <div className="rounded-md border p-3">
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span>Modules Completed:</span>
                            <span className="font-medium">4/10</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Assignments Submitted:</span>
                            <span className="font-medium">12/20</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Mentoring Sessions:</span>
                            <span className="font-medium">5/8</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Engagement Metrics</h4>
                      <div className="rounded-md border p-3">
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span>Login Frequency:</span>
                            <span className="font-medium">3x/week</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Resource Downloads:</span>
                            <span className="font-medium">17</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Forum Participation:</span>
                            <span className="font-medium">Medium</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Skills
                      </h4>
                      <div className="rounded-md border p-3">
                        {selectedParticipant.skills && selectedParticipant.skills.length > 0 ? (
                          <ul className="space-y-1.5">
                            {selectedParticipant.skills.map((skill, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <BadgeCheck className="h-4 w-4 mr-2 text-military-navy shrink-0" />
                                {skill}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">No skills recorded yet.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Goals
                      </h4>
                      <div className="rounded-md border p-3">
                        {selectedParticipant.goals && selectedParticipant.goals.length > 0 ? (
                          <ul className="space-y-1.5">
                            {selectedParticipant.goals.map((goal, index) => (
                              <li key
