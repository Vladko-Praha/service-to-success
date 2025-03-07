
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Settings, Calendar, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdministrativeFunctions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Administrative Functions
        </h2>
        <Button className="bg-military-navy hover:bg-military-navy/90">
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="schedule">Program Schedule</TabsTrigger>
          <TabsTrigger value="finance">Financial Tracking</TabsTrigger>
          <TabsTrigger value="staff">Staff Management</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Access Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button size="sm" className="bg-military-olive hover:bg-military-olive/90">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                  <div>User</div>
                  <div>Role</div>
                  <div>Last Login</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 px-4 py-3 text-sm">
                    <div className="font-medium">COL James Anderson</div>
                    <div>Program Administrator</div>
                    <div>2 hours ago</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Reset</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-3 text-sm">
                    <div className="font-medium">MAJ Lisa Williams</div>
                    <div>Curriculum Manager</div>
                    <div>Yesterday</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Reset</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-3 text-sm">
                    <div className="font-medium">CPT Robert Johnson</div>
                    <div>Mentor</div>
                    <div>3 days ago</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Reset</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 px-4 py-3 text-sm">
                    <div className="font-medium">1SG Thomas Davis</div>
                    <div>Instructor</div>
                    <div>1 day ago</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Reset</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-military-olive" />
                Program Calendar Management
              </CardTitle>
              <CardDescription>Schedule and manage program events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-6 flex justify-center items-center">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-2 text-military-navy/30" />
                  <p className="font-medium">Program calendar would display here</p>
                  <p className="text-sm text-muted-foreground">Interactive calendar with drag-and-drop scheduling</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-military-olive" />
                Budget Tracking
              </CardTitle>
              <CardDescription>Financial planning and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Program Budget Overview</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium">Total Budget</p>
                      <p className="text-2xl font-bold">$875,000</p>
                      <p className="text-xs text-muted-foreground">Fiscal Year 2023</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium">Spent to Date</p>
                      <p className="text-2xl font-bold">$426,750</p>
                      <p className="text-xs text-muted-foreground">48.8% of total</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[48.8%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm font-medium">Projected Year-End</p>
                      <p className="text-2xl font-bold">$852,500</p>
                      <p className="text-xs text-muted-foreground">97.4% of budget</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Budget Allocation</h3>
                  <div className="rounded-lg border p-4">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Personnel & Instruction</p>
                          <p className="text-sm font-medium">42%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div className="h-full w-[42%] rounded-full bg-military-navy"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Curriculum & Resources</p>
                          <p className="text-sm font-medium">25%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div className="h-full w-[25%] rounded-full bg-military-olive"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Technology & Platform</p>
                          <p className="text-sm font-medium">18%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div className="h-full w-[18%] rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Events & Activities</p>
                          <p className="text-sm font-medium">10%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div className="h-full w-[10%] rounded-full bg-amber-500"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Administrative</p>
                          <p className="text-sm font-medium">5%</p>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                          <div className="h-full w-[5%] rounded-full bg-gray-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-military-olive" />
                Staff Management
              </CardTitle>
              <CardDescription>Manage program staff and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                  <div>Staff Member</div>
                  <div>Role</div>
                  <div>Specialization</div>
                  <div>Current Assignment</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 px-4 py-3 text-sm">
                    <div className="font-medium">MAJ Lisa Williams</div>
                    <div>Curriculum Manager</div>
                    <div>Business Planning</div>
                    <div>Cohort #8, Modules 1-4</div>
                    <div>
                      <Button variant="ghost" size="sm">Re-assign</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 px-4 py-3 text-sm">
                    <div className="font-medium">CPT Robert Johnson</div>
                    <div>Mentor</div>
                    <div>Financial Planning</div>
                    <div>8 participants, Cohort #8</div>
                    <div>
                      <Button variant="ghost" size="sm">Re-assign</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 px-4 py-3 text-sm">
                    <div className="font-medium">1SG Thomas Davis</div>
                    <div>Instructor</div>
                    <div>Market Research</div>
                    <div>Module 3, All Cohorts</div>
                    <div>
                      <Button variant="ghost" size="sm">Re-assign</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 px-4 py-3 text-sm">
                    <div className="font-medium">SFC Jessica Martinez</div>
                    <div>Instructor</div>
                    <div>Marketing Strategy</div>
                    <div>Module 6, Cohort #7-8</div>
                    <div>
                      <Button variant="ghost" size="sm">Re-assign</Button>
                    </div>
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

export default AdministrativeFunctions;
