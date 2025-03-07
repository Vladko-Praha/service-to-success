
import React from "react";
import { Book, Calendar, FileText, FolderPlus, BarChart2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CurriculumCommandPost = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Curriculum Command Post
        </h2>
        <div className="flex items-center gap-2">
          <Button className="bg-military-olive hover:bg-military-olive/90">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Module
          </Button>
        </div>
      </div>

      <Tabs defaultValue="modules">
        <TabsList className="mb-4">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="modules">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className={`${index < 3 ? 'bg-military-navy/10' : ''}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle>Module {index + 1}</CardTitle>
                    <div className="rounded-full px-2 py-1 text-xs bg-military-navy text-military-sand">
                      {index < 3 ? 'Deployed' : index === 3 ? 'Active' : 'Upcoming'}
                    </div>
                  </div>
                  <CardDescription>
                    {index === 0 && 'Military to Business Mindset'}
                    {index === 1 && 'Mission Analysis & Opportunity Identification'}
                    {index === 2 && 'Market Research Operations'}
                    {index === 3 && 'Business Model Development'}
                    {index === 4 && 'Financial Planning & Strategy'}
                    {index === 5 && 'Marketing & Customer Acquisition'}
                    {index === 6 && 'Operational Planning'}
                    {index === 7 && 'Launch Preparation & Execution'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-military-olive" />
                      <span className="text-sm">
                        {index < 3 ? 'Completed' : index === 3 ? 'Week 2 of 3' : `Starts ${3 + index} weeks from now`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-military-olive" />
                      <span className="text-sm">{4 + index} lessons</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 mb-3">
                    <div 
                      className="h-full rounded-full bg-military-olive" 
                      style={{ width: `${index < 3 ? 100 : index === 3 ? 65 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {index < 3 ? 'Completion rate: 98%' : index === 3 ? 'In progress' : 'Not started'}
                    </span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
              <CardDescription>Create, edit, and track assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Select a module above to manage its assignments.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>Manage educational resources and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Select a module above to manage its resources.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Curriculum Performance Analytics</CardTitle>
                <CardDescription>Insights into curriculum effectiveness</CardDescription>
              </div>
              <BarChart2 className="h-5 w-5 text-military-olive" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Module Completion Rates</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-28 text-sm">Module {index + 1}</div>
                        <div className="flex-1 h-8 bg-slate-100 rounded-md">
                          <div 
                            className="h-full rounded-md bg-military-olive flex items-center justify-end px-2"
                            style={{ width: `${98 - index * 5}%` }}
                          >
                            <span className="text-xs font-medium text-white">{98 - index * 5}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold">Average Time Spent Per Module</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-28 text-sm">Module {index + 1}</div>
                        <div className="flex-1 h-8 bg-slate-100 rounded-md">
                          <div 
                            className="h-full rounded-md bg-military-navy flex items-center justify-end px-2"
                            style={{ width: `${70 + index * 10}%` }}
                          >
                            <span className="text-xs font-medium text-white">{14 + index * 2} hours</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CurriculumCommandPost;
