
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flag, MessageSquare, Users } from "lucide-react";

const FireTeamNetwork = () => {
  const veterans = [
    {
      id: 1,
      name: "James Wilson",
      rank: "MAJ",
      branch: "Army",
      business: "Tactical Consulting, LLC",
      industry: "Business Consulting",
      status: "online",
      avatar: "",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      rank: "CPT",
      branch: "Marines",
      business: "Precision Logistics",
      industry: "Supply Chain",
      status: "offline",
      avatar: "",
    },
    {
      id: 3,
      name: "Michael Johnson",
      rank: "SFC",
      branch: "Army",
      business: "Secure Tech Solutions",
      industry: "Cybersecurity",
      status: "online",
      avatar: "",
    },
    {
      id: 4,
      name: "Rebecca Davis",
      rank: "LCDR",
      branch: "Navy",
      business: "Maritime Training Institute",
      industry: "Education",
      status: "online",
      avatar: "",
    },
    {
      id: 5,
      name: "Thomas Wright",
      rank: "Maj",
      branch: "Air Force",
      business: "Aerial Photography Services",
      industry: "Media",
      status: "offline",
      avatar: "",
    },
  ];

  const advisors = [
    {
      id: 1,
      name: "Robert Miller",
      rank: "COL (Ret.)",
      specialty: "Business Strategy",
      yearsFounded: 3,
      avatar: "",
    },
    {
      id: 2,
      name: "Lisa Thompson",
      rank: "LTC (Ret.)",
      specialty: "Marketing & Sales",
      yearsFounded: 5,
      avatar: "",
    },
    {
      id: 3,
      name: "Gregory Lewis",
      rank: "CMSgt (Ret.)",
      specialty: "Operations Management",
      yearsFounded: 7,
      avatar: "",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Veteran Entrepreneur Networking Event",
      date: "June 15, 2024",
      location: "Virtual",
      attendees: 42,
    },
    {
      id: 2,
      title: "Business Funding Workshop",
      date: "June 22, 2024",
      location: "Chicago, IL",
      attendees: 28,
    },
    {
      id: 3,
      title: "Marketing Masterclass for Veteran Businesses",
      date: "July 8, 2024",
      location: "Virtual",
      attendees: 35,
    },
  ];

  const successStories = [
    {
      id: 1,
      veteran: "David Richards",
      rank: "CPT",
      business: "Resilient Technologies",
      achievement: "Secured $500K in seed funding for cybersecurity startup.",
    },
    {
      id: 2,
      veteran: "Amanda Foster",
      rank: "SSgt",
      business: "Mission Medical Supply",
      achievement: "Expanded to 3 locations within first year of operation.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Fire Team Network</h2>
        <Badge className="bg-military-olive text-military-sand">
          24 ACTIVE VETERANS
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Fellow Veteran Operators</CardTitle>
              <CardDescription>
                Connect with other veterans building businesses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {veterans.map((veteran) => (
                  <div key={veteran.id} className="flex items-center justify-between rounded-md border border-military-tan p-3 hover:bg-military-sand/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-military-navy text-military-sand">
                          {veteran.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-military-navy">{veteran.rank} {veteran.name}</h4>
                          <div className={`h-2 w-2 rounded-full ${veteran.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <p className="text-sm text-military-navy/70">{veteran.business} • {veteran.industry}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {veteran.branch}
                        </Badge>
                      </div>
                    </div>
                    <button className="rounded-full p-2 text-military-olive hover:bg-military-olive/10">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </div>
                ))}

                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-military-olive bg-military-olive/10 px-4 py-2 text-sm font-medium text-military-olive hover:bg-military-olive/20">
                  <Users className="h-4 w-4" />
                  <span>View All Veterans</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Senior Advisors</CardTitle>
              <CardDescription>
                Experienced veterans who can guide your mission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisors.map((advisor) => (
                  <div key={advisor.id} className="flex items-center gap-3 rounded-md border border-military-tan p-3 hover:bg-military-sand/50 transition-colors cursor-pointer">
                    <Avatar>
                      <AvatarFallback className="bg-military-olive text-military-sand">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-military-navy">{advisor.rank} {advisor.name}</h4>
                      <p className="text-sm text-military-navy/70">{advisor.specialty}</p>
                      <p className="text-xs text-military-navy/50">{advisor.yearsFounded} years as founder</p>
                    </div>
                  </div>
                ))}
                
                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-military-olive bg-military-olive/10 px-4 py-2 text-sm font-medium text-military-olive hover:bg-military-olive/20">
                  <span>Request Advisor Meeting</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Rallying Points</CardTitle>
            <CardDescription>
              Networking events and meetups for veteran entrepreneurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="rounded-md border border-military-tan p-3">
                  <h4 className="font-bold text-military-navy">{event.title}</h4>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-military-olive" />
                      <span className="text-sm text-military-navy/70">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-military-olive" />
                      <span className="text-sm text-military-navy/70">{event.attendees} attending</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline">{event.location}</Badge>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="rounded-md bg-military-navy px-3 py-1 text-xs font-medium text-military-sand hover:bg-military-navy/90">
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Victory Reports</CardTitle>
            <CardDescription>
              Success stories from program veterans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {successStories.map((story) => (
                <div key={story.id} className="flex items-start gap-3 rounded-md border border-military-tan p-3">
                  <Flag className="mt-1 h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-bold text-military-navy">{story.rank} {story.veteran}</h4>
                    <p className="text-sm font-medium text-military-navy/70">{story.business}</p>
                    <p className="mt-1 text-sm text-military-navy">{story.achievement}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-md border border-dashed border-military-olive/50 p-3 text-center">
                <h4 className="font-bold text-military-navy">Share Your Victory</h4>
                <p className="mt-1 text-sm text-military-navy/70">
                  Let your fellow veterans know about your business achievements.
                </p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-md bg-military-olive px-4 py-2 text-sm font-medium text-military-sand hover:bg-military-olive/90">
                  <Flag className="h-4 w-4" />
                  <span>Submit Story</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FireTeamNetwork;
