
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Edit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AutomationForm from "./AutomationForm";
import { Automation, AutomationFormValues } from "./types";
import { automations } from "./data";

interface AutomationListProps {
  onEditAutomation?: (id: number) => void;
}

const AutomationList: React.FC<AutomationListProps> = ({ onEditAutomation }) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [currentAutomation, setCurrentAutomation] = useState<Automation | undefined>();
  const [automationData, setAutomationData] = useState<Automation[]>(automations);

  const handleCreateAutomation = () => {
    setCurrentAutomation(undefined);
    setShowForm(true);
  };

  const handleEditAutomation = (id: number) => {
    const automationToEdit = automationData.find(auto => auto.id === id);
    if (automationToEdit) {
      setCurrentAutomation(automationToEdit);
      setShowForm(true);
    }
  };

  const handleActivateAutomation = (id: number) => {
    // Find the automation to activate
    const updatedAutomations = automationData.map(auto => 
      auto.id === id ? { ...auto, status: "active" as const } : auto
    );
    
    setAutomationData(updatedAutomations);
    
    toast({
      title: "Automation Activated",
      description: "The automation has been activated and is now running.",
    });
  };

  const handleFormSubmit = (data: AutomationFormValues) => {
    if (currentAutomation) {
      // Update existing automation
      const updatedAutomations = automationData.map(auto => 
        auto.id === currentAutomation.id 
          ? { 
              ...auto, 
              name: data.name, 
              trigger: data.trigger, 
              status: data.status,
              emailCount: data.steps.length,
              duration: Math.max(...data.steps.map(step => step.delayDays)),
              steps: data.steps.map((step, index) => ({
                id: index + 1,
                order: index + 1,
                delayDays: step.delayDays,
                emailName: step.emailName
              }))
            }
          : auto
      );
      setAutomationData(updatedAutomations);
      
      toast({
        title: "Automation Updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Create new automation
      const newAutomation: Automation = {
        id: Math.max(...automationData.map(a => a.id)) + 1,
        name: data.name,
        status: data.status,
        trigger: data.trigger,
        emailCount: data.steps.length,
        duration: Math.max(...data.steps.map(step => step.delayDays)),
        steps: data.steps.map((step, index) => ({
          id: index + 1,
          order: index + 1,
          delayDays: step.delayDays,
          emailName: step.emailName
        }))
      };
      
      setAutomationData([...automationData, newAutomation]);
      
      toast({
        title: "Automation Created",
        description: `${data.name} has been created successfully.`,
      });
    }
    
    setShowForm(false);
    setCurrentAutomation(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentAutomation(undefined);
  };

  return (
    <Card>
      {!showForm ? (
        <>
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
              {/* Render automations */}
              {automationData.map((automation) => (
                <Card key={automation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{automation.name}</CardTitle>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        automation.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {automation.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger: {automation.trigger}</p>
                          <p className="text-sm font-medium">{automation.emailCount} emails over {automation.duration} days</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditAutomation(automation.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {automation.steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${
                                automation.status === 'active' ? 'bg-military-olive' : 'bg-gray-300'
                              }`}>
                                {index + 1}
                              </div>
                              {index < automation.steps.length - 1 && (
                                <div className={`h-0.5 flex-1 ${
                                  automation.status === 'active' ? 'bg-military-olive' : 'bg-gray-300'
                                }`}></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          {automation.steps.map((step, index) => (
                            <span key={step.id}>
                              {index === 0 ? 'Day 0' : `Day ${step.delayDays}`}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {automation.status === 'active' ? (
                        <div className="pt-2">
                          <p className="text-sm font-medium">Performance</p>
                          <div className="mt-1 flex items-center gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Sent</p>
                              <p className="font-medium">{automation.sent}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Opened</p>
                              <p className="font-medium">
                                {automation.opened && automation.sent 
                                  ? `${Math.round((automation.opened / automation.sent) * 100)}%` 
                                  : '0%'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Clicked</p>
                              <p className="font-medium">
                                {automation.clicked && automation.sent 
                                  ? `${Math.round((automation.clicked / automation.sent) * 100)}%` 
                                  : '0%'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center pt-2">
                          <Button size="sm" onClick={() => handleActivateAutomation(automation.id)}>
                            <Zap className="mr-2 h-4 w-4" />
                            Activate
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
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
        </>
      ) : (
        <AutomationForm
          automation={currentAutomation}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      )}
    </Card>
  );
};

export default AutomationList;
