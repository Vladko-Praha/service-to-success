
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, MessageSquare, BarChart2, Zap, BrainCircuit, Sparkles, Upload, Database, FileText, FolderPlus, Search, RefreshCw, Trash2, Plus, Edit, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateResponse } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AICoachManagement = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const { toast } = useToast();

  // Training data state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadFileName, setUploadFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDataItem, setSelectedDataItem] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Mock training data
  const [trainingData, setTrainingData] = useState([
    { id: 1, name: "Business Plan Templates", category: "Business Planning", records: 234, lastUpdated: "2023-11-05", description: "Templates for creating business plans for different industries" },
    { id: 2, name: "Financial Forecasting Examples", category: "Financial Planning", records: 156, lastUpdated: "2023-12-10", description: "Example financial forecasts for startup businesses" },
    { id: 3, name: "Veteran Entrepreneur FAQs", category: "General Support", records: 427, lastUpdated: "2024-01-15", description: "Frequently asked questions from veteran entrepreneurs" },
    { id: 4, name: "Market Research Techniques", category: "Market Analysis", records: 189, lastUpdated: "2024-02-20", description: "Methods and approaches for conducting market research" },
    { id: 5, name: "Funding Options Dataset", category: "Financial Planning", records: 78, lastUpdated: "2024-03-01", description: "Overview of funding options available to veteran entrepreneurs" }
  ]);

  const handleGenerateResponse = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate a response.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateResponse(apiKey, prompt, selectedModel);
      setResponse(result);
      toast({
        title: "Response Generated",
        description: "AI response has been generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate response.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    if (!uploadFileName) {
      toast({
        title: "Upload Error",
        description: "Please enter a file name for the training data.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newId = Math.max(...trainingData.map(item => item.id)) + 1;
      const newDataset = {
        id: newId,
        name: uploadFileName,
        category: "New Dataset",
        records: Math.floor(Math.random() * 200) + 50,
        lastUpdated: new Date().toISOString().split('T')[0],
        description: "Newly uploaded dataset"
      };
      
      setTrainingData([...trainingData, newDataset]);
      setUploadFileName("");
      setIsUploading(false);
      
      toast({
        title: "Upload Complete",
        description: "Training data has been uploaded successfully.",
      });
    }, 1500);
  };

  const handleDeleteDataset = (id: number) => {
    setTrainingData(trainingData.filter(item => item.id !== id));
    setSelectedDataItem(null);
    
    toast({
      title: "Dataset Removed",
      description: "The training dataset has been removed.",
    });
  };

  const handleEditDataset = (id: number) => {
    const dataset = trainingData.find(item => item.id === id);
    if (dataset) {
      setEditName(dataset.name);
      setEditCategory(dataset.category);
      setEditDescription(dataset.description);
      setSelectedDataItem(id);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (!selectedDataItem) return;
    
    setTrainingData(trainingData.map(item => 
      item.id === selectedDataItem 
        ? { 
            ...item, 
            name: editName, 
            category: editCategory, 
            description: editDescription,
            lastUpdated: new Date().toISOString().split('T')[0]
          } 
        : item
    ));
    
    setIsEditing(false);
    setSelectedDataItem(null);
    
    toast({
      title: "Changes Saved",
      description: "Training dataset has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedDataItem(null);
  };

  const filteredData = trainingData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(trainingData.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          AI Coach Management System
        </h2>
        <div className="flex items-center gap-2 bg-military-navy/10 px-4 py-2 rounded-md">
          <Cpu className="h-5 w-5 text-military-navy" />
          <span className="text-sm font-medium">AI Battle Buddy v2.4</span>
        </div>
      </div>
      
      <Tabs defaultValue="metrics">
        <TabsList className="mb-4">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="responses">Response Management</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
          <TabsTrigger value="override">Manual Override</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>AI Coach Interaction Metrics</CardTitle>
              <CardDescription>Performance and usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Total Interactions</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">24,876</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Resolution Rate</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">92%</p>
                    <p className="text-xs text-muted-foreground">Issues resolved without human intervention</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-military-olive" />
                      <h3 className="font-medium">Satisfaction Score</h3>
                    </div>
                    <p className="mt-2 text-2xl font-bold">4.8/5</p>
                    <p className="text-xs text-muted-foreground">Based on 5,420 ratings</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 font-medium">Common Questions by Category</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Business Plan Development</p>
                        <p className="text-sm font-medium">32%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[32%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Financial Planning</p>
                        <p className="text-sm font-medium">24%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[24%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Marketing Strategy</p>
                        <p className="text-sm font-medium">18%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[18%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Legal & Administrative</p>
                        <p className="text-sm font-medium">14%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[14%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Other Topics</p>
                        <p className="text-sm font-medium">12%</p>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                        <div className="h-full w-[12%] rounded-full bg-military-olive"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-military-olive" />
                Response Customization
              </CardTitle>
              <CardDescription>Test and manage AI response patterns using OpenAI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="apiKey">OpenAI API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your API key is only used for requests and not stored on the server.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="model">AI Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o (Powerful)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose the AI model that fits your needs.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="prompt">Test Prompt</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a prompt for the AI to respond to..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerateResponse}
                  className="bg-military-olive hover:bg-military-olive/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate Response
                    </>
                  )}
                </Button>
                
                {response && (
                  <div className="border rounded-md p-4 bg-military-beige/20">
                    <Label className="mb-2">AI Response:</Label>
                    <div className="whitespace-pre-wrap rounded-md bg-white p-4 border">
                      {response}
                    </div>
                  </div>
                )}
                
                <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Cpu className="h-4 w-4 mr-2" />
                    Response Template Library
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left" onClick={() => setPrompt("Generate a welcome message for new veteran entrepreneurs joining our program.")}>
                      Welcome Message Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left" onClick={() => setPrompt("Write a response explaining the importance of market research for a new business.")}>
                      Market Research Guidance
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left" onClick={() => setPrompt("Create a step-by-step guide for building a business plan for veteran entrepreneurs.")}>
                      Business Plan Guide
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-military-olive" />
                Training Data Management
              </CardTitle>
              <CardDescription>Upload, organize, and manage training datasets for the AI coach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search datasets..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="md:w-auto"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                
                {/* Upload Section */}
                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-medium mb-2">Upload New Training Data</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter dataset name"
                        value={uploadFileName}
                        onChange={(e) => setUploadFileName(e.target.value)}
                        className="mb-0"
                      />
                    </div>
                    <Button
                      onClick={handleFileUpload}
                      disabled={isUploading}
                      className="bg-military-olive hover:bg-military-olive/90"
                    >
                      {isUploading ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Dataset
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Training Data Table */}
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dataset Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Records</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                          <TableRow key={item.id} className={selectedDataItem === item.id ? "bg-slate-100" : ""}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-military-navy" />
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">{item.records.toLocaleString()}</TableCell>
                            <TableCell>{item.lastUpdated}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEditDataset(item.id)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteDataset(item.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                            No datasets found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Edit Section */}
                {isEditing && selectedDataItem && (
                  <div className="rounded-lg border p-4 bg-slate-50 space-y-4">
                    <h3 className="text-sm font-medium">Edit Dataset</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Dataset Name</Label>
                        <Input
                          id="edit-name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Input
                          id="edit-category"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button onClick={handleSaveEdit} className="bg-military-olive hover:bg-military-olive/90">
                          <Check className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Dataset Details */}
                {selectedDataItem && !isEditing && (
                  <div className="rounded-lg border p-4 bg-slate-50">
                    <h3 className="text-sm font-medium mb-2">Dataset Details</h3>
                    <div className="space-y-2">
                      {trainingData.filter(item => item.id === selectedDataItem).map(item => (
                        <div key={item.id} className="space-y-2">
                          <p className="text-sm"><span className="font-medium">Name:</span> {item.name}</p>
                          <p className="text-sm"><span className="font-medium">Category:</span> {item.category}</p>
                          <p className="text-sm"><span className="font-medium">Records:</span> {item.records.toLocaleString()}</p>
                          <p className="text-sm"><span className="font-medium">Last Updated:</span> {item.lastUpdated}</p>
                          <p className="text-sm"><span className="font-medium">Description:</span> {item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Plus className="mr-2 h-4 w-4 text-military-olive" />
                    Create Empty Dataset
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <FolderPlus className="mr-2 h-4 w-4 text-military-olive" />
                    Create New Category
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Database className="mr-2 h-4 w-4 text-military-olive" />
                    Download All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="override">
          <Card>
            <CardHeader>
              <CardTitle>Manual Override Console</CardTitle>
              <CardDescription>Step in to handle complex participant interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Manual override interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AICoachManagement;
