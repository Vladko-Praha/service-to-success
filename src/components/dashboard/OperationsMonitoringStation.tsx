
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, TruckIcon, Users, Trophy } from "lucide-react";

const OperationsMonitoringStation = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Operations Monitoring Station</h2>
        <span className="rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-navy">
          ACTIVE DEPLOYMENT
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Launch Countdown</CardDescription>
            <CardTitle className="text-2xl">
              23 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-military-olive" />
              <span className="text-sm text-military-navy/70">Until official launch</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue Objective</CardDescription>
            <CardTitle className="text-2xl">
              $2,450
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-military-olive" />
              <span className="text-sm text-military-navy/70">First milestone target</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Supply Chain Status</CardDescription>
            <CardTitle className="text-2xl">
              Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TruckIcon className="mr-2 h-4 w-4 text-military-olive" />
              <span className="text-sm text-military-navy/70">All systems ready</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Customer Acquisition</CardDescription>
            <CardTitle className="text-2xl">
              14 Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-military-olive" />
              <span className="text-sm text-military-navy/70">In conversion pipeline</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enterprise Launch Timeline</CardTitle>
            <CardDescription>Strategic schedule for your business deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-military-olive/20">
                  <Clock className="h-5 w-5 text-military-olive" />
                  <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-military-olive"></div>
                </div>
                <div>
                  <h4 className="font-bold text-military-navy">Pre-Launch Operations</h4>
                  <p className="text-sm text-military-navy/70">Complete final preparations for market entry</p>
                </div>
              </div>
              
              <div className="ml-5 w-0.5 bg-military-olive/20 py-3"></div>
              
              <div className="flex items-center gap-4">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-military-navy">Initial Market Deployment</h4>
                  <p className="text-sm text-military-navy/70">Launch core products/services to market</p>
                </div>
              </div>
              
              <div className="ml-5 w-0.5 bg-military-olive/20 py-3"></div>
              
              <div className="flex items-center gap-4">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-military-navy">Market Expansion Phase</h4>
                  <p className="text-sm text-military-navy/70">Scale operations based on initial market feedback</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission Success Recognition</CardTitle>
            <CardDescription>Achievements and milestones reached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-md border border-military-tan p-3">
                <Trophy className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">Business Plan Excellence</h4>
                  <p className="text-sm text-military-navy/70">
                    Your business plan scored in the top 10% of program participants.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 rounded-md border border-military-tan p-3">
                <Trophy className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">Market Research Specialist</h4>
                  <p className="text-sm text-military-navy/70">
                    Completed advanced market analysis training with distinction.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 rounded-md border border-military-tan p-3">
                <Trophy className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                <div>
                  <h4 className="font-medium text-military-navy">Digital Operations Expert</h4>
                  <p className="text-sm text-military-navy/70">
                    Successfully established all core digital business systems.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperationsMonitoringStation;
