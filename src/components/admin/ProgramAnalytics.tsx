
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, LineChart, PieChart, TrendingUp, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProgramAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Program Analytics Command
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 6 months
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Program Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-military-olive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">+2.5% from previous cohort</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
              <div className="h-full w-[86%] rounded-full bg-military-olive"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dropout Rate</CardTitle>
            <LineChart className="h-4 w-4 text-military-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">-1.2% from previous cohort</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
              <div className="h-full w-[8.4%] rounded-full bg-military-red"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Business Launch Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-military-olive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">of graduates launch within 6 months</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
              <div className="h-full w-[76%] rounded-full bg-military-olive"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cohort Comparison</CardTitle>
            <CardDescription>Performance metrics across program cohorts</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <BarChart2 className="h-16 w-16 text-military-olive opacity-40" />
            <div className="absolute text-center">
              <p className="text-sm font-medium">Cohort comparison chart</p>
              <p className="text-xs text-muted-foreground">Interactive visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Effectiveness</CardTitle>
            <CardDescription>Participant success rates by program module</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <PieChart className="h-16 w-16 text-military-olive opacity-40" />
            <div className="absolute text-center">
              <p className="text-sm font-medium">Module effectiveness chart</p>
              <p className="text-xs text-muted-foreground">Interactive visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
          <CardDescription>Forecasting program outcomes and identifying improvement opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Predicted Outcomes for Current Cohort</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Predicted Completion Rate</p>
                  <p className="text-2xl font-bold text-military-olive">89%</p>
                  <p className="text-xs text-muted-foreground">+3% from current average</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Predicted Business Launch</p>
                  <p className="text-2xl font-bold text-military-olive">80%</p>
                  <p className="text-xs text-muted-foreground">+4% from current average</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Predicted Revenue Generation</p>
                  <p className="text-2xl font-bold text-military-olive">+12%</p>
                  <p className="text-xs text-muted-foreground">Compared to previous cohort</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Recommended Improvements</h3>
              <div className="rounded-lg border p-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-military-olive"></div>
                    <span>Increase mentor availability during Financial Planning module</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-military-olive"></div>
                    <span>Add supplementary market research resources for tech sector ventures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-military-olive"></div>
                    <span>Implement additional check-ins for at-risk participants in week 3</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramAnalytics;
