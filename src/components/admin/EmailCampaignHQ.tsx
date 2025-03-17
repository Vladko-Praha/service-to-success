import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Users, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  BarChart3, 
  Zap, 
  Clock, 
  FileText, 
  List,
  Search,
  Send,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ListChecks
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data
const campaigns = [
  { 
    id: 1, 
    name: "Welcome to Veteran Ops", 
    status: "active", 
    type: "automation", 
    sent: 320, 
    opened: 258, 
    clicked: 186, 
    lastSent: "2023-08-15" 
  },
  { 
    id: 2, 
    name: "Mission Briefing: August Edition", 
    status: "draft", 
    type: "campaign", 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    lastSent: "-" 
  },
  { 
    id: 3, 
    name: "Business Training Resources", 
    status: "completed", 
    type: "campaign", 
    sent: 156, 
    opened: 132, 
    clicked: 98, 
    lastSent: "2023-08-10" 
  },
  { 
    id: 4, 
    name: "Graduation Countdown", 
    status: "active", 
    type: "automation", 
    sent: 64, 
    opened: 58, 
    clicked: 42, 
    lastSent: "2023-08-14" 
  },
  { 
    id: 5, 
    name: "Job Placement Opportunities", 
    status: "scheduled", 
    type: "campaign", 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    lastSent: "Scheduled for 2023-08-20" 
  },
];

const segments = [
  { id: 1, name: "All Participants", count: 498, description: "All active program participants" },
  { id: 2, name: "Cohort #8", count: 124, description: "Current cohort participants" },
  { id: 3, name: "Progress > 75%", count: 186, description: "Participants with over 75% program completion" },
  { id: 4, name: "Business Plan Submitted", count: 142, description: "Participants who submitted business plans" },
  { id: 5, name: "Inactive > 14 Days", count: 28, description: "Participants inactive for more than 14 days" },
];

const templates = [
  { id: 1, name: "Mission Briefing", category: "Newsletter", lastUsed: "2023-08-12" },
  { id: 2, name: "Welcome Sequence", category: "Automation", lastUsed: "2023-08-15" },
  { id: 3, name: "Resource Announcement", category: "Announcement", lastUsed: "2023-07-28" },
  { id: 4, name: "Graduation Countdown", category: "Automation", lastUsed: "2023-08-14" },
  { id: 5, name: "Feedback Request", category: "Engagement", lastUsed: "2023-08-05" },
];

const emailSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  subject: z.string().min(1, "Subject line is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Invalid email address"),
  segment: z.string().min(1, "Must select an audience segment"),
  content: z.string().optional(),
  scheduledDate: z.string().optional(),
  templateId: z.string().optional(),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const EmailCampaignHQ = () => {
  const [activeView, setActiveView] = useState("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      subject: "",
      fromName: "Veteran Ops Command",
      fromEmail: "command@veteranops.org",
      segment: "",
      content: "",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    console.log("Campaign data:", data);
    toast({
      title: "Campaign created",
      description: `${data.name} has been created and saved as a draft.`,
    });
    setShowNewCampaign(false);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800 border-green-300",
      draft: "bg-gray-100 text-gray-800 border-gray-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      scheduled: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Email Campaign Headquarters
        </h2>
        <Button 
          className="bg-military-navy hover:bg-military-navy/90"
          onClick={() => setShowNewCampaign(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid grid-cols-4 bg-military-beige/30">
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Mail className="mr-2 h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Zap className="mr-2 h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="audiences" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Users className="mr-2 h-4 w-4" />
            Audiences
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>
      
        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          {!showNewCampaign ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>Manage your email marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between">
                  <div className="relative w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search campaigns..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Create
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => setShowNewCampaign(true)}>
                          <Mail className="mr-2 h-4 w-4" />
                          New Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Zap className="mr-2 h-4 w-4" />
                          New Automation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="bg-military-beige/20 hover:bg-military-beige/30">
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Opened</TableHead>
                      <TableHead>Clicked</TableHead>
                      <TableHead>Last Sent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-military-beige/10">
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell className="capitalize">{campaign.type}</TableCell>
                        <TableCell>{campaign.sent}</TableCell>
                        <TableCell>{campaign.opened}</TableCell>
                        <TableCell>{campaign.clicked}</TableCell>
                        <TableCell>{campaign.lastSent}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>Set up your email campaign details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Campaign Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., August Mission Briefing" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject Line</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Your Mission Briefing for August" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fromName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fromEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="segment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audience Segment</FormLabel>
                          <div className="grid gap-4 py-4">
                            {segments.map(segment => (
                              <div key={segment.id} className="flex items-center gap-4">
                                <input
                                  type="radio"
                                  id={`segment-${segment.id}`}
                                  name="segment"
                                  value={segment.id.toString()}
                                  className="h-4 w-4 border-gray-300 text-military-olive focus:ring-military-olive"
                                  onChange={() => field.onChange(segment.id.toString())}
                                  checked={field.value === segment.id.toString()}
                                />
                                <div className="flex-1">
                                  <Label htmlFor={`segment-${segment.id}`} className="text-base font-medium">
                                    {segment.name}
                                    <span className="ml-2 text-sm text-muted-foreground">({segment.count})</span>
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{segment.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="templateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Template</FormLabel>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div 
                              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 hover:bg-military-beige/10 cursor-pointer ${field.value === "new" ? "border-military-olive bg-military-beige/10" : "border-gray-300"}`}
                              onClick={() => field.onChange("new")}
                            >
                              <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                              <span className="text-sm font-medium">Create New</span>
                            </div>
                            
                            {templates.map(template => (
                              <div 
                                key={template.id}
                                className={`flex flex-col rounded-lg border p-4 hover:bg-military-beige/10 cursor-pointer ${field.value === template.id.toString() ? "border-military-olive bg-military-beige/10" : "border-gray-200"}`}
                                onClick={() => field.onChange(template.id.toString())}
                              >
                                <div className="mb-2 h-24 rounded bg-gray-100 flex items-center justify-center">
                                  <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <span className="font-medium">{template.name}</span>
                                <span className="text-xs text-muted-foreground">{template.category}</span>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowNewCampaign(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-military-olive hover:bg-military-olive/90">
                        Create Campaign
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      
        {/* Automation Tab */}
        <TabsContent value="automation">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Email Automation</CardTitle>
              <CardDescription>Create automated email sequences and customer journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search automations..." className="pl-8" />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Automation
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Welcome Sequence */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Welcome Sequence</CardTitle>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger: New participant registration</p>
                          <p className="text-sm font-medium">4 emails over 14 days</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">1</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">2</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">3</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">4</div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Day 0</span>
                          <span>Day 3</span>
                          <span>Day 7</span>
                          <span>Day 14</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium">Performance</p>
                        <div className="mt-1 flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Sent</p>
                            <p className="font-medium">320</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Opened</p>
                            <p className="font-medium">86%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Clicked</p>
                            <p className="font-medium">64%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Graduation Countdown */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Graduation Countdown</CardTitle>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger: 30 days before graduation</p>
                          <p className="text-sm font-medium">5 emails over 30 days</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">1</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">2</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">3</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">4</div>
                          <div className="h-0.5 flex-1 bg-military-olive"></div>
                          <div className="h-6 w-6 rounded-full bg-military-olive flex items-center justify-center text-white text-xs">5</div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Day 0</span>
                          <span>Day 7</span>
                          <span>Day 14</span>
                          <span>Day 21</span>
                          <span>Day 30</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium">Performance</p>
                        <div className="mt-1 flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Sent</p>
                            <p className="font-medium">64</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Opened</p>
                            <p className="font-medium">92%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Clicked</p>
                            <p className="font-medium">78%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Inactive Participant Recovery */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Inactive Recovery</CardTitle>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Draft</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger: No login for 14 days</p>
                          <p className="text-sm font-medium">3 emails over 10 days</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">1</div>
                          <div className="h-0.5 flex-1 bg-gray-300"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">2</div>
                          <div className="h-0.5 flex-1 bg-gray-300"></div>
                          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">3</div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Day 0</span>
                          <span>Day 5</span>
                          <span>Day 10</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-2">
                        <Button size="sm">
                          <Zap className="mr-2 h-4 w-4" />
                          Activate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Create New Automation Button Card */}
                <Card className="flex h-full flex-col items-center justify-center border-2 border-dashed p-6">
                  <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-center font-medium">Create New Automation</p>
                  <p className="text-center text-sm text-muted-foreground">Set up automated email sequences</p>
                  <Button className="mt-4" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Audiences Tab */}
        <TabsContent value="audiences">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage and segment your participant lists</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid gap-6 md:grid-cols-3">
                {/* All Participants Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">All Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold">498</span>
                        <span className="text-sm text-green-600">+12 this week</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active</span>
                          <span>470 (94%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Inactive</span>
                          <span>28 (6%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Email engagement</span>
                          <span>82%</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cohort Groups Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cohort Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold">4</span>
                        <span className="text-sm">Active Cohorts</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cohort #8</span>
                          <span>124 participants</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cohort #7</span>
                          <span>118 participants</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cohort #6</span>
                          <span>132 participants</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Custom Segments Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Custom Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold">8</span>
                        <Button size="sm" variant="ghost">
                          <Plus className="h-4 w-4" />
                          Create
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress > 75%</span>
                          <span>186 participants</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Business Plan Submitted</span>
                          <span>142 participants</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Inactive > 14 Days</span>
                          <span>28 participants</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <ChevronRight className="h-4 w-4" />
                          View All
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Audience Segments</h3>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Segment
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="bg-military-beige/20 hover:bg-military-beige/30">
                      <TableHead>Segment Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Campaign</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segments.map((segment) => (
                      <TableRow key={segment.id} className="hover:bg-military-beige/10">
                        <TableCell className="font-medium">{segment.name}</TableCell>
                        <TableCell>{segment.id === 1 || segment.id === 2 ? "System" : "Custom"}</TableCell>
                        <TableCell>{segment.count}</TableCell>
                        <TableCell>2023-07-{10 + segment.id}</TableCell>
                        <TableCell>{segment.id === 5 ? "Never" : `2023-08-${segment.id < 3 ? "14" : "10"}`}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Mail className="h-4 w-4" />
