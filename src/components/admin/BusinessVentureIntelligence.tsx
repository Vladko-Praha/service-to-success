
import React from "react";
import { BarChart, PieChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BusinessVentureIntelligence = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Business Venture Intelligence
        </h2>
        <div className="flex items-center gap-2 bg-military-navy/10 px-4 py-2 rounded-md">
          <TrendingUp className="h-5 w-5 text-military-olive" />
          <span className="text-sm font-medium">127 Businesses Launched</span>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Industry Distribution</CardTitle>
            <CardDescription>Breakdown of business ventures by industry</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-80 flex items-center justify-center rounded-full bg-slate-100">
              <PieChart className="h-12 w-12 text-military-olive" />
              <div className="absolute text-center">
                <p className="text-sm font-medium">Analytics visualization</p>
                <p className="text-xs text-muted-foreground">Interactive chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Business Success Metrics</CardTitle>
            <CardDescription>Performance measures of veteran businesses</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-full flex items-center justify-center bg-slate-100 rounded-lg">
              <BarChart className="h-12 w-12 text-military-olive" />
              <div className="absolute text-center">
                <p className="text-sm font-medium">Analytics visualization</p>
                <p className="text-xs text-muted-foreground">Interactive chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>ROI Analysis</CardTitle>
          <CardDescription>Program effectiveness and business outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-10">
            <p className="text-center text-muted-foreground">
              Detailed ROI analysis dashboard would be displayed here, showing metrics like:<br />
              - Program cost per successful business<br />
              - Average time to profitability<br />
              - Job creation metrics<br />
              - Social impact measurements
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessVentureIntelligence;
