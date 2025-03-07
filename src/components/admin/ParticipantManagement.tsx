
import React from "react";
import { Search, Filter, Download, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const ParticipantManagement = () => {
  // Sample participant data
  const participants = [
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
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Participant Management
        </h2>
        <Button className="bg-military-navy hover:bg-military-navy/90">
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
              {participants.map((participant) => (
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
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Message</Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing 5 of 32 participants
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-military-navy text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantManagement;
