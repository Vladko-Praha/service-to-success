
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { EmailTemplate, TemplateFormValues, Attachment, SOPLink } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paperclip, Link, X, Plus } from "lucide-react";

const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Template content is required"),
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

interface TemplateFormProps {
  template?: EmailTemplate;
  onSubmit: (data: TemplateFormValues) => void;
  onCancel: () => void;
}

const TemplateForm = ({
  template,
  onSubmit,
  onCancel
}: TemplateFormProps) => {
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

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: template?.name || "",
      category: template?.category || "",
      content: template?.content || "<p>Hello,</p><p>Thank you for being a part of Veteran Ops.</p><p>Regards,<br>Veteran Ops Team</p>",
      attachments: template?.attachments || [],
      sopLinks: template?.sopLinks || [],
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
        <CardTitle>{template ? "Edit Template" : "Create New Template"}</CardTitle>
        <CardDescription>
          {template ? "Modify your email template" : "Create a reusable email template"}
        </CardDescription>
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
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Welcome Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Newsletter">Newsletter</SelectItem>
                        <SelectItem value="Automation">Automation</SelectItem>
                        <SelectItem value="Announcement">Announcement</SelectItem>
                        <SelectItem value="Engagement">Engagement</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template Content</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Enter your email content here..." {...field} />
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
                {template ? "Save Changes" : "Create Template"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TemplateForm;
