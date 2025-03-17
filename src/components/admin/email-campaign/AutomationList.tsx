
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Edit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AutomationList = () => {
  const { toast } = useToast();

  const handleCreateAutomation = () => {
    toast({
      title: "Coming Soon",
      description: "Create new automation feature will be available in the next update.",
    });
  };

  const handleEditAutomation = () => {
    toast({
      title: "Coming Soon",
      description: "Edit automation feature will be available in the next update.",
    });
  };

  const handleActivateAutomation = () => {
    toast({
      title: "Coming Soon",
      description: "Activate automation feature will be available in the next update.",
    });
  };

  return (
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
          <Button onClick={handleCreateAutomation}>
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
                  <Button variant="outline" size="sm" onClick={handleEditAutomation}>
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
                  <Button variant="outline" size="sm" onClick={handleEditAutomation}>
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
                  <Button variant="outline" size="sm" onClick={handleEditAutomation}>
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
                  <Button size="sm" onClick={handleActivateAutomation}>
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
            <Button className="mt-4" variant="outline" onClick={handleCreateAutomation}>
              <Plus className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationList;
