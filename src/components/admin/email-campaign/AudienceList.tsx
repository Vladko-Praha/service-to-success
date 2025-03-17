
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Edit, Trash2, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Segment } from "./types";
import { useToast } from "@/hooks/use-toast";

interface AudienceListProps {
  segments: Segment[];
}

const AudienceList = ({ segments }: AudienceListProps) => {
  const { toast } = useToast();

  const handleCreateSegment = () => {
    toast({
      title: "Coming Soon",
      description: "Create new segment feature will be available in the next update.",
    });
  };

  const handleViewAllSegments = () => {
    toast({
      title: "Coming Soon",
      description: "View all segments feature will be available in the next update.",
    });
  };

  const handleManageSegment = () => {
    toast({
      title: "Coming Soon",
      description: "Manage segment feature will be available in the next update.",
    });
  };

  const handleEmailSegment = (id: number) => {
    toast({
      title: "Email Segment",
      description: `Creating a new campaign for segment ${id}`,
    });
  };

  const handleEditSegment = (id: number) => {
    toast({
      title: "Coming Soon",
      description: `Edit segment ${id} feature will be available in the next update.`,
    });
  };

  const handleDeleteSegment = (id: number) => {
    toast({
      title: "Coming Soon",
      description: `Delete segment ${id} feature will be available in the next update.`,
    });
  };

  return (
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
                  <Button variant="outline" size="sm" onClick={handleManageSegment}>
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
                  <Button variant="outline" size="sm" onClick={handleManageSegment}>
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
                  <Button size="sm" variant="ghost" onClick={handleCreateSegment}>
                    <Plus className="h-4 w-4" />
                    Create
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress &gt; 75%</span>
                    <span>186 participants</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Business Plan Submitted</span>
                    <span>142 participants</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Inactive &gt; 14 Days</span>
                    <span>28 participants</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={handleViewAllSegments}>
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
            <Button size="sm" onClick={handleCreateSegment}>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEmailSegment(segment.id)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditSegment(segment.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteSegment(segment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceList;
