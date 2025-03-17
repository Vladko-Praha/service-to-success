
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, PlusCircle } from "lucide-react";
import { AutomationFormValues, AutomationStepInput, Automation } from "./types";

interface AutomationFormProps {
  automation?: Automation;
  onSubmit: (data: AutomationFormValues) => void;
  onCancel: () => void;
}

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
        }))
      };
    }
    return {
      name: "",
      trigger: "",
      status: "draft",
      steps: [{ delayDays: 0, emailName: "" }]
    };
  });

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
    const newDelayDays = lastStep ? lastStep.delayDays + 7 : 0;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{automation ? `Edit ${automation.name}` : "Create New Automation"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Automation Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="e.g., Welcome Sequence"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="trigger">Trigger</Label>
              <Input
                id="trigger"
                value={formData.trigger}
                onChange={e => handleInputChange("trigger", e.target.value)}
                placeholder="e.g., New participant registration"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={value => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Sequence</h3>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>

            {formData.steps.map((step, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Step {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStep(index)}
                    disabled={formData.steps.length <= 1}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`delay-${index}`}>Delay (days)</Label>
                    <Input
                      id={`delay-${index}`}
                      type="number"
                      min={0}
                      value={step.delayDays}
                      onChange={e => handleStepChange(index, "delayDays", parseInt(e.target.value))}
                      required
                    />
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {automation ? "Update Automation" : "Create Automation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AutomationForm;
