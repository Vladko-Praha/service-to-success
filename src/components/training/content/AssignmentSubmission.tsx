
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssignmentSubmissionProps {
  currentClass: any;
}

const AssignmentSubmission: React.FC<AssignmentSubmissionProps> = ({ currentClass }) => {
  const { toast } = useToast();
  const [activeAssignmentTab, setActiveAssignmentTab] = useState("instructions");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentAnswer, setAssignmentAnswer] = useState("");

  const handleSubmitAssignment = () => {
    if (assignmentAnswer.trim().length < 10) {
      toast({
        title: "Assignment too short",
        description: "Please provide a more detailed answer to submit your assignment.",
        variant: "destructive"
      });
      return;
    }
    
    setAssignmentSubmitted(true);
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully and is pending review."
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assignment: {currentClass.title}</h1>
      
      <Tabs defaultValue="instructions" value={activeAssignmentTab} onValueChange={setActiveAssignmentTab}>
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="submission">Your Submission</TabsTrigger>
        </TabsList>
        
        <TabsContent value="instructions" className="space-y-4 mt-4">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Assignment Overview</h2>
            <p>
              For this assignment, you will create a detailed plan for establishing your business
              entity based on your specific business idea and circumstances.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Requirements</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Identify the most appropriate business structure for your venture and explain your reasoning (250-300 words)</li>
              <li>List all the local, state, and federal registrations you'll need to obtain</li>
              <li>Create a timeline for completing all the required legal steps to establish your business</li>
              <li>Identify potential challenges in the registration process and your strategies to overcome them</li>
            </ol>
            
            <h2 className="text-xl font-semibold mt-6">Submission Guidelines</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your submission should be between 750-1000 words</li>
              <li>Include references to at least three credible sources</li>
              <li>Submit as a text entry in the submission tab</li>
              <li>Due date: Within one week of completing this lesson</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveAssignmentTab("submission")}>
              Go to Submission
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="submission" className="space-y-4 mt-4">
          {!assignmentSubmitted ? (
            <>
              <Textarea
                value={assignmentAnswer}
                onChange={(e) => setAssignmentAnswer(e.target.value)}
                placeholder="Enter your assignment submission here..."
                className="min-h-[300px]"
              />
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveAssignmentTab("instructions")}>
                  Review Instructions
                </Button>
                <Button
                  onClick={handleSubmitAssignment}
                  disabled={assignmentAnswer.trim().length < 10}
                  className="bg-military-olive hover:bg-military-olive/90"
                >
                  Submit Assignment
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-green-800">Assignment Submitted</h3>
                    <p className="text-green-700 text-sm">
                      Your assignment has been submitted and is waiting for review.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Your Submission</h3>
                <p className="whitespace-pre-wrap">{assignmentAnswer}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentSubmission;
