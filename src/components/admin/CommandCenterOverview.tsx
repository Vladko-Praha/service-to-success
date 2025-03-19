
import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { 
  Activity, 
  AlertTriangle, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ClipboardCheck, 
  Clock, 
  Users,
  MessageSquare,
  Mail,
  Send,
  FileText,
  Bell,
  UserRound,
  UserSearch
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const data = [
  {
    name: "Week 1",
    total: 98,
  },
  {
    name: "Week 2",
    total: 92,
  },
  {
    name: "Week 3",
    total: 87,
  },
  {
    name: "Week 4",
    total: 89,
  },
  {
    name: "Week 5",
    total: 84,
  },
  {
    name: "Week 6",
    total: 88,
  },
  {
    name: "Week 7",
    total: 92,
  },
  {
    name: "Week 8",
    total: 95,
  },
  {
    name: "Week 9",
    total: 90,
  },
  {
    name: "Week 10",
    total: 93,
  },
  {
    name: "Week 11",
    total: 89,
  },
  {
    name: "Week 12",
    total: 92,
  },
];

const atRiskParticipants = [
  {
    id: "P-003",
    name: "SFC Robert Davis",
    rank: "Sergeant First Class",
    branch: "Army",
    cohort: "Cohort #8",
    progress: 45,
    lastActive: "5 days ago",
    status: "At Risk",
    businessType: "Logistics Solutions",
    risk: "high",
    riskReasons: ["Missed 3 consecutive assignments", "No login for 5 days", "Failed Module 4 assessment"],
    contact: {
      email: "robert.davis@military.gov",
      phone: "(555) 123-4567"
    }
  },
  {
    id: "P-007",
    name: "CPL James Wilson",
    rank: "Corporal",
    branch: "Marines",
    cohort: "Cohort #8",
    progress: 39,
    lastActive: "7 days ago",
    status: "At Risk",
    businessType: "Security Consulting",
    risk: "high",
    riskReasons: ["Attendance below 60%", "Multiple incomplete assignments", "Requested extension twice"],
    contact: {
      email: "james.wilson@military.gov",
      phone: "(555) 987-6543"
    }
  },
  {
    id: "P-012",
    name: "PO2 Lisa Thompson",
    rank: "Petty Officer Second Class",
    branch: "Navy",
    cohort: "Cohort #8",
    progress: 51,
    lastActive: "3 days ago",
    status: "At Risk",
    businessType: "Maritime Training",
    risk: "medium",
    riskReasons: ["Struggling with financial module", "Requested additional support"],
    contact: {
      email: "lisa.thompson@military.gov",
      phone: "(555) 456-7890"
    }
  }
];

const CommandCenterOverview = () => {
  const { toast } = useToast();
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const handleSendReminder = (alertText) => {
    toast({
      title: "Reminder Sent",
      description: `Reminder sent for: ${alertText}`,
    });
  };
  
  const handleSendEmail = (alertText) => {
    toast({
      title: "Email Sent",
      description: `Email notification sent regarding: ${alertText}`,
    });
  };
  
  const handleAddToCalendar = (alertText) => {
    toast({
      title: "Added to Calendar",
      description: `${alertText} has been added to participants' calendars`,
    });
  };
  
  const handleRequestReport = (alertText) => {
    toast({
      title: "Report Requested",
      description: `Report requested concerning: ${alertText}`,
    });
  };

  const handleViewProfile = (participantId) => {
    const participant = atRiskParticipants.find(p => p.id === participantId);
    setSelectedParticipant(participant);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Command Center Overview
        </h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
            <div className="mt-4 h-1 w-full bg-military-olive/20">
              <div className="h-1 w-[75%] bg-military-olive"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Program Completion
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +4% from last cohort
            </p>
            <div className="mt-4 h-1 w-full bg-military-olive/20">
              <div className="h-1 w-[68%] bg-military-olive"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Participants</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              -2 from last week
            </p>
            <div className="mt-4 h-1 w-full bg-military-red/20">
              <div className="h-1 w-[8%] bg-military-red"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Business Launch Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last cohort
            </p>
            <div className="mt-4 h-1 w-full bg-military-olive/20">
              <div className="h-1 w-[92%] bg-military-olive"></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Program Engagement (Weekly)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Bar
                  dataKey="total"
                  fill="#4a5c2f"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <AlertTriangle className="mt-1 h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="font-medium">5 participants haven't logged in for 7+ days</p>
                  <p className="text-sm text-muted-foreground">Requires intervention</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Action</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start" 
                        onClick={() => handleSendReminder("5 participants haven't logged in for 7+ days")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send reminder
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendEmail("5 participants haven't logged in for 7+ days")}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send email
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleRequestReport("5 participants haven't logged in for 7+ days")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Request report
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleViewProfile("P-003")}
                      >
                        <UserSearch className="mr-2 h-4 w-4" />
                        View profiles
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <Clock className="mt-1 h-5 w-5 text-military-red" />
                <div className="flex-1">
                  <p className="font-medium">3 assignments past deadline in Module 4</p>
                  <p className="text-sm text-muted-foreground">Requires follow-up</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Action</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendReminder("3 assignments past deadline in Module 4")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send reminder
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendEmail("3 assignments past deadline in Module 4")}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send email
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleRequestReport("3 assignments past deadline in Module 4")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Request report
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleViewProfile("P-007")}
                      >
                        <UserSearch className="mr-2 h-4 w-4" />
                        View profiles
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <ClipboardCheck className="mt-1 h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Module 6 grading pending for 12 participants</p>
                  <p className="text-sm text-muted-foreground">Due in 2 days</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Action</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendReminder("Module 6 grading pending for 12 participants")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send reminder
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleRequestReport("Module 6 grading pending for 12 participants")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Request report
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <Calendar className="mt-1 h-5 w-5 text-military-olive" />
                <div className="flex-1">
                  <p className="font-medium">Upcoming: Group mentoring session</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 1500 hours</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Action</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendReminder("Upcoming: Group mentoring session")}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Send reminder
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleAddToCalendar("Upcoming: Group mentoring session")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to calendar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => handleSendEmail("Upcoming: Group mentoring session")}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send email
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Program Milestone Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Module Completion</span>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assignment Submissions</span>
                  <span className="text-sm text-muted-foreground">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Business Model Development</span>
                  <span className="text-sm text-muted-foreground">59%</span>
                </div>
                <Progress value={59} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Final Project Progress</span>
                  <span className="text-sm text-muted-foreground">41%</span>
                </div>
                <Progress value={41} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-military-navy" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Business Model Canvas Tutorial
                  </p>
                  <p className="text-xs text-muted-foreground">
                    92% completion rate
                  </p>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-military-navy" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Financial Projections Workshop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    78% completion rate
                  </p>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-military-navy" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Marketing Strategy Session
                  </p>
                  <p className="text-xs text-muted-foreground">
                    86% completion rate
                  </p>
                  <Progress value={86} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-military-navy" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Leadership Transition Module
                  </p>
                  <p className="text-xs text-muted-foreground">
                    95% completion rate
                  </p>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>At-Risk Participants</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleViewProfile("P-003")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atRiskParticipants.map((participant) => (
                <div 
                  key={participant.id} 
                  className="flex items-start gap-4 rounded-lg border p-3 bg-military-red/5"
                >
                  <UserRound className="mt-1 h-5 w-5 text-military-red" />
                  <div className="flex-1">
                    <p className="font-medium">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">{participant.progress}% Progress</p>
                    <p className="text-xs text-military-red">Last active: {participant.lastActive}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewProfile(participant.id)}
                  >
                    <UserSearch className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add the Dialog component for participant profile viewing */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedParticipant && (
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{selectedParticipant.name}</span>
                    <span className="rounded-full bg-military-red/10 px-2 py-1 text-xs font-medium text-military-red">
                      {selectedParticipant.risk.toUpperCase()} RISK
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <span className="block mt-1">{selectedParticipant.rank} | {selectedParticipant.branch}</span>
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
                  <Progress value={selectedParticipant.progress} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                  <div className="rounded-md border p-3 bg-military-red/5">
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedParticipant.riskReasons.map((reason, index) => (
                        <li key={index} className="text-sm">{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Business Focus</h4>
                  <div className="rounded-md border p-3">
                    <p className="text-sm">{selectedParticipant.businessType}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedParticipant.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedParticipant.contact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      handleSendReminder(`Follow-up with ${selectedParticipant.name}`);
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      handleRequestReport(`Progress report for ${selectedParticipant.name}`);
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Request Report
                  </Button>
                  <Button 
                    variant="profile" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Intervention Plan Created",
                        description: `Intervention plan created for ${selectedParticipant.name}`,
                      });
                      setIsProfileOpen(false);
                    }}
                  >
                    Create Intervention Plan
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommandCenterOverview;
