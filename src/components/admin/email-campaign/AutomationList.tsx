
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Search, Plus, Edit, Zap, ChevronRight, Mail, MailCheck, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
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
            <CardDescription>Create automated email sequences triggered by subscriber actions</CardDescription>
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
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {/* Render automations with new design */}
              {automationData.map((automation) => (
                <Card key={automation.id} className="overflow-hidden border-2 hover:border-military-olive/50 transition-all">
                  <CardHeader className="bg-gray-50 pb-2 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MailCheck className={`h-5 w-5 ${automation.status === 'active' ? 'text-military-olive' : 'text-gray-400'}`} />
                        <CardTitle className="text-base">{automation.name}</CardTitle>
                      </div>
                      <Badge className={`${
                        automation.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      }`}>
                        {automation.status === 'active' ? 'Active' : 'Draft'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                            Trigger: {automation.trigger}
                          </p>
                          <p className="text-sm font-medium flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            {automation.emailCount} emails over {automation.duration} days
                          </p>
                        </div>
                      </div>
                      
                      {/* Timeline visualization */}
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-1">
                          {automation.steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                              <div className="flex flex-col items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-xs ${
                                  automation.status === 'active' ? 'bg-military-olive' : 'bg-gray-400'
                                }`}>
                                  <Mail className="h-5 w-5" />
                                </div>
                                <span className="text-xs mt-1">Day {step.delayDays}</span>
                              </div>
                              {index < automation.steps.length - 1 && (
                                <div className="flex-1 flex items-center">
                                  <div className={`h-0.5 w-full ${
                                    automation.status === 'active' ? 'bg-military-olive' : 'bg-gray-300'
                                  }`}></div>
                                  <ChevronRight className={`h-4 w-4 ${
                                    automation.status === 'active' ? 'text-military-olive' : 'text-gray-300'
                                  }`} />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      
                      {automation.status === 'active' && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-2">Performance</p>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Sent</p>
                              <p className="font-medium">{automation.sent || 0}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Opened</p>
                              <p className="font-medium">
                                {automation.opened && automation.sent 
                                  ? `${Math.round((automation.opened / automation.sent) * 100)}%` 
                                  : '0%'}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">Clicked</p>
                              <p className="font-medium">
                                {automation.clicked && automation.sent 
                                  ? `${Math.round((automation.clicked / automation.sent) * 100)}%` 
                                  : '0%'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 justify-end gap-2 py-3">
                    <Button variant="outline" size="sm" onClick={() => handleEditAutomation(automation.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    {automation.status !== 'active' && (
                      <Button size="sm" className="bg-military-olive hover:bg-military-olive/90" onClick={() => handleActivateAutomation(automation.id)}>
                        <Zap className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {/* Create New Automation Button Card */}
              <Card 
                className="flex h-full flex-col items-center justify-center border-2 border-dashed p-6 cursor-pointer hover:border-military-olive/50 transition-all"
                onClick={handleCreateAutomation}  
              >
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-military-olive" />
                </div>
                <p className="text-center font-medium">Create New Automation</p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  Set up automated email sequences based on triggers
                </p>
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
