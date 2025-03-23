
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  FileQuestion, 
  Folder, 
  Users, 
  CheckCircle, 
  Timer, 
  Terminal,
  Building,
  Flag,
  PlusCircle
} from "lucide-react";
import { trainingData } from "./trainingData";
import PeerEvaluation from "./PeerEvaluation";
import StudentLibrary from "./StudentLibrary";

interface TrainingContentProps {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  activeView: string;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
}

const TrainingContent = ({ 
  activeSection, 
  activeModule, 
  activeClass, 
  activeView,
  setActiveSection,
  setActiveModule,
  setActiveClass
}: TrainingContentProps) => {
  const [currentSection, setCurrentSection] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [currentClass, setCurrentClass] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);

  useEffect(() => {
    // Find current section, module and class
    const section = trainingData.find(s => s.id === activeSection);
    setCurrentSection(section);
    
    if (section) {
      const module = section.modules.find(m => m.id === activeModule);
      setCurrentModule(module);
      
      if (module) {
        const classItem = module.classes.find(c => c.id === activeClass);
        setCurrentClass(classItem);
      }
    }
    
    // Get completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }
  }, [activeSection, activeModule, activeClass]);

  const handleMarkComplete = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    if (!completedLessons.includes(lessonId)) {
      const updatedCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompletedLessons);
      localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
    }
  };

  if (!currentSection || !currentModule || !currentClass) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Terminal className="h-5 w-5 text-military-olive" />
            <span className="text-military-navy">{currentSection.title}</span>
            <span className="mx-1">/</span>
            <span className="text-military-navy">{currentModule.title}</span>
            <span className="mx-1">/</span>
            <span className="text-military-navy">{currentClass.title}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-military-beige/20">
              <Building className="h-3.5 w-3.5 mr-1" />
              {currentSection.title}
            </Badge>
            <Badge variant="outline" className="bg-military-navy/10">
              <Flag className="h-3.5 w-3.5 mr-1" />
              Module {activeModule.split('-')[1]}
            </Badge>
            <Badge variant="outline" className="bg-military-olive/10">
              <Timer className="h-3.5 w-3.5 mr-1" />
              {currentClass.duration} min
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowLibrary(true)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Knowledge Base
          </Button>
          
          {!completedLessons.includes(`${activeSection}-${activeModule}-${activeClass}`) ? (
            <Button onClick={handleMarkComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Completed
            </Button>
          ) : (
            <Badge className="bg-green-100 border-green-200 text-green-800 flex items-center h-9 px-3">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Completed
            </Badge>
          )}
        </div>
      </div>
      
      <Tabs defaultValue={activeView} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="lessons" className="flex-1">
            <BookOpen className="h-4 w-4 mr-2" />
            Lesson
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex-1">
            <ClipboardList className="h-4 w-4 mr-2" />
            Assignment
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex-1">
            <FileQuestion className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="files" className="flex-1">
            <Folder className="h-4 w-4 mr-2" />
            Files
          </TabsTrigger>
          <TabsTrigger value="collaborations" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Collaboration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons" className="space-y-6">
          <div className="prose max-w-none">
            <h1>{currentClass.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentClass.content }} />
          </div>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-military-olive" />
                  Assignment: {currentClass.title} Implementation
                </h2>
                
                <div className="prose max-w-none">
                  <p>Apply the concepts from this lesson to create a detailed implementation plan for your business venture.</p>
                  
                  <h3>Assignment Requirements:</h3>
                  <ul>
                    <li>Create a detailed outline based on the lesson principles</li>
                    <li>Apply the framework to your specific business scenario</li>
                    <li>Include a timeline for implementation</li>
                    <li>Define metrics for measuring success</li>
                  </ul>
                  
                  <h3>Submission Guidelines:</h3>
                  <p>Submit your completed assignment for peer evaluation. Your work will be reviewed by another veteran in your cohort, and you'll receive AI-enhanced feedback.</p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button className="bg-military-olive hover:bg-military-olive/90">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <PeerEvaluation 
            assignmentId={`${activeSection}-${activeModule}-${activeClass}`} 
            assignmentTitle={currentClass.title} 
          />
        </TabsContent>
        
        <TabsContent value="discussions">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No active discussions yet</h3>
            <p className="text-gray-500 mt-1">Start a new discussion about this lesson</p>
            <Button className="mt-4">
              <PlusCircle className="h-4 w-4 mr-2" />
              Start Discussion
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="quizzes">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <FileQuestion className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No quizzes available</h3>
            <p className="text-gray-500 mt-1">Quizzes for this lesson will be added soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="files">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Folder className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No files available</h3>
            <p className="text-gray-500 mt-1">There are no files attached to this lesson</p>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborations">
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Users className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-700">No collaboration activities</h3>
            <p className="text-gray-500 mt-1">Collaboration activities will be added soon</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Student Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-military-olive" />
              Veteran Knowledge Base
            </DialogTitle>
            <DialogDescription>
              Access training resources, SOPs, and learning materials
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <StudentLibrary />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingContent;
