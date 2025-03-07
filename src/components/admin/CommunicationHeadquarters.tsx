
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunicationHeadquarters = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Communication Headquarters
        </h2>
        <Button className="bg-military-navy hover:bg-military-navy/90">
          <Bell className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-military-olive" />
              Announcements
            </CardTitle>
            <CardDescription>Program-wide communication management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3 bg-military-navy/5">
                <p className="font-medium">Cohort #8 Midpoint Review Schedule</p>
                <p className="text-sm text-muted-foreground">Sent 2 days ago to Cohort #8</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-military-olive">Opened by 28/32 participants</p>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <p className="font-medium">Guest Speaker Series: Veteran Entrepreneurs</p>
                <p className="text-sm text-muted-foreground">Scheduled to send tomorrow at 09:00</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">All active participants</p>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <p className="font-medium">Financial Planning Module Updates</p>
                <p className="text-sm text-muted-foreground">Draft - Not scheduled</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Target: Cohort #8</p>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-military-olive" />
              Direct Messaging
            </CardTitle>
            <CardDescription>Individual and group communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">At-Risk Participants</p>
                  <p className="text-sm text-muted-foreground">5 members</p>
                </div>
                <Button variant="outline" size="sm">Message</Button>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mentors & Instructors</p>
                  <p className="text-sm text-muted-foreground">12 members</p>
                </div>
                <Button variant="outline" size="sm">Message</Button>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Cohort #8 - Team Alpha</p>
                  <p className="text-sm text-muted-foreground">8 members</p>
                </div>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Forum Moderation</CardTitle>
          <CardDescription>Monitor and manage participant discussions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Business Plan Feedback</p>
                  <span className="rounded-full bg-military-red px-2 py-0.5 text-xs text-white">Requires Review</span>
                </div>
                <p className="text-sm text-muted-foreground">32 posts, 5 flagged for review</p>
              </div>
              <Button variant="outline">Moderate</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Marketing Strategy Discussion</p>
                <p className="text-sm text-muted-foreground">48 posts, no issues</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Veteran Success Stories</p>
                <p className="text-sm text-muted-foreground">24 posts, no issues</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationHeadquarters;
