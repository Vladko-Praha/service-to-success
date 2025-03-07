
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CivilianIntegrationSupport = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Civilian Integration Support
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="bg-military-navy text-white">
            <CardTitle>Military-to-Business Skills Translator</CardTitle>
            <CardDescription className="text-military-sand">
              Convert your military experience into valuable business skills
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Identify how your military experience translates to the business world:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Leadership and management</li>
              <li>Strategic planning</li>
              <li>Crisis management</li>
              <li>Logistics and operations</li>
              <li>Team building and motivation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-military-navy text-white">
            <CardTitle>VA Benefits Application</CardTitle>
            <CardDescription className="text-military-sand">
              Tactical application of VA benefits for entrepreneurs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Leverage available VA resources for your business:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Small business loans</li>
              <li>Entrepreneurship training programs</li>
              <li>Veteran business outreach centers</li>
              <li>Government contracting opportunities</li>
              <li>Networking with veteran business owners</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-military-navy text-white">
            <CardTitle>Operational Tempo Management</CardTitle>
            <CardDescription className="text-military-sand">
              Balance business operations with personal wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Maintain optimal performance while preventing burnout:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Work-life balance strategies</li>
              <li>Stress management techniques</li>
              <li>Personal health and wellness planning</li>
              <li>Time management and prioritization</li>
              <li>Building supportive networks</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Development Mission Tracking</CardTitle>
          <CardDescription>
            Monitor your civilian integration progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="professional">
            <TabsList className="mb-4">
              <TabsTrigger value="professional">Professional Development</TabsTrigger>
              <TabsTrigger value="personal">Personal Growth</TabsTrigger>
              <TabsTrigger value="community">Community Integration</TabsTrigger>
            </TabsList>
            <TabsContent value="professional">
              <div className="space-y-4">
                <h4 className="font-semibold">Professional Skill Development</h4>
                <p>
                  Track your progress in acquiring critical business skills and certifications
                  to enhance your entrepreneurial capabilities.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Current Training</h5>
                    <p className="text-sm text-muted-foreground">Business Plan Development</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                      <div className="h-full w-[65%] rounded-full bg-military-olive"></div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Upcoming Milestone</h5>
                    <p className="text-sm text-muted-foreground">Financial Management Certification</p>
                    <p className="text-xs text-muted-foreground mt-1">Starts in 2 weeks</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="personal">
              <div className="space-y-4">
                <h4 className="font-semibold">Personal Well-being Progress</h4>
                <p>
                  Monitor your adaptation to civilian life, including stress management,
                  work-life balance, and personal health goals.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Current Focus</h5>
                    <p className="text-sm text-muted-foreground">Stress Reduction Techniques</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                      <div className="h-full w-[50%] rounded-full bg-military-olive"></div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Wellness Goal</h5>
                    <p className="text-sm text-muted-foreground">Establish Regular Exercise Routine</p>
                    <p className="text-xs text-muted-foreground mt-1">3 of 5 days per week achieved</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="community">
              <div className="space-y-4">
                <h4 className="font-semibold">Community Engagement</h4>
                <p>
                  Track your integration into civilian business networks and
                  community organizations.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Recent Activity</h5>
                    <p className="text-sm text-muted-foreground">Local Chamber of Commerce Networking</p>
                    <p className="text-xs text-muted-foreground mt-1">2 events attended this month</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium">Upcoming Opportunity</h5>
                    <p className="text-sm text-muted-foreground">Veteran Business Owner Meetup</p>
                    <p className="text-xs text-muted-foreground mt-1">Next Tuesday at 6:00 PM</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CivilianIntegrationSupport;
