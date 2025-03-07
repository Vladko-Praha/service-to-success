
import React from "react";
import { Activity, AlertTriangle, CheckCircle, Clock, Medal, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const CommandCenterOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Command Center Overview
        </h2>
        <div className="flex items-center gap-2 bg-military-navy/10 px-4 py-2 rounded-md">
          <Clock className="h-5 w-5 text-military-navy" />
          <span className="text-sm font-medium">Current Operation: <span className="font-bold">Cohort #8 - Week 6</span></span>
        </div>
      </div>

      {/* Program Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-military-olive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">Across 8 cohorts</p>
            <div className="mt-4 flex items-center text-xs text-military-olive">
              <span className="font-medium">↑ 12%</span>
              <span className="ml-1">from previous cohort</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Program Completion</CardTitle>
            <Activity className="h-4 w-4 text-military-olive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">Average across all cohorts</p>
            <Progress value={86} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Businesses Launched</CardTitle>
            <Medal className="h-4 w-4 text-military-olive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Success rate: 76%</p>
            <div className="mt-4 flex items-center text-xs text-military-olive">
              <span className="font-medium">↑ 8%</span>
              <span className="ml-1">from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Participants</CardTitle>
            <AlertTriangle className="h-4 w-4 text-military-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Require intervention</p>
            <div className="mt-4 flex items-center text-xs text-military-red">
              <span className="font-medium">Action required</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Milestone Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Program Milestone Timeline</CardTitle>
          <CardDescription>Current and upcoming program milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-military-olive text-military-sand">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Module 3: Market Research</p>
                <p className="text-sm text-muted-foreground">Completed on June 8, 2023</p>
                <p className="text-xs text-military-olive">98% completion rate</p>
              </div>
              <div className="text-sm font-medium text-military-olive">COMPLETE</div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-military-navy text-military-sand">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Module 4: Business Model Development</p>
                <p className="text-sm text-muted-foreground">In progress (Week 2 of 3)</p>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-full w-[65%] rounded-full bg-military-olive"></div>
                </div>
              </div>
              <div className="text-sm font-medium text-military-navy">IN PROGRESS</div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-slate-200 text-slate-500">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Module 5: Financial Planning</p>
                <p className="text-sm text-muted-foreground">Starts June 29, 2023</p>
                <p className="text-xs">Resources prepared: 92%</p>
              </div>
              <div className="text-sm font-medium text-slate-500">UPCOMING</div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-slate-200 text-slate-500">
                <Medal className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Midpoint Business Plan Review</p>
                <p className="text-sm text-muted-foreground">July 15, 2023</p>
                <p className="text-xs">Reviewers assigned: 80%</p>
              </div>
              <div className="text-sm font-medium text-slate-500">UPCOMING</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className="border-military-red/30">
        <CardHeader className="bg-military-red/10 border-b border-military-red/20">
          <CardTitle className="flex items-center gap-2 text-military-red">
            <AlertTriangle className="h-5 w-5" />
            Critical Alerts
          </CardTitle>
          <CardDescription>Issues requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="p-4 hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">5 participants at risk of falling behind</p>
                  <p className="text-sm text-muted-foreground">Module completion rate below 60%</p>
                </div>
                <button className="text-sm font-medium text-military-navy hover:underline">
                  View Details
                </button>
              </div>
            </div>
            <div className="p-4 hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">3 assignments past due for review</p>
                  <p className="text-sm text-muted-foreground">Feedback pending for more than 48 hours</p>
                </div>
                <button className="text-sm font-medium text-military-navy hover:underline">
                  Review Now
                </button>
              </div>
            </div>
            <div className="p-4 hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Resource approval bottleneck</p>
                  <p className="text-sm text-muted-foreground">8 materials awaiting review for Module 5</p>
                </div>
                <button className="text-sm font-medium text-military-navy hover:underline">
                  Process Queue
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandCenterOverview;
