
import { BookOpen, CheckSquare, Clipboard, FileText, BookMarked } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessDeploymentCenter = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Business Deployment Center</h2>
        <span className="rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-navy">
          FOUNDATION STAGE
        </span>
      </div>

      <Tabs defaultValue="plan" className="space-y-6">
        <TabsList className="bg-military-sand">
          <TabsTrigger value="plan">
            <FileText className="mr-2 h-4 w-4" />
            Business Plan
          </TabsTrigger>
          <TabsTrigger value="legal">
            <CheckSquare className="mr-2 h-4 w-4" />
            Legal Formation
          </TabsTrigger>
          <TabsTrigger value="structure">
            <Clipboard className="mr-2 h-4 w-4" />
            Business Structure
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <BookMarked className="mr-2 h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="financial">
            <BookOpen className="mr-2 h-4 w-4" />
            Financial Planning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Business Plan Builder</CardTitle>
              <CardDescription>
                Create your mission blueprint for successful business deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                This section includes strategic templates and guidance for building your comprehensive business plan. 
                Select one of our field-tested templates to begin your mission planning.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-md border border-military-tan bg-military-sand p-4 hover:border-military-olive transition-colors cursor-pointer">
                  <h3 className="font-bold text-military-navy">E-Commerce Operation</h3>
                  <p className="mt-1 text-sm text-military-navy/70">
                    For online product-based businesses
                  </p>
                </div>
                <div className="rounded-md border border-military-tan bg-military-sand p-4 hover:border-military-olive transition-colors cursor-pointer">
                  <h3 className="font-bold text-military-navy">Service-Based Mission</h3>
                  <p className="mt-1 text-sm text-military-navy/70">
                    For B2B and B2C service providers
                  </p>
                </div>
                <div className="rounded-md border border-military-tan bg-military-sand p-4 hover:border-military-olive transition-colors cursor-pointer">
                  <h3 className="font-bold text-military-navy">Consulting Operations</h3>
                  <p className="mt-1 text-sm text-military-navy/70">
                    For advisory and consulting businesses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card>
            <CardHeader>
              <CardTitle>Legal Entity Formation Checklist</CardTitle>
              <CardDescription>
                Essential steps to establish your business legally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70 mb-4">
                Follow this tactical checklist to properly establish your business entity.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-md border border-military-tan">
                  <CheckSquare className="h-5 w-5 text-military-olive" />
                  <div>
                    <h4 className="font-medium text-military-navy">Select Your Business Structure</h4>
                    <p className="text-sm text-military-navy/70">Compare LLC, S-Corp, and Sole Proprietorship options</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md border border-military-tan">
                  <CheckSquare className="h-5 w-5 text-military-olive" />
                  <div>
                    <h4 className="font-medium text-military-navy">Register Your Business Name</h4>
                    <p className="text-sm text-military-navy/70">Check availability and secure your business identity</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md border border-military-tan">
                  <CheckSquare className="h-5 w-5 text-gray-300" />
                  <div>
                    <h4 className="font-medium text-military-navy">Apply for EIN</h4>
                    <p className="text-sm text-military-navy/70">Get your Employer Identification Number from the IRS</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md border border-military-tan">
                  <CheckSquare className="h-5 w-5 text-gray-300" />
                  <div>
                    <h4 className="font-medium text-military-navy">Register for State and Local Taxes</h4>
                    <p className="text-sm text-military-navy/70">Ensure compliance with tax authorities</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md border border-military-tan">
                  <CheckSquare className="h-5 w-5 text-gray-300" />
                  <div>
                    <h4 className="font-medium text-military-navy">Obtain Business Licenses and Permits</h4>
                    <p className="text-sm text-military-navy/70">Identify and secure required operational authorizations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder content for other tabs */}
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Business Structure Reconnaissance</CardTitle>
              <CardDescription>Compare different business entities to find your optimal formation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                This section provides detailed intelligence on different business structures (LLC, S-Corp, Sole Proprietorship)
                to help you make the right tactical decision for your operation.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Field Manual</CardTitle>
              <CardDescription>Navigate the regulatory landscape for your industry</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                This section contains sector-specific compliance guidance to ensure your business
                operations meet all regulatory requirements and avoid potential obstacles.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Operations Planning Tools</CardTitle>
              <CardDescription>Develop your financial strategy and projections</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-military-navy/70">
                Access financial planning tools and templates to create robust business
                financial projections, cash flow management plans, and funding strategies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDeploymentCenter;
