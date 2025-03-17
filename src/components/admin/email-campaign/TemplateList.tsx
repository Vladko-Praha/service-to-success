
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Edit, Copy, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailTemplate } from "./types";
import { useToast } from "@/hooks/use-toast";

interface TemplateListProps {
  templates: EmailTemplate[];
  onCreateTemplate: () => void;
  onEditTemplate: (id: number) => void;
  onCopyTemplate: (id: number) => void;
  onDeleteTemplate: (id: number) => void;
}

const TemplateList = ({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onCopyTemplate,
  onDeleteTemplate
}: TemplateListProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTemplates = React.useMemo(() => {
    return templates.filter(template => 
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [templates, searchQuery]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Email Templates</CardTitle>
        <CardDescription>Create and manage reusable email templates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={onCreateTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-military-beige/20 flex items-center justify-center">
                <FileText className="h-12 w-12 text-military-navy/30" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <div className="flex justify-between">
                  <CardDescription>{template.category}</CardDescription>
                  <CardDescription>Last used: {template.lastUsed}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditTemplate(template.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onCopyTemplate(template.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onDeleteTemplate(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Create new template card */}
          <Card className="flex h-full flex-col items-center justify-center border-2 border-dashed p-6">
            <Plus className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-center font-medium">Create New Template</p>
            <p className="text-center text-sm text-muted-foreground mt-2 mb-4">Design reusable email templates</p>
            <Button onClick={onCreateTemplate}>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateList;
