
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormValues, EmailTemplate, Segment } from "./types";

const emailSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  subject: z.string().min(1, "Subject line is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Invalid email address"),
  segment: z.string().min(1, "Must select an audience segment"),
  content: z.string().optional(),
  scheduledDate: z.string().optional(),
  templateId: z.string().optional(),
});

interface CampaignFormProps {
  templates: EmailTemplate[];
  segments: Segment[];
  onSubmit: (data: EmailFormValues) => void;
  onCancel: () => void;
}

const CampaignForm = ({ templates, segments, onSubmit, onCancel }: CampaignFormProps) => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      subject: "",
      fromName: "Veteran Ops Command",
      fromEmail: "command@veteranops.org",
      segment: "",
      content: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
        <CardDescription>Set up your email campaign details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., August Mission Briefing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Line</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Your Mission Briefing for August" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fromName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fromEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="segment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audience Segment</FormLabel>
                  <div className="grid gap-4 py-4">
                    {segments.map(segment => (
                      <div key={segment.id} className="flex items-center gap-4">
                        <input
                          type="radio"
                          id={`segment-${segment.id}`}
                          name="segment"
                          value={segment.id.toString()}
                          className="h-4 w-4 border-gray-300 text-military-olive focus:ring-military-olive"
                          onChange={() => field.onChange(segment.id.toString())}
                          checked={field.value === segment.id.toString()}
                        />
                        <div className="flex-1">
                          <Label htmlFor={`segment-${segment.id}`} className="text-base font-medium">
                            {segment.name}
                            <span className="ml-2 text-sm text-muted-foreground">({segment.count})</span>
                          </Label>
                          <p className="text-sm text-muted-foreground">{segment.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Template</FormLabel>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div 
                      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 hover:bg-military-beige/10 cursor-pointer ${field.value === "new" ? "border-military-olive bg-military-beige/10" : "border-gray-300"}`}
                      onClick={() => field.onChange("new")}
                    >
                      <Plus className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm font-medium">Create New</span>
                    </div>
                    
                    {templates.map(template => (
                      <div 
                        key={template.id}
                        className={`flex flex-col rounded-lg border p-4 hover:bg-military-beige/10 cursor-pointer ${field.value === template.id.toString() ? "border-military-olive bg-military-beige/10" : "border-gray-200"}`}
                        onClick={() => field.onChange(template.id.toString())}
                      >
                        <div className="mb-2 h-24 rounded bg-gray-100 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <span className="font-medium">{template.name}</span>
                        <span className="text-xs text-muted-foreground">{template.category}</span>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-military-olive hover:bg-military-olive/90">
                Create Campaign
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CampaignForm;
