
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, MessageSquare, BarChart2, Zap, BrainCircuit, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateResponse } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AICoachManagement = () => {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const { toast } = useToast();

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
              <CardTitle>Training Data Management</CardTitle>
              <CardDescription>Update and improve AI coach training data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Training data management interface would be displayed here</p>
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
