
import { CheckCircle, Circle, Clock, ExternalLink, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MissionProgressTracker = () => {
  const currentPhase = 2;
  const totalPhases = 3;
  const progressPercentage = Math.round((currentPhase / totalPhases) * 100);
  
  const phases = [
    {
      id: 1,
      name: "PHASE 1: DIGITAL DEPLOYMENT BOOTCAMP",
      status: "completed",
      description: "Laying the foundation for your business operation",
      modules: [
        { name: "Business Intelligence Gathering", status: "completed" },
        { name: "Strategic Business Planning", status: "completed" },
        { name: "Digital Asset Development", status: "completed" },
        { name: "Tactical Marketing Operations", status: "completed" },
        { name: "Supply Chain & Logistics", status: "completed" },
        { name: "Initial Revenue Operations", status: "completed" }
      ]
    },
    {
      id: 2,
      name: "PHASE 2: STRATEGIC BUSINESS OPERATIONS",
      status: "in-progress",
      description: "Scaling and optimizing your business systems",
      modules: [
        { name: "Advanced Market Intelligence", status: "completed" },
        { name: "Scaling & Automation", status: "completed" },
        { name: "Business Resilience", status: "in-progress" },
        { name: "Advanced Marketing Operations", status: "upcoming" },
        { name: "Financial Operations", status: "upcoming" },
        { name: "Strategic Growth Planning", status: "upcoming" }
      ]
    },
    {
      id: 3,
      name: "PHASE 3: VETERAN BUSINESS MASTERY",
      status: "upcoming",
      description: "Dominating your market and achieving mission success",
      modules: [
        { name: "Market Domination Strategies", status: "upcoming" },
        { name: "Advanced Business Intelligence", status: "upcoming" },
        { name: "Strategic Partnerships & Alliances", status: "upcoming" },
        { name: "Leadership & Team Development", status: "upcoming" },
        { name: "Business Expansion Operations", status: "upcoming" },
        { name: "Legacy Planning & Exit Strategies", status: "upcoming" }
      ]
    }
  ];

  const upcomingTasks = [
    { 
      title: "Complete Business Resilience Module", 
      deadline: "June 15, 2024",
      priority: "high" 
    },
    { 
      title: "Develop Crisis Management Plan", 
      deadline: "June 20, 2024",
      priority: "medium" 
    },
    { 
      title: "Identify Multiple Income Streams", 
      deadline: "June 25, 2024",
      priority: "medium" 
    },
    { 
      title: "Implement Risk Assessment Protocol", 
      deadline: "June 30, 2024",
      priority: "high" 
    }
  ];

  const commandFeedback = [
    {
      date: "May 28, 2024",
      feedback: "Excellent work on the market research. Your detailed analysis of competitors shows strong attention to detail.",
      rating: 4.8
    },
    {
      date: "May 15, 2024",
      feedback: "Business plan needs more specific financial projections. Review the financial modeling training and adjust accordingly.",
      rating: 3.5
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-military-navy">Mission Progress Tracker</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-military-navy/70">GRADUATION READINESS:</span>
          <span className="font-bold text-military-olive">{progressPercentage}%</span>
        </div>
      </div>

      {/* Overall Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Operation Phase Completion</span>
            <span className="text-military-olive">{progressPercentage}%</span>
          </CardTitle>
          <CardDescription>Track your journey through the business deployment program</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-2 mb-6" />
          
          <div className="space-y-6">
            {phases.map((phase) => (
              <div key={phase.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  {phase.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-military-olive" />
                  ) : phase.status === "in-progress" ? (
                    <Clock className="h-5 w-5 text-military-olive" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <h3 className={`font-bold ${phase.status === "upcoming" ? "text-gray-400" : "text-military-navy"}`}>
                    {phase.name}
                  </h3>
                  {phase.status === "in-progress" && (
                    <span className="ml-2 rounded-full bg-military-olive px-2 py-0.5 text-xs font-medium text-military-sand">
                      CURRENT
                    </span>
                  )}
                </div>
                
                <p className={`ml-7 text-sm ${phase.status === "upcoming" ? "text-gray-400" : "text-military-navy/70"}`}>
                  {phase.description}
                </p>
                
                {phase.status !== "upcoming" && (
                  <div className="ml-7 grid grid-cols-2 gap-2">
                    {phase.modules.map((module, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {module.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-military-olive" />
                        ) : module.status === "in-progress" ? (
                          <Clock className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm ${module.status === "upcoming" ? "text-gray-400" : "text-military-navy"}`}>
                          {module.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Mission Tasks</CardTitle>
            <CardDescription>Critical objectives that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, idx) => (
                <div key={idx} className="flex items-start justify-between rounded-md border border-military-tan p-3 transition-colors hover:bg-military-sand/50">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-3 w-3 rounded-full ${task.priority === "high" ? "bg-red-500" : "bg-amber-500"}`} />
                    <div>
                      <h4 className="font-medium text-military-navy">{task.title}</h4>
                      <p className="text-sm text-military-navy/70">Due: {task.deadline}</p>
                    </div>
                  </div>
                  <a href="#" className="text-military-navy hover:text-military-olive">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Command Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle>Command Feedback</CardTitle>
            <CardDescription>Performance evaluations from your instructors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commandFeedback.map((feedback, idx) => (
                <div key={idx} className="rounded-md border border-military-tan p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-military-navy/70">{feedback.date}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-military-navy">{feedback.rating}</span>
                            <span className="text-xs text-military-navy/70">/5.0</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Performance Rating</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="mt-2 text-military-navy">{feedback.feedback}</p>
                </div>
              ))}
              <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-military-olive hover:underline">
                <span>View all feedback</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MissionProgressTracker;
