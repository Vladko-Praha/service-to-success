
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  CheckCheck, 
  Download, 
  Upload, 
  Clock,
  Award,
  PencilRuler
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trainingData } from "./trainingData";

type AssignmentContentProps = {
  activeSection: string;
  activeModule: string;
};

const AssignmentContent = ({
  activeSection,
  activeModule,
}: AssignmentContentProps) => {
  const [assignmentText, setAssignmentText] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState<{[key: string]: string}>(() => {
    const saved = localStorage.getItem("submittedAssignments");
    return saved ? JSON.parse(saved) : {};
  });
  const [feedback, setFeedback] = useState<{[key: string]: string}>(() => {
    const saved = localStorage.getItem("assignmentFeedback");
    return saved ? JSON.parse(saved) : {};
  });
  
  const { toast } = useToast();
  
  const sectionData = trainingData.find(s => s.id === activeSection);
  const moduleData = sectionData?.modules.find(m => m.id === activeModule);
  
  const assignmentId = `${activeSection}-${activeModule}`;
  const isSubmitted = !!submittedAssignments[assignmentId];
  const hasFeedback = !!feedback[assignmentId];
  
  const handleSubmit = () => {
    if (!assignmentText.trim()) {
      toast({
        title: "Empty submission",
        description: "Please complete the assignment before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedSubmissions = {
      ...submittedAssignments,
      [assignmentId]: assignmentText
    };
    
    setSubmittedAssignments(updatedSubmissions);
    localStorage.setItem("submittedAssignments", JSON.stringify(updatedSubmissions));
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been successfully submitted for review.",
    });
    
    // Simulate receiving feedback after a delay (in a real app, this would come from an instructor)
    setTimeout(() => {
      const newFeedback = {
        ...feedback,
        [assignmentId]: generateFeedback(assignmentText, moduleData?.title || "")
      };
      setFeedback(newFeedback);
      localStorage.setItem("assignmentFeedback", JSON.stringify(newFeedback));
    }, 5000); // 5 seconds delay to simulate review time
  };
  
  const generateFeedback = (text: string, moduleTitle: string) => {
    const length = text.length;
    
    if (length < 100) {
      return "Your submission is too brief. Please provide more detailed analysis and examples from the course material.";
    } else if (length < 300) {
      return `Good start on your ${moduleTitle} assignment. Consider expanding on your ideas with more specific examples from your planned business venture.`;
    } else {
      return `Excellent work on your ${moduleTitle} assignment! Your detailed analysis shows a strong understanding of the concepts. Consider implementing these ideas in your business plan as we move forward.`;
    }
  };
  
  const handleDownload = (filename: string) => {
    // Create a dummy content for the file
    const content = "Assignment instructions for: " + filename;
    const mimeType = "text/plain";
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Append the link to the body
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    });
  };

  if (!sectionData || !moduleData) {
    return <div className="p-8 text-center">Assignment not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-military-navy">{moduleData.title} Assignment</h1>
          <p className="text-gray-600">{sectionData.title}</p>
        </div>
        <div className="bg-military-olive/20 px-3 py-1 rounded-full text-sm text-military-navy">
          <span className="font-medium">Due: </span> 
          <span>2 weeks from enrollment</span>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PencilRuler className="h-5 w-5 text-military-olive" />
            Assignment Brief
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => handleDownload(`${moduleData.title} - Assignment Brief.pdf`)}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p>Based on the concepts covered in <strong>{moduleData.title}</strong>, complete the following assignment:</p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Analyze how the concepts from this module apply to your specific business idea or situation.</li>
              <li>Develop a concrete action plan with at least 3 specific steps you will take to implement these concepts.</li>
              <li>Identify potential challenges you might face and strategies to overcome them.</li>
              <li>Explain how successful implementation will contribute to your overall business objectives.</li>
            </ol>
            
            <p className="mt-4 text-sm text-military-navy/70">
              Your assignment should reference specific concepts from the module lessons and demonstrate practical application.
            </p>
          </div>
          
          <div className="bg-military-beige/30 p-4 rounded-md">
            <h3 className="font-semibold text-military-navy mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-military-olive" />
              Evaluation Criteria
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Understanding of core concepts (30%)</li>
              <li>• Practical application to your business (30%)</li>
              <li>• Actionable implementation steps (25%)</li>
              <li>• Clarity and organization (15%)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-military-olive" />
            Your Submission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSubmitted ? (
            <>
              <Textarea 
                placeholder="Type your assignment submission here..."
                className="min-h-[200px]"
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                disabled={isSubmitted}
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Recommended length: 300-500 words
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setAssignmentText("")} disabled={!assignmentText || isSubmitted}>
                    Clear
                  </Button>
                  <Button onClick={handleSubmit} disabled={!assignmentText || isSubmitted}>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md border">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCheck className="h-5 w-5" />
                  <span className="font-medium">Submitted</span>
                </div>
                <p className="whitespace-pre-line">{submittedAssignments[assignmentId]}</p>
              </div>
              
              {hasFeedback && (
                <div className="bg-military-beige/30 p-4 rounded-md">
                  <h3 className="font-semibold text-military-navy mb-2">Instructor Feedback</h3>
                  <p>{feedback[assignmentId]}</p>
                </div>
              )}
              
              <Button variant="outline" onClick={() => {
                // Reset assignment to allow resubmission
                const updatedSubmissions = {...submittedAssignments};
                delete updatedSubmissions[assignmentId];
                setSubmittedAssignments(updatedSubmissions);
                localStorage.setItem("submittedAssignments", JSON.stringify(updatedSubmissions));
                
                const updatedFeedback = {...feedback};
                delete updatedFeedback[assignmentId];
                setFeedback(updatedFeedback);
                localStorage.setItem("assignmentFeedback", JSON.stringify(updatedFeedback));
              }}>
                Resubmit Assignment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentContent;
