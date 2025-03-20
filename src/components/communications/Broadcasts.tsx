
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MailOpen, Bookmark, Clock, Calendar, Filter, Search, Download, FileText, User, Pin, Megaphone, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Broadcast = {
  id: string;
  title: string;
  sender: {
    name: string;
    role: string;
  };
  date: string;
  category: "announcement" | "event" | "resource" | "update";
  summary: string;
  content: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  pinned?: boolean;
  read: boolean;
  starred?: boolean;
};

const mockBroadcasts: Broadcast[] = [
  {
    id: "bc1",
    title: "Program Update: New Industry Partnerships",
    sender: {
      name: "Col. Richard Hayes",
      role: "Program Director"
    },
    date: "April 2, 2025",
    category: "announcement",
    summary: "Announcing new partnerships with industry leaders to provide mentorship and funding opportunities for program participants.",
    content: `Dear Program Participants,

We are excited to announce that we have established new partnerships with several industry leaders who are committed to supporting veteran entrepreneurs like yourselves.

These partnerships will provide:
- Direct mentorship opportunities with successful business leaders
- Potential funding channels for qualified ventures
- Exclusive networking events with industry executives
- Early access to new market opportunities

The following companies have joined our alliance:
- TechVision Enterprises
- Atlas Financial Group
- Resilient Manufacturing, Inc.
- Global Logistics Solutions

To express interest in connecting with any of these partners, please complete the interest form by April 15. The first round of mentorship assignments will be announced on April 20.

Thank you for your continued dedication to your entrepreneurial journey.

Best regards,
Col. Richard Hayes
Program Director`,
    attachments: [
      {
        name: "Industry_Partner_Details.pdf",
        size: "1.2 MB",
        type: "pdf"
      },
      {
        name: "Mentorship_Application.docx",
        size: "380 KB",
        type: "docx"
      }
    ],
    pinned: true,
    read: false,
    starred: false
  },
  {
    id: "bc2",
    title: "Upcoming Virtual Job Fair - Register Now",
    sender: {
      name: "Maj. Samantha Torres",
      role: "Career Transition Specialist"
    },
    date: "March 30, 2025",
    category: "event",
    summary: "Join our virtual job fair on April 10 featuring 25+ companies actively seeking to hire veterans.",
    content: `VIRTUAL JOB FAIR - APRIL 10, 2025 (0900-1600 HOURS)

We're hosting our quarterly Virtual Job Fair specifically for veterans in our program and recent graduates. This event presents an excellent opportunity to connect with employers who value your military experience and are actively seeking to hire veterans.

EVENT DETAILS:
- Date: April 10, 2025
- Time: 0900-1600 hours
- Platform: VetConnect Virtual Events (link will be provided upon registration)

PARTICIPATING EMPLOYERS:
- 25+ companies from various industries
- Both national corporations and local businesses
- Entry-level to executive positions available

PREPARATION RESOURCES:
- Resume review services available until April 8
- Interview preparation workshops on April 5 and 7
- LinkedIn profile optimization guide (attached)

To register, please click the "Register Now" button in your dashboard or complete the attached registration form.

We look forward to helping you connect with your next career opportunity!

Maj. Samantha Torres
Career Transition Specialist`,
    attachments: [
      {
        name: "Job_Fair_Registration.pdf",
        size: "450 KB",
        type: "pdf"
      },
      {
        name: "LinkedIn_Optimization_Guide.pdf",
        size: "2.1 MB",
        type: "pdf"
      }
    ],
    read: false,
    starred: true
  },
  {
    id: "bc3",
    title: "New Resources Added: Business Plan Templates",
    sender: {
      name: "Capt. Daniel Wright",
      role: "Resource Coordinator"
    },
    date: "March 25, 2025",
    category: "resource",
    summary: "Access newly uploaded business plan templates and financial projection spreadsheets in the Resource Center.",
    content: `NEW RESOURCES AVAILABLE

We have added several new resources to help you develop comprehensive business plans and financial projections:

BUSINESS PLAN TEMPLATES:
- General Business Template (detailed)
- Startup One-Page Format
- E-commerce Specific Template
- Service Business Template
- Retail Business Template

FINANCIAL PROJECTION TOOLS:
- 3-Year Financial Projection Spreadsheet
- Cash Flow Calculator
- Break-Even Analysis Tool
- Startup Cost Estimator

All resources are now available in the Resource Center under "Business Planning Tools." These templates have been developed based on successful business plans from program graduates and incorporate best practices for securing funding.

If you need assistance using these resources, schedule a consultation with your assigned business advisor.

Capt. Daniel Wright
Resource Coordinator`,
    attachments: [
      {
        name: "Business_Plan_Guide.pdf",
        size: "3.2 MB",
        type: "pdf"
      }
    ],
    read: true,
    starred: true
  },
  {
    id: "bc4",
    title: "System Maintenance Notification",
    sender: {
      name: "Technical Support Team",
      role: "IT Department"
    },
    date: "March 20, 2025",
    category: "update",
    summary: "The system will be undergoing scheduled maintenance on March 25 from 0100-0500 hours.",
    content: `SCHEDULED SYSTEM MAINTENANCE

Please be advised that our platform will be undergoing scheduled maintenance on:

DATE: March 25, 2025
TIME: 0100-0500 hours (Eastern Time)

WHAT TO EXPECT:
- The system will be completely unavailable during this time
- All pending work should be saved by March 24, 2300 hours
- No data loss is expected

IMPROVEMENTS BEING IMPLEMENTED:
- Enhanced security features
- Improved messaging system
- Faster document upload capabilities
- Better mobile responsiveness

The system will automatically be back online after maintenance is complete. You do not need to take any action.

If you have any questions or concerns, please contact technical support.

Technical Support Team
IT Department`,
    read: true,
    starred: false
  },
  {
    id: "bc5",
    title: "Quarterly Success Metrics Released",
    sender: {
      name: "Program Evaluation Office",
      role: "Analytics Team"
    },
    date: "March 15, 2025",
    category: "update",
    summary: "Review the Q1 2025 success metrics for veteran entrepreneurs in our program.",
    content: `QUARTERLY SUCCESS METRICS: Q1 2025

The Program Evaluation Office has compiled the success metrics for veteran entrepreneurs in our program for Q1 2025. We are pleased to report strong performance across several key indicators:

PROGRAM HIGHLIGHTS:
- 75 new businesses launched by program participants
- $3.2M in total funding secured by participants
- 128 new jobs created by veteran-owned businesses
- 92% program completion rate

TOP PERFORMING SECTORS:
1. Technology & Software (32%)
2. Professional Services (24%)
3. E-commerce (18%)
4. Manufacturing (15%)
5. Food & Beverage (11%)

The full detailed report is attached to this broadcast. We encourage all participants to review the data and identify opportunities for benchmarking your own venture.

Congratulations to all who contributed to these impressive results!

Program Evaluation Office
Analytics Team`,
    attachments: [
      {
        name: "Q1_2025_Metrics_Report.pdf",
        size: "5.8 MB",
        type: "pdf"
      }
    ],
    read: true,
    starred: false
  }
];

const Broadcasts = () => {
  const { toast } = useToast();
  const [broadcasts, setBroadcasts] = React.useState(mockBroadcasts);
  const [selectedBroadcast, setSelectedBroadcast] = React.useState<Broadcast | null>(null);
  const [showContent, setShowContent] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<string>("all");

  // Mark as read when viewing a broadcast
  React.useEffect(() => {
    if (selectedBroadcast && !selectedBroadcast.read) {
      setBroadcasts(prev => 
        prev.map(bc => 
          bc.id === selectedBroadcast.id ? { ...bc, read: true } : bc
        )
      );
      setSelectedBroadcast(prev => prev ? { ...prev, read: true } : null);
    }
  }, [selectedBroadcast]);

  const toggleStar = (id: string) => {
    setBroadcasts(prev => 
      prev.map(bc => 
        bc.id === id ? { ...bc, starred: !bc.starred } : bc
      )
    );
    
    if (selectedBroadcast && selectedBroadcast.id === id) {
      setSelectedBroadcast(prev => prev ? { ...prev, starred: !prev.starred } : null);
    }
    
    toast({
      title: "Broadcast Updated",
      description: "Your changes have been saved.",
    });
  };

  const handleCategoryFilter = (category: string) => {
    setFilterCategory(category);
    setSelectedBroadcast(null);
    setShowContent(false);
  };

  const downloadAttachment = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const filteredBroadcasts = broadcasts.filter(bc => {
    // Apply category filter
    if (filterCategory !== "all" && bc.category !== filterCategory) {
      return false;
    }
    
    // Apply search term
    if (searchTerm) {
      return (
        bc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bc.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  return (
    <div className="flex h-[620px] border rounded-lg overflow-hidden">
      {/* Left sidebar - Broadcast list */}
      <div className={`${showContent ? "hidden md:block md:w-1/3" : "w-full md:w-1/2"} border-r bg-military-sand/50`}>
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-military-navy flex items-center gap-2">
              <MailOpen className="h-5 w-5" />
              Command Broadcasts
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8"
              onClick={() => {
                setSelectedBroadcast(null);
                setShowContent(false);
              }}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="relative mb-3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search broadcasts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={filterCategory} onValueChange={handleCategoryFilter} className="w-full">
            <TabsList className="grid grid-cols-5 h-8">
              <TabsTrigger 
                value="all" 
                className="h-7 text-xs px-2 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="announcement" 
                className="h-7 text-xs px-2 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
              >
                Announcements
              </TabsTrigger>
              <TabsTrigger 
                value="event" 
                className="h-7 text-xs px-2 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
              >
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="resource" 
                className="h-7 text-xs px-2 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="update" 
                className="h-7 text-xs px-2 data-[state=active]:bg-military-navy data-[state=active]:text-military-sand"
              >
                Updates
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="h-[534px]">
          {filteredBroadcasts.length > 0 ? (
            filteredBroadcasts.map((broadcast) => (
              <div 
                key={broadcast.id}
                className={`p-3 border-b hover:bg-military-beige cursor-pointer transition-colors ${
                  selectedBroadcast?.id === broadcast.id ? 'bg-military-beige' : 
                  broadcast.read ? '' : 'bg-military-beige/20'
                }`}
                onClick={() => {
                  setSelectedBroadcast(broadcast);
                  setShowContent(true);
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    {!broadcast.read && (
                      <div className="h-2 w-2 rounded-full bg-military-navy mb-1"></div>
                    )}
                    {broadcast.pinned && (
                      <Pin className="h-3 w-3 text-military-red" />
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(broadcast.id);
                      }}
                    >
                      <Bookmark 
                        className={`h-4 w-4 ${broadcast.starred ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} 
                      />
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`font-medium text-sm ${!broadcast.read ? 'text-military-navy' : ''}`}>
                        {broadcast.title}
                      </h4>
                      <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                        <Clock className="h-3 w-3 mr-1" />
                        {broadcast.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <Badge 
                        className={`
                          ${broadcast.category === 'announcement' ? 'bg-military-navy' : 
                            broadcast.category === 'event' ? 'bg-[#FFB300]' :
                            broadcast.category === 'resource' ? 'bg-military-olive' :
                            'bg-gray-500'}
                        `}
                      >
                        {broadcast.category.charAt(0).toUpperCase() + broadcast.category.slice(1)}
                      </Badge>
                      <span className="text-muted-foreground">
                        From: {broadcast.sender.name}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {broadcast.summary}
                    </p>
                    
                    {broadcast.attachments && (
                      <div className="flex items-center gap-1 mt-2">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {broadcast.attachments.length} attachment{broadcast.attachments.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MailOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No broadcasts match your filters</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right side - Broadcast content */}
      {showContent && selectedBroadcast && (
        <div className={`${showContent ? "w-full md:w-2/3" : "hidden"} bg-white`}>
          <div className="flex flex-col h-full">
            <div className="p-3 border-b flex items-center justify-between bg-military-sand/30">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden"
                  onClick={() => setShowContent(false)}
                >
                  <span className="sr-only">Back</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
                </Button>
                
                <h3 className="font-semibold">Broadcast Details</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleStar(selectedBroadcast.id)}
                >
                  <Bookmark 
                    className={`h-4 w-4 mr-1 ${selectedBroadcast.starred ? 'fill-amber-500 text-amber-500' : ''}`} 
                  />
                  {selectedBroadcast.starred ? 'Starred' : 'Star'}
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-military-navy">
                    {selectedBroadcast.title}
                  </h2>
                  
                  {selectedBroadcast.pinned && (
                    <Badge className="bg-military-red flex items-center gap-1">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{selectedBroadcast.date}</span>
                </div>
                
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-military-navy">
                    <User className="h-6 w-6 text-white" />
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedBroadcast.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedBroadcast.sender.role}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Badge 
                    className={`
                      ${selectedBroadcast.category === 'announcement' ? 'bg-military-navy' : 
                        selectedBroadcast.category === 'event' ? 'bg-[#FFB300]' :
                        selectedBroadcast.category === 'resource' ? 'bg-military-olive' :
                        'bg-gray-500'}
                    `}
                  >
                    {selectedBroadcast.category.charAt(0).toUpperCase() + selectedBroadcast.category.slice(1)}
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="my-4 bg-military-beige/20 p-3 rounded-md border">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-military-navy mt-0.5" />
                    <p className="text-sm font-medium">{selectedBroadcast.summary}</p>
                  </div>
                </div>
                
                <div className="my-6 whitespace-pre-line">
                  {selectedBroadcast.content}
                </div>
                
                {selectedBroadcast.attachments && selectedBroadcast.attachments.length > 0 && (
                  <div className="mt-6 border rounded-md">
                    <div className="bg-military-beige/30 p-3 rounded-t-md">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Attachments ({selectedBroadcast.attachments.length})
                      </h4>
                    </div>
                    <div className="p-3">
                      {selectedBroadcast.attachments.map((attachment, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-military-navy" />
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => downloadAttachment(attachment.name)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadcasts;
