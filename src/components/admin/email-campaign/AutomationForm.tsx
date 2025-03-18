
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, PlusCircle, ArrowLeft, Mail, Clock, AlertCircle, ChevronRight, Tag, Plus } from "lucide-react";
import { AutomationFormValues, AutomationStepInput, Automation } from "./types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AutomationFormProps {
  automation?: Automation;
  onSubmit: (data: AutomationFormValues) => void;
  onCancel: () => void;
}

const triggerOptions = [
  { value: "New participant signup", label: "New participant signup" },
  { value: "Course completion", label: "Course completion" },
  { value: "Form submission", label: "Form submission" },
  { value: "Website visit", label: "Website visit" },
  { value: "Resource download", label: "Resource download" },
  { value: "Tag added", label: "Tag added" },
];

const AutomationForm: React.FC<AutomationFormProps> = ({ automation, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<AutomationFormValues>(() => {
    if (automation) {
      return {
        name: automation.name,
        trigger: automation.trigger,
        status: automation.status,
        steps: automation.steps.map(step => ({
          delayDays: step.delayDays,
          emailName: step.emailName
        })),
        tags: automation.tags || []
      };
    }
    return {
      name: "",
      trigger: "New participant signup",
      status: "draft",
      steps: [{ delayDays: 0, emailName: "Welcome Email" }],
      tags: []
    };
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStepChange = (index: number, field: keyof AutomationStepInput, value: string | number) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setFormData({ ...formData, steps: updatedSteps });
  };

  const addStep = () => {
    const lastStep = formData.steps[formData.steps.length - 1];
    const newDelayDays = lastStep ? lastStep.delayDays + 3 : 0;
    setFormData({
      ...formData,
      steps: [...formData.steps, { delayDays: newDelayDays, emailName: "" }]
    });
  };

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      setFormData({ ...formData, steps: updatedSteps });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2 p-0 h-8 w-8" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{automation ? `Edit ${automation.name}` : "Create New Automation"}</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Automation Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Welcome Sequence"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="trigger" className="text-base font-medium">Trigger Event</Label>
                <Select
                  value={formData.trigger}
                  onValueChange={value => handleInputChange("trigger", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  This event will start the automation sequence for each participant
                </p>
              </div>
              
              <div>
                <Label htmlFor="status" className="text-base font-medium">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={value => handleInputChange("status", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.status === "draft" ? 
                    "Draft automations won't send emails until activated" : 
                    "Active automations will immediately start sending emails"}
                </p>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <Trash className="h-3 w-3 text-destructive" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Add tags to categorize this automation
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-base font-medium mb-3">Automation Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Trigger:</span>
                  <span className="ml-2 font-medium">{formData.trigger || "Not specified"}</span>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center text-sm mb-3">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Timeline:</span>
                    <span className="ml-2 font-medium">{formData.steps.length} emails over {Math.max(...formData.steps.map(s => s.delayDays))} days</span>
                  </div>
                  
                  <div className="flex items-center gap-1 overflow-x-auto pb-2">
                    {formData.steps.map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center min-w-fit">
                          <div className="h-10 w-10 rounded-full bg-military-olive flex items-center justify-center text-white">
                            <Mail className="h-5 w-5" />
                          </div>
                          <span className="text-xs mt-1">Day {step.delayDays}</span>
                        </div>
                        {index < formData.steps.length - 1 && (
                          <div className="flex-1 flex items-center min-w-8">
                            <div className="h-0.5 w-full bg-military-olive"></div>
                            <ChevronRight className="h-4 w-4 text-military-olive flex-shrink-0" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center text-sm mb-2">
                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Sequence</h3>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Email
              </Button>
            </div>

            {formData.steps.map((step, index) => (
              <Card key={index} className="overflow-hidden border">
                <CardHeader className="bg-gray-50 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-military-olive text-white flex items-center justify-center mr-2">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                      <h4 className="font-medium">Email {index + 1}</h4>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStep(index)}
                      disabled={formData.steps.length <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`delay-${index}`}>Send After (days)</Label>
                      <Input
                        id={`delay-${index}`}
                        type="number"
                        min={0}
                        value={step.delayDays}
                        onChange={e => handleStepChange(index, "delayDays", parseInt(e.target.value))}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Days after the trigger event
                      </p>
                    </div>
                    <div>
                      <Label htmlFor={`email-${index}`}>Email Name</Label>
                      <Input
                        id={`email-${index}`}
                        value={step.emailName}
                        onChange={e => handleStepChange(index, "emailName", e.target.value)}
                        placeholder="e.g., Welcome Email"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Descriptive name for this email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-gray-50 py-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-military-olive hover:bg-military-olive/90">
            {automation ? "Update Automation" : "Create Automation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AutomationForm;
