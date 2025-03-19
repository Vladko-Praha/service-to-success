
import React, { useState } from "react";
import { Search, Filter, Download, ChevronDown } from "lucide-react";
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
import { Mail, MessageSquare, FileText } from "lucide-react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ParticipantManagement = () => {
  const { toast } = useToast();
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isAddParticipantDialogOpen, setIsAddParticipantDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample participant data
  const [participants, setParticipants] = useState([
    {
      id: "P-001",
      name: "SSG Michael Johnson",
      cohort: "Cohort #8",
      progress: 78,
      lastActive: "2 hours ago",
      status: "On Track",
      businessType: "Cybersecurity Consulting",
      risk: "low"
    },
    {
      id: "P-002",
      name: "CPT Sarah Williams",
      cohort: "Cohort #8",
      progress: 92,
      lastActive: "1 day ago",
      status: "Exceeding",
      businessType: "Fitness Training",
      risk: "low"
    },
    {
      id: "P-003",
      name: "SFC Robert Davis",
      cohort: "Cohort #8",
      progress: 45,
      lastActive: "5 days ago",
      status: "At Risk",
      businessType: "Logistics Solutions",
      risk: "high"
    },
    {
      id: "P-004",
      name: "SGT Jennifer Miller",
      cohort: "Cohort #8",
      progress: 65,
      lastActive: "3 hours ago",
      status: "Needs Support",
      businessType: "Leadership Training",
      risk: "medium"
    },
    {
      id: "P-005",
      name: "COL David Martinez",
      cohort: "Cohort #8",
      progress: 88,
      lastActive: "1 hour ago",
      status: "On Track",
      businessType: "Defense Contracting",
      risk: "low"
    },
    {
      id: "P-006",
      name: "LTC Jessica Thompson",
      cohort: "Cohort #8",
      progress: 72,
      lastActive: "4 hours ago",
      status: "On Track",
      businessType: "Healthcare Services",
      risk: "low"
    },
    {
      id: "P-007",
      name: "MAJ Brian Wilson",
      cohort: "Cohort #8",
      progress: 54,
      lastActive: "2 days ago",
      status: "Needs Support",
      businessType: "Drone Technology",
      risk: "medium"
    },
    {
      id: "P-008",
      name: "CPT Amanda Harris",
      cohort: "Cohort #8",
      progress: 91,
      lastActive: "5 hours ago",
      status: "Exceeding",
      businessType: "Educational Services",
      risk: "low"
    },
    {
      id: "P-009",
      name: "SFC Thomas Williams",
      cohort: "Cohort #8",
      progress: 33,
      lastActive: "1 week ago",
      status: "At Risk",
      businessType: "Supply Chain Management",
      risk: "high"
    },
    {
      id: "P-010",
      name: "SSG Laura Rodriguez",
      cohort: "Cohort #8",
      progress: 81,
      lastActive: "3 days ago",
      status: "On Track",
      businessType: "IT Consulting",
      risk: "low"
    },
    {
      id: "P-011",
      name: "MAJ Chris Barnes",
      cohort: "Cohort #8",
      progress: 67,
      lastActive: "12 hours ago",
      status: "On Track",
      businessType: "Security Services",
      risk: "low"
    },
    {
      id: "P-012",
      name: "CPT Elizabeth Chen",
      cohort: "Cohort #8",
      progress: 49,
      lastActive: "4 days ago",
      status: "Needs Support",
      businessType: "Engineering Solutions",
      risk: "medium"
    }
  ]);

  // Form schema for adding a new participant
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    cohort: z.string().min(1, { message: "Please select a cohort." }),
    businessType: z.string().min(2, { message: "Business type must be at least 2 characters." }),
    status: z.string().min(1, { message: "Please select a status." }),
  });

  // Calculate pagination
  const totalPages = Math.ceil(participants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParticipants = participants.slice(indexOfFirstItem, indexOfLastItem);

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cohort: "Cohort #8",
      businessType: "",
      status: "On Track",
    },
  });

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewParticipant = (participant) => {
    setSelectedParticipant(participant);
    setIsViewDialogOpen(true);
  };

  const handleMessageParticipant = (participant) => {
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Generate a new ID
    const newId = `P-${String(participants.length + 1).padStart(3, '0')}`;
    
    // Create new participant object
    const newParticipant = {
      id: newId,
      name: data.name,
      cohort: data.cohort,
      progress: 0,
      lastActive: "Just now",
      status: data.status,
      businessType: data.businessType,
      risk: data.status === "At Risk" ? "high" : data.status === "Needs Support" ? "medium" : "low"
    };
    
    // Add to participants array
    setParticipants([...participants, newParticipant]);
    
    // Show success message
    toast({
      title: "Participant Added",
      description: `${data.name} has been added to ${data.cohort}`,
    });
    
    // Close dialog and reset form
    setIsAddParticipantDialogOpen(false);
    form.reset();
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page, last page, and pages around current page
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(null); // null represents ellipsis
      }
    }
    
    // Remove duplicate ellipses
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
        <Button 
          className="bg-military-navy hover:bg-military-navy/90"
          onClick={() => setIsAddParticipantDialogOpen(true)}
        >
          + Add Participant
        </Button>
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

            <div className="rounded-md border">
              <div className="grid grid-cols-7 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                <div>Participant</div>
                <div>Cohort</div>
                <div>Progress</div>
                <div>Last Active</div>
                <div>Status</div>
                <div>Business Focus</div>
                <div>Actions</div>
              </div>
              <Separator />
              {currentParticipants.map((participant) => (
                <div key={participant.id}>
                  <div className={`grid grid-cols-7 px-4 py-3 text-sm ${participant.risk === 'high' ? 'bg-military-red/5' : participant.risk === 'medium' ? 'bg-amber-50' : ''}`}>
                    <div className="font-medium text-military-navy">{participant.name}</div>
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
                    <div>{participant.lastActive}</div>
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
                    <div>{participant.businessType}</div>
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
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, participants.length)} of {participants.length} participants
              </div>
              
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participant View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
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
                  <span className="block">{selectedParticipant.cohort}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Program Progress</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{selectedParticipant.progress}%</span>
                    <span className="text-xs text-muted-foreground">Last active: {selectedParticipant.lastActive}</span>
                  </div>
                  <Progress 
                    value={selectedParticipant.progress} 
                    className="h-2" 
                  />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Business Focus</h4>
                  <div className="rounded-md border p-3">
                    <p className="text-sm">{selectedParticipant.businessType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              <DialogFooter className="flex flex-wrap gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSendMessage}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRequestReport}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Request Report
                </Button>
                <Button 
                  variant="default" 
                  className="bg-military-navy hover:bg-military-navy/90"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Participant Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedParticipant && (
            <>
              <DialogHeader>
                <DialogTitle>Send Message</DialogTitle>
                <DialogDescription>
                  Send a message to {selectedParticipant.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-military-navy"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsMessageDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-military-navy hover:bg-military-navy/90"
                  onClick={handleSendMessage}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Participant Dialog */}
      <Dialog open={isAddParticipantDialogOpen} onOpenChange={setIsAddParticipantDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Participant</DialogTitle>
            <DialogDescription>
              Enter the details of the new participant
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SGT John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cohort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cohort</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-military-navy"
                        {...field}
                      >
                        <option value="Cohort #8">Cohort #8</option>
                        <option value="Cohort #7">Cohort #7</option>
                        <option value="Cohort #6">Cohort #6</option>
                        <option value="Cohort #5">Cohort #5</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Focus</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Cybersecurity Consulting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Status</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-military-navy"
                        {...field}
                      >
                        <option value="On Track">On Track</option>
                        <option value="Exceeding">Exceeding</option>
                        <option value="Needs Support">Needs Support</option>
                        <option value="At Risk">At Risk</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddParticipantDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-military-navy hover:bg-military-navy/90"
                >
                  Add Participant
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantManagement;
