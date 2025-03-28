
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Users, 
  CheckCircle, 
  ThumbsUp, 
  Bot, 
  BookOpen, 
  FileText,
  Download,
  Lightbulb,
  Rocket,
  Search,
  PlusCircle,
  BookmarkPlus,
  Loader2
} from "lucide-react";
import StudentLibrary, { KnowledgeResource } from "./StudentLibrary";

interface PeerEvaluationProps {
  assignmentId: string;
  assignmentTitle: string;
}

type Evaluation = {
  id: string;
  from: string;
  submissionDate: string;
  feedback: string;
  strengths: string[];
  areasForImprovement: string[];
  rating: number;
  status: 'pending' | 'completed';
}

type AIFeedback = {
  summary: string;
  positiveHighlights: string[];
  improvementAreas: string[];
  additionalResources: {
    id: string;
    title: string;
    description: string;
    url: string;
    isNewlyCreated?: boolean;
  }[];
}

const PeerEvaluation = ({ assignmentId, assignmentTitle }: PeerEvaluationProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'give' | 'received'>('received');
  const [evaluationText, setEvaluationText] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [isGeneratingAIFeedback, setIsGeneratingAIFeedback] = useState(false);
  const [aiFeedback, setAIFeedback] = useState<AIFeedback | null>(null);
  const [isSearchingLibrary, setIsSearchingLibrary] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isCreatingResource, setIsCreatingResource] = useState(false);

  // Mock data for received evaluations
  const [receivedEvaluations, setReceivedEvaluations] = useState<Evaluation[]>([
    {
      id: "eval-1",
      from: "John Smith",
      submissionDate: "2023-09-15",
      feedback: "Great work on the assignment! I particularly liked your approach to the implementation strategy. You clearly defined your goals and the methods to achieve them. Your timeline was realistic and well-planned.",
      strengths: [
        "Well-organized executive summary",
        "Detailed implementation plan",
        "Creative approach to problem-solving"
      ],
      areasForImprovement: [
        "Could use more specific metrics for success measurement",
        "Consider adding more visual elements to the timeline"
      ],
      rating: 4,
      status: 'completed'
    }
  ]);

  // Submission handler
  const handleSubmitEvaluation = () => {
    if (!evaluationText.trim()) {
      toast({
        title: "Evaluation Required",
        description: "Please provide feedback before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Evaluation Submitted",
        description: "Your peer evaluation has been submitted successfully",
      });
      
      // Reset form
      setEvaluationText("");
      setStrengths("");
      setImprovements("");
      setRating(5);
      setActiveTab('received');
    }, 1500);
  };

  // Generate AI feedback
  const generateAIFeedback = () => {
    setIsGeneratingAIFeedback(true);
    
    // Simulate AI library search first
    setIsSearchingLibrary(true);
    
    // Simulate library search delay
    setTimeout(() => {
      setIsSearchingLibrary(false);
      
      // Simulate AI processing delay
      setTimeout(() => {
        setIsGeneratingAIFeedback(false);
        setShowAIFeedback(true);
        
        // Mock AI feedback data
        setAIFeedback({
          summary: "The peer evaluation highlights strong organizational skills and implementation planning, while suggesting improvements in metrics definition and visual presentation.",
          positiveHighlights: [
            "Excellent structure and organization of ideas",
            "Strong strategic planning approach",
            "Clear communication of complex concepts"
          ],
          improvementAreas: [
            "Consider incorporating more quantifiable success metrics",
            "Enhance visual representation of timeline and milestones",
            "Expand on resource allocation justification"
          ],
          additionalResources: [
            {
              id: "res-1",
              title: "Effective Business Metrics",
              description: "A guide to defining and tracking meaningful business metrics",
              url: "https://example.com/metrics-guide"
            },
            {
              id: "res-2",
              title: "Visual Communication in Business Plans",
              description: "How to effectively use visuals in business documentation",
              url: "https://example.com/visual-communication",
              isNewlyCreated: true
            },
            {
              id: "res-3",
              title: "Resource Allocation Strategies",
              description: "Best practices for justifying and allocating resources in business plans",
              url: "https://example.com/resource-allocation"
            }
          ]
        });
      }, 2000);
    }, 1500);
  };

  // Create new resource based on AI recommendation
  const handleCreateResource = (resource: {title: string, description: string, url: string}) => {
    setIsCreatingResource(true);
    
    // Simulate creation delay
    setTimeout(() => {
      setIsCreatingResource(false);
      
      toast({
        title: "Resource Created",
        description: `"${resource.title}" has been added to the Student Library`,
      });
    }, 1500);
  };

  // Handle resource selection from library
  const handleSelectLibraryResource = (resource: KnowledgeResource) => {
    toast({
      title: "Resource Added",
      description: `"${resource.title}" has been added to the recommendations`,
    });
    
    setShowLibrary(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-military-olive" />
            Peer Evaluation for "{assignmentTitle}"
          </CardTitle>
          <CardDescription>
            Exchange constructive feedback with fellow veterans in your cohort
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex border-b mb-4">
            <button
              className={`pb-2 px-4 font-medium ${activeTab === 'received' ? 'border-b-2 border-military-olive text-military-navy' : 'text-gray-500'}`}
              onClick={() => setActiveTab('received')}
            >
              Received Evaluations
            </button>
            <button
              className={`pb-2 px-4 font-medium ${activeTab === 'give' ? 'border-b-2 border-military-olive text-military-navy' : 'text-gray-500'}`}
              onClick={() => setActiveTab('give')}
            >
              Give Evaluation
            </button>
          </div>

          {activeTab === 'received' && (
            <div className="space-y-6">
              {receivedEvaluations.length > 0 ? (
                receivedEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-military-olive/20 flex items-center justify-center text-military-olive">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{evaluation.from}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {evaluation.submissionDate}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <ThumbsUp 
                                  key={i} 
                                  className={`h-4 w-4 ${i < evaluation.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-gray-700">{evaluation.feedback}</p>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-military-navy">Strengths</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {evaluation.strengths.map((strength, idx) => (
                              <li key={idx}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-military-navy">Areas for Improvement</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {evaluation.areasForImprovement.map((area, idx) => (
                              <li key={idx}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {!showAIFeedback && (
                      <div className="flex justify-center gap-2">
                        <Button
                          onClick={generateAIFeedback}
                          disabled={isGeneratingAIFeedback}
                          className="bg-military-navy hover:bg-military-navy/90"
                        >
                          <Bot className="h-4 w-4 mr-2" />
                          {isGeneratingAIFeedback ? "Generating AI Feedback..." : "Get AI Feedback on Evaluation"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowLibrary(true)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Search Knowledge Base
                        </Button>
                      </div>
                    )}
                    
                    {isSearchingLibrary && (
                      <Card className="border-military-olive/30">
                        <CardContent className="py-6">
                          <div className="flex flex-col items-center justify-center text-center">
                            <Search className="h-10 w-10 text-military-olive mb-4 animate-pulse" />
                            <h3 className="text-lg font-medium">Searching Knowledge Base</h3>
                            <p className="text-muted-foreground mt-1">
                              AI Battle Buddy is searching for relevant resources...
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {showAIFeedback && aiFeedback && (
                      <Card className="border-military-olive">
                        <CardHeader className="bg-military-olive/10 pb-2">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Bot className="h-5 w-5 text-military-olive" />
                            AI Battle Buddy Feedback
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            <p className="text-gray-700">{aiFeedback.summary}</p>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <h4 className="font-medium text-military-navy flex items-center gap-2">
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                                Positive Highlights
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {aiFeedback.positiveHighlights.map((highlight, idx) => (
                                  <li key={idx}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-medium text-military-navy flex items-center gap-2">
                                <Rocket className="h-4 w-4 text-blue-600" />
                                Areas for Improvement
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {aiFeedback.improvementAreas.map((area, idx) => (
                                  <li key={idx}>{area}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-military-navy flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                                  Additional Resources
                                </h4>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setShowLibrary(true)}
                                >
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Search Knowledge Base
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {aiFeedback.additionalResources.map((resource, idx) => (
                                  <div key={idx} className="border rounded-md p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-military-navy" />
                                        <span className="font-medium">{resource.title}</span>
                                        {resource.isNewlyCreated && (
                                          <Badge className="bg-green-100 text-green-800 border-green-200">Newly Created</Badge>
                                        )}
                                      </div>
                                      <div className="flex gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="flex items-center gap-1"
                                          onClick={() => window.open(resource.url, '_blank')}
                                        >
                                          <FileText className="h-3 w-3" />
                                          View
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex items-center gap-1"
                                          onClick={() => {
                                            toast({
                                              title: "Resource Bookmarked",
                                              description: `"${resource.title}" has been added to your bookmarks`,
                                            });
                                          }}
                                        >
                                          <BookmarkPlus className="h-3 w-3" />
                                          Bookmark
                                        </Button>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                  </div>
                                ))}
                              </div>

                              {isCreatingResource && (
                                <div className="rounded-md p-4 bg-military-beige/20 flex items-center justify-center">
                                  <Loader2 className="h-5 w-5 text-military-olive animate-spin mr-2" />
                                  <span>Creating new resource for the Knowledge Base...</span>
                                </div>
                              )}

                              <div className="flex justify-center mt-2">
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleCreateResource({
                                    title: "Success Metrics Framework for Veteran Businesses",
                                    description: "A comprehensive framework for developing and tracking success metrics specifically tailored to veteran-owned businesses.",
                                    url: "/resources/success-metrics-framework.pdf"
                                  })}
                                >
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Create Missing Resource
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-md">
                  <Users className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <h3 className="font-medium text-gray-700">No Evaluations Yet</h3>
                  <p className="text-gray-500 mt-1">You haven't received any peer evaluations for this assignment yet</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'give' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Your Feedback</label>
                <Textarea
                  placeholder="Provide detailed feedback on your peer's assignment..."
                  className="min-h-[120px]"
                  value={evaluationText}
                  onChange={(e) => setEvaluationText(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Strengths</label>
                  <Textarea
                    placeholder="List the strengths of this assignment..."
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Areas for Improvement</label>
                  <Textarea
                    placeholder="Suggest areas that could be improved..."
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-medium">Rating</label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none"
                    >
                      <ThumbsUp 
                        className={`h-6 w-6 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <Button
                  onClick={handleSubmitEvaluation}
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Evaluation
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-military-olive" />
              Veteran Knowledge Base
            </DialogTitle>
            <DialogDescription>
              Search for additional resources to complement your learning
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <StudentLibrary 
              onSelectResource={handleSelectLibraryResource}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PeerEvaluation;
