
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Plus, 
  Tag, 
  Clock, 
  FileUp, 
  Download, 
  Users, 
  Star, 
  ThumbsUp, 
  Filter, 
  BookmarkPlus,
  UploadCloud,
  Lightbulb
} from "lucide-react";

export type ResourceType = "sop" | "document" | "article" | "template" | "guide" | "video";

export interface KnowledgeResource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  dateAdded: string;
  addedBy: string;
  tags: string[];
  popularity: number;
  aiGenerated?: boolean;
}

interface StudentLibraryProps {
  onAddResource?: (resource: KnowledgeResource) => void;
  onSelectResource?: (resource: KnowledgeResource) => void;
}

const StudentLibrary = ({ onAddResource, onSelectResource }: StudentLibraryProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResourceType, setSelectedResourceType] = useState<ResourceType | "all">("all");
  const [selectedTag, setSelectedTag] = useState<string | "all">("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newResource, setNewResource] = useState<Partial<KnowledgeResource>>({
    title: "",
    description: "",
    type: "document",
    tags: []
  });
  const [newTag, setNewTag] = useState("");

  // Mock data for the knowledge base
  const [resources, setResources] = useState<KnowledgeResource[]>([
    {
      id: "res-1",
      title: "Business Plan Template",
      description: "Standard template for creating comprehensive business plans for veteran entrepreneurs",
      type: "template",
      url: "/resources/business-plan-template.pdf",
      dateAdded: "2024-01-10",
      addedBy: "Admin",
      tags: ["business-planning", "templates", "entrepreneurship"],
      popularity: 156
    },
    {
      id: "res-2",
      title: "Market Research SOP",
      description: "Standard Operating Procedure for conducting effective market research for new businesses",
      type: "sop",
      url: "/resources/market-research-sop.pdf",
      dateAdded: "2024-02-15",
      addedBy: "Admin",
      tags: ["market-research", "sop", "business-strategy"],
      popularity: 98
    },
    {
      id: "res-3",
      title: "Financial Forecasting Guide",
      description: "Comprehensive guide to creating accurate financial forecasts for startup businesses",
      type: "guide",
      url: "/resources/financial-forecasting.pdf",
      dateAdded: "2024-03-05",
      addedBy: "Mentor",
      tags: ["finance", "forecasting", "business-planning"],
      popularity: 112
    },
    {
      id: "res-4",
      title: "Veteran Benefits for Entrepreneurs",
      description: "Overview of available benefits and support programs for veteran entrepreneurs",
      type: "article",
      url: "/resources/veteran-benefits.pdf",
      dateAdded: "2024-02-20",
      addedBy: "Admin",
      tags: ["va-benefits", "funding", "support-programs"],
      popularity: 203
    },
    {
      id: "res-5",
      title: "Customer Discovery Interview Framework",
      description: "Framework for conducting effective customer discovery interviews",
      type: "template",
      url: "/resources/customer-discovery.pdf",
      dateAdded: "2024-03-12",
      addedBy: "Mentor",
      tags: ["customer-research", "interviews", "market-validation"],
      popularity: 87
    },
    {
      id: "res-6",
      title: "Guide to Securing Small Business Loans",
      description: "Step-by-step guide for veterans to secure small business loans and funding",
      type: "guide",
      url: "/resources/business-loans.pdf",
      dateAdded: "2024-01-25",
      addedBy: "Admin",
      tags: ["funding", "loans", "finance"],
      popularity: 175,
      aiGenerated: true
    }
  ]);

  // All available resource types
  const resourceTypes: ResourceType[] = ["sop", "document", "article", "template", "guide", "video"];
  
  // Extract all tags from resources
  const allTags = Array.from(new Set(resources.flatMap(r => r.tags)));

  // Handle search filtering
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery 
      ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
      
    const matchesType = selectedResourceType === "all" || resource.type === selectedResourceType;
    const matchesTag = selectedTag === "all" || resource.tags.includes(selectedTag);
    
    return matchesSearch && matchesType && matchesTag;
  });

  // Handle adding a new tag to the resource being created
  const handleAddTag = () => {
    if (newTag.trim() && newResource.tags) {
      const updatedTags = [...newResource.tags, newTag.trim()];
      setNewResource({...newResource, tags: updatedTags});
      setNewTag("");
    }
  };

  // Handle removing a tag from the resource being created
  const handleRemoveTag = (tagToRemove: string) => {
    if (newResource.tags) {
      const updatedTags = newResource.tags.filter(tag => tag !== tagToRemove);
      setNewResource({...newResource, tags: updatedTags});
    }
  };

  // Handle resource creation submission
  const handleSubmitResource = () => {
    if (!newResource.title || !newResource.description || !newResource.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const resourceToAdd: KnowledgeResource = {
      id: `res-${Date.now()}`,
      title: newResource.title,
      description: newResource.description,
      type: newResource.type as ResourceType,
      url: newResource.url || `/resources/${newResource.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: "AI Battle Buddy",
      tags: newResource.tags || [],
      popularity: 0,
      aiGenerated: true
    };

    setResources([resourceToAdd, ...resources]);
    
    if (onAddResource) {
      onAddResource(resourceToAdd);
    }

    toast({
      title: "Resource Added",
      description: "The new resource has been added to the library"
    });

    // Reset form
    setNewResource({
      title: "",
      description: "",
      type: "document",
      tags: []
    });
    setShowUploadForm(false);
  };

  // Handle resource selection
  const handleSelectResource = (resource: KnowledgeResource) => {
    if (onSelectResource) {
      onSelectResource(resource);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-military-olive" />
          Veteran Knowledge Base
        </CardTitle>
        <CardDescription>
          Access training resources, SOPs, and learning materials for veteran entrepreneurs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="browse">
          <TabsList className="mb-4">
            <TabsTrigger value="browse">Browse Resources</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="ai">AI Generated</TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value as ResourceType | "all")}
                >
                  <option value="all">All Types</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                >
                  <option value="all">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedResourceType("all");
                  setSelectedTag("all");
                }}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="browse" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">All Resources</h3>
              <Button onClick={() => setShowUploadForm(!showUploadForm)}>
                {showUploadForm ? "Cancel" : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </>
                )}
              </Button>
            </div>

            {showUploadForm && (
              <Card className="p-4 bg-military-beige/10 border-military-olive/30">
                <div className="space-y-4">
                  <h3 className="font-medium">Add New Resource</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resource Title</label>
                    <Input 
                      value={newResource.title}
                      onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                      placeholder="Enter resource title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                      placeholder="Describe this resource"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resource Type</label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={newResource.type}
                        onChange={(e) => setNewResource({...newResource, type: e.target.value as ResourceType})}
                      >
                        {resourceTypes.map(type => (
                          <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resource URL (Optional)</label>
                      <Input 
                        value={newResource.url || ""}
                        onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                        placeholder="URL to resource"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex gap-2">
                      <Input 
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="flex-grow"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleAddTag}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {newResource.tags && newResource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newResource.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag}
                            <button className="ml-1 rounded-full hover:bg-muted p-0.5">×</button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline"
                      onClick={() => setShowUploadForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitResource}
                      className="bg-military-olive hover:bg-military-olive/90"
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Add to Library
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {filteredResources.length > 0 ? filteredResources.map(resource => (
                  <Card 
                    key={resource.id} 
                    className={`cursor-pointer hover:border-military-olive transition-all ${resource.aiGenerated ? 'border-l-4 border-l-military-olive' : ''}`}
                    onClick={() => handleSelectResource(resource)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {resource.type === 'sop' && <FileText className="h-4 w-4 text-blue-600" />}
                            {resource.type === 'document' && <FileText className="h-4 w-4 text-gray-600" />}
                            {resource.type === 'template' && <FileText className="h-4 w-4 text-green-600" />}
                            {resource.type === 'guide' && <BookOpen className="h-4 w-4 text-purple-600" />}
                            {resource.type === 'article' && <FileText className="h-4 w-4 text-orange-600" />}
                            {resource.type === 'video' && <FileText className="h-4 w-4 text-red-600" />}
                            <h3 className="font-medium">{resource.title}</h3>
                            {resource.aiGenerated && (
                              <Badge variant="outline" className="bg-military-olive/10 text-military-olive">
                                <Lightbulb className="h-3 w-3 mr-1" />
                                AI Generated
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(resource.url, '_blank');
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {resource.dateAdded}
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {resource.popularity}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-lg font-medium">No Resources Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="popular">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Popularity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...resources]
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 5)
                  .map(resource => (
                    <TableRow key={resource.id} className="cursor-pointer" onClick={() => handleSelectResource(resource)}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">{resource.description.substring(0, 60)}...</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {resource.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                          {resource.popularity}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="recent">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...resources]
                  .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                  .slice(0, 5)
                  .map(resource => (
                    <TableRow key={resource.id} className="cursor-pointer" onClick={() => handleSelectResource(resource)}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">{resource.description.substring(0, 60)}...</div>
                        </div>
                      </TableCell>
                      <TableCell>{resource.addedBy}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {resource.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{resource.dateAdded}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="ai">
            <div className="space-y-4">
              <div className="bg-military-olive/10 p-4 rounded-md flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-military-olive mt-0.5" />
                <div>
                  <h3 className="font-medium text-military-navy">AI-Generated Resources</h3>
                  <p className="text-sm">Resources automatically created by the AI Battle Buddy based on identified knowledge gaps</p>
                </div>
              </div>
              
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {resources
                    .filter(resource => resource.aiGenerated)
                    .map(resource => (
                      <Card 
                        key={resource.id} 
                        className="cursor-pointer hover:border-military-olive transition-all border-l-4 border-l-military-olive"
                        onClick={() => handleSelectResource(resource)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-military-olive" />
                                <h3 className="font-medium">{resource.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(resource.url, '_blank');
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-wrap gap-1">
                              {resource.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {resource.dateAdded}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {resources.filter(resource => resource.aiGenerated).length === 0 && (
                      <div className="text-center py-10 bg-gray-50 rounded-md">
                        <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-lg font-medium">No AI-Generated Resources</h3>
                        <p className="text-muted-foreground">AI will create resources when knowledge gaps are identified</p>
                      </div>
                    )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          {resources.length} resources available in the knowledge base
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            toast({
              title: "Resources Refreshed",
              description: "Knowledge base has been updated with the latest resources",
            });
          }}
        >
          <BookmarkPlus className="h-4 w-4 mr-2" />
          Bookmark This Search
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentLibrary;
