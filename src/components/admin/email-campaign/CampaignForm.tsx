
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Paperclip, Link, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormValues, EmailTemplate, Segment, Attachment, SOPLink } from "./types";
import { Textarea } from "@/components/ui/textarea";

const emailSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  subject: z.string().min(1, "Subject line is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Invalid email address"),
  segment: z.string().min(1, "Must select an audience segment"),
  content: z.string().optional(),
  scheduledDate: z.string().optional(),
  templateId: z.string().optional(),
  attachments: z.array(z.object({
    id: z.number(),
    name: z.string(),
    fileSize: z.string(),
    fileType: z.string(),
    url: z.string()
  })).optional(),
  sopLinks: z.array(z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string()
  })).optional(),
});

interface CampaignFormProps {
  templates: EmailTemplate[];
  segments: Segment[];
  onSubmit: (data: EmailFormValues) => void;
  onCancel: () => void;
}

const CampaignForm = ({ templates, segments, onSubmit, onCancel }: CampaignFormProps) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [showSOPLinks, setShowSOPLinks] = useState(false);
  
  // Mock SOP repository items
  const sopRepositoryItems = [
    { id: 1, title: "Onboarding Procedures", description: "Standard operating procedures for onboarding new participants", url: "/sop/onboarding" },
    { id: 2, title: "Business Plan Template", description: "Official template for creating a business plan", url: "/sop/business-plan" },
    { id: 3, title: "Graduation Requirements", description: "Checklist of graduation requirements", url: "/sop/graduation" },
    { id: 4, title: "Mentor Contact Protocol", description: "Guidelines for contacting mentors", url: "/sop/mentor-protocol" },
    { id: 5, title: "Resource Request Form", description: "Form for requesting additional resources", url: "/sop/resource-request" },
  ];

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      subject: "",
      fromName: "Veteran Ops Command",
      fromEmail: "command@veteranops.org",
      segment: "",
      content: "",
      attachments: [],
      sopLinks: [],
    },
  });

  const attachments = form.watch("attachments") || [];
  const sopLinks = form.watch("sopLinks") || [];

  const handleAddAttachment = () => {
    const currentAttachments = form.getValues("attachments") || [];
    form.setValue("attachments", [
      ...currentAttachments,
      {
        id: Date.now(),
        name: "sample-document.pdf", 
        fileSize: "245 KB",
        fileType: "PDF",
        url: "/documents/sample-document.pdf"
      }
    ]);
  };

  const handleRemoveAttachment = (id: number) => {
    const currentAttachments = form.getValues("attachments") || [];
    form.setValue("attachments", currentAttachments.filter(att => att.id !== id));
  };

  const handleAddSOPLink = (sopItem: { id: number, title: string, description: string, url: string }) => {
    const currentLinks = form.getValues("sopLinks") || [];
    const linkExists = currentLinks.some(link => link.id === sopItem.id);
    
    if (!linkExists) {
      form.setValue("sopLinks", [
        ...currentLinks,
        {
          id: sopItem.id,
          title: sopItem.title,
          description: sopItem.description,
          url: sopItem.url
        }
      ]);
    }
  };

  const handleRemoveSOPLink = (id: number) => {
    const currentLinks = form.getValues("sopLinks") || [];
    form.setValue("sopLinks", currentLinks.filter(link => link.id !== id));
  };

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

            {/* Content Section */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={6} 
                      placeholder="Enter email content here..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Attachments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Attachments</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  {showAttachments ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showAttachments && (
                <div className="space-y-4 p-4 border rounded-md">
                  {attachments.length > 0 ? (
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 text-military-olive" />
                            <span>{attachment.name}</span>
                            <span className="text-xs text-muted-foreground">({attachment.fileSize})</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No attachments added</p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddAttachment}
                    className="mt-2"
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Add Attachment
                  </Button>
                </div>
              )}
            </div>
            
            {/* SOP Links Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">SOP Repository Links</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSOPLinks(!showSOPLinks)}
                >
                  {showSOPLinks ? "Hide" : "Show"}
                </Button>
              </div>
              
              {showSOPLinks && (
                <div className="space-y-4 p-4 border rounded-md">
                  {sopLinks.length > 0 ? (
                    <div className="space-y-2">
                      {sopLinks.map((link) => (
                        <div key={link.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Link className="h-4 w-4 text-military-olive" />
                              <span className="font-medium">{link.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">{link.description}</p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSOPLink(link.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No SOP links added</p>
                  )}
                  
                  <div className="mt-2 space-y-2">
                    <p className="text-sm font-medium">Available SOP Items:</p>
                    {sopRepositoryItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleAddSOPLink(item)}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground ml-6">{item.description}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
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
