
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, MessageSquare, BarChart2 } from "lucide-react";

const AICoachManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          AI Coach Management System
        </h2>
        <div className="flex items-center gap-2 bg-military-navy/10 px-4 py-2 rounded-md">
          <Cpu className="h-5 w-5 text-military-navy" />
          <span className="text-sm font-medium">AI Battle Buddy v2.4</span>
        </div>
      </div>
      
      <Tabs defaultValue="metrics">
        <TabsList className="mb-4">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="responses">Response Management</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
          <TabsTrigger value="override">Manual Override</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>AI Coach Interaction Metrics</CardTitle>
              <CardDescription>Performance and usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Total Interactions</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">24,876</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Resolution Rate</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">92%</p>
                    <p className="text-xs text-muted-foreground">Issues resolved without human intervention</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Satisfaction Score</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">4.8/5</p>
                    <p className="text-xs text-muted-foreground">Based on 5,420 ratings</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 font-medium">Common Questions by Category</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Business Plan Development</p>
                        <p className="text-sm font-medium">32%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[32%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Financial Planning</p>
                        <p className="text-sm font-medium">24%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[24%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Marketing Strategy</p>
                        <p className="text-sm font-medium">18%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[18%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Legal & Administrative</p>
                        <p className="text-sm font-medium">14%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[14%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Other Topics</p>
                        <p className="text-sm font-medium">12%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[12%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Response Customization</CardTitle>
              <CardDescription>Manage AI response patterns and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Response management interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Data Management</CardTitle>
              <CardDescription>Update and improve AI coach training data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Training data management interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="override">
          <Card>
            <CardHeader>
              <CardTitle>Manual Override Console</CardTitle>
              <CardDescription>Step in to handle complex participant interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Manual override interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AICoachManagement;
