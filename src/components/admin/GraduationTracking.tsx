
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const GraduationTracking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Graduation Tracking Command
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Certification Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Business Fundamentals</span>
                  <span className="text-sm text-muted-foreground">64 certificates issued</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Financial Operations</span>
                  <span className="text-sm text-muted-foreground">52 certificates issued</span>
                </div>
                <Progress value={52} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Marketing Strategy</span>
                  <span className="text-sm text-muted-foreground">47 certificates issued</span>
                </div>
                <Progress value={47} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Full Program Completion</span>
                  <span className="text-sm text-muted-foreground">41 graduates</span>
                </div>
                <Progress value={41} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Post-Program Success Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Business Launch Rate</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">6-Month Sustainability</span>
                  <span className="text-sm text-muted-foreground">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">First-Year Revenue Target</span>
                  <span className="text-sm text-muted-foreground">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Program ROI Achievement</span>
                  <span className="text-sm text-muted-foreground">93%</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Graduation Ceremonies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-military-navy">Alpha Cohort</h3>
                <p className="text-sm text-muted-foreground">Date: June 15, 2023</p>
                <p className="text-sm text-muted-foreground">Graduates: 28</p>
                <p className="text-sm text-muted-foreground">Location: Virtual Ceremony</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-military-navy">Bravo Cohort</h3>
                <p className="text-sm text-muted-foreground">Date: August 22, 2023</p>
                <p className="text-sm text-muted-foreground">Graduates: 32</p>
                <p className="text-sm text-muted-foreground">Location: HQ Campus, Building 4</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-military-navy">Charlie Cohort</h3>
                <p className="text-sm text-muted-foreground">Date: October 10, 2023</p>
                <p className="text-sm text-muted-foreground">Graduates: 35 (Projected)</p>
                <p className="text-sm text-muted-foreground">Location: Regional Office, West Wing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Alumni Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-military-navy">487</div>
                <div className="text-sm text-muted-foreground">Total Alumni</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-military-navy">374</div>
                <div className="text-sm text-muted-foreground">Active Businesses</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-military-navy">156</div>
                <div className="text-sm text-muted-foreground">Mentorship Participants</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-military-navy">12</div>
                <div className="text-sm text-muted-foreground">Alumni Events (Annual)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraduationTracking;
