
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Link2, 
  PlusCircle, 
  ExternalLink, 
  MessageSquare, 
  Share,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CollaborationContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Sample teams data
  const teams = [
    {
      id: 1,
      name: "Fire Team Alpha",
      description: "Digital marketing specialists focused on customer acquisition",
      members: [
        { id: 1, name: "John K.", role: "Team Lead" },
        { id: 2, name: "Sarah M.", role: "SEO Specialist" },
        { id: 3, name: "Marcus T.", role: "Content Creator" },
      ],
      tags: ["Marketing", "Digital", "SEO"],
      nextMeeting: "Tomorrow, 3:00 PM",
      progress: 75
    },
    {
      id: 2,
      name: "Echo Business Ventures",
      description: "E-commerce specialists collaborating on inventory management solutions",
      members: [
        { id: 4, name: "Lisa R.", role: "Project Manager" },
        { id: 5, name: "David W.", role: "Supply Chain Specialist" },
      ],
      tags: ["E-commerce", "Logistics", "Operations"],
      nextMeeting: "Friday, 10:00 AM",
      progress: 40
    },
    {
      id: 3,
      name: "Tactical Tech Team",
      description: "Software development and tech implementation for veteran businesses",
      members: [
        { id: 6, name: "Michael P.", role: "Developer" },
        { id: 7, name: "Amanda S.", role: "UX Designer" },
        { id: 8, name: "Brandon K.", role: "Project Manager" },
      ],
      tags: ["Tech", "Software", "Development"],
      nextMeeting: "Thursday, 1:00 PM",
      progress: 60
    }
  ];

  const handleJoinTeam = (teamId: number) => {
    toast({
      title: "Team Request Sent",
      description: "Your request to join the team has been sent to the team leader.",
    });
  };

  const handleCreateTeam = () => {
    toast({
      title: "Create a Team",
      description: "Team creation form will be available soon.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-military-navy">Collaboration Teams</h1>
          <p className="text-gray-600">Work together with fellow veterans on business projects</p>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <Button onClick={handleCreateTeam}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {teams.map(team => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {team.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{team.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0" onClick={() => handleJoinTeam(team.id)}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Join
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Team Members</div>
                  <div className="flex -space-x-2">
                    {team.members.map(member => (
                      <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="h-8 w-8 rounded-full bg-military-olive/20 flex items-center justify-center text-xs text-military-navy font-medium border-2 border-white">
                      +2
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Next Meeting</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-military-olive" />
                    <span>{team.nextMeeting}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Focus Areas</div>
                  <div className="flex flex-wrap gap-1">
                    {team.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-military-beige/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Project Progress</div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div 
                      className="h-full rounded-full bg-military-olive" 
                      style={{ width: `${team.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-right mt-1">{team.progress}% Complete</div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Projects
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollaborationContent;
