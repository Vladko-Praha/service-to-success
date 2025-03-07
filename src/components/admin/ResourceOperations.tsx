
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { File, FileText, FileUp, Search, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResourceOperations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Resource Operations
        </h2>
        <Button className="bg-military-navy hover:bg-military-navy/90">
          <FileUp className="mr-2 h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Library Management</CardTitle>
          <CardDescription>Organize and manage program resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Folder className="mr-2 h-4 w-4" />
              New Folder
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-military-olive" />
                <span className="font-medium">Business Planning Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">12 items</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-military-olive" />
                <span className="font-medium">Financial Planning Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">8 items</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-military-olive" />
                <span className="font-medium">Marketing Strategy Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">15 items</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-military-navy" />
                <span className="font-medium">Business Plan Template v2.4.docx</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">2.3 MB</span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <File className="h-5 w-5 text-military-navy" />
                <span className="font-medium">Financial Projections Calculator.xlsx</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">1.5 MB</span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <File className="h-5 w-5 text-military-navy" />
                <span className="font-medium">Market Research Guide.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">4.8 MB</span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Usage Analytics</CardTitle>
          <CardDescription>Track participant engagement with resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Most Accessed Resources</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Business Plan Template</p>
                    <p className="text-sm font-medium">93%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-[93%] rounded-full bg-military-olive"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Financial Projections Calculator</p>
                    <p className="text-sm font-medium">87%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-[87%] rounded-full bg-military-olive"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Marketing Strategy Guide</p>
                    <p className="text-sm font-medium">76%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-[76%] rounded-full bg-military-olive"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Legal Structure Comparison</p>
                    <p className="text-sm font-medium">62%</p>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
                    <div className="h-full w-[62%] rounded-full bg-military-olive"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceOperations;
