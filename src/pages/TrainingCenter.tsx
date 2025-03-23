
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TrainingCenterSidebar from "@/components/training/TrainingCenterSidebar";
import TrainingContent from "@/components/training/TrainingContent";
import { trainingData } from "@/components/training/trainingData";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare, 
  FileQuestion, 
  Folder, 
  Users,
  Menu,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TrainingCenter = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("business-establishment");
  const [activeModule, setActiveModule] = useState("module-1");
  const [activeClass, setActiveClass] = useState("class-1");
  const [activeView, setActiveView] = useState("lessons");
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [totalLessonsCount, setTotalLessonsCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Calculate total lessons count
    let total = 0;
    trainingData.forEach(section => {
      section.modules.forEach(module => {
        total += module.classes.length;
      });
    });
    setTotalLessonsCount(total);

    // Get completed lessons count from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessonsCount(JSON.parse(savedCompletedLessons).length);
    }
  }, []);

  const getViewIcon = () => {
    switch (activeView) {
      case "lessons":
        return <BookOpen className="h-5 w-5" />;
      case "assignments":
        return <ClipboardList className="h-5 w-5" />;
      case "discussions":
        return <MessageSquare className="h-5 w-5" />;
      case "quizzes":
        return <FileQuestion className="h-5 w-5" />;
      case "files":
        return <Folder className="h-5 w-5" />;
      case "collaborations":
        return <Users className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-military-beige/20">
        <TrainingCenterSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          activeClass={activeClass}
          setActiveClass={setActiveClass}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="bg-military-navy p-4 text-white">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                {getViewIcon()}
                <h1 className="text-xl font-bold capitalize">{activeView}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-military-olive/20 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{completedLessonsCount}</span> of <span>{totalLessonsCount}</span> lessons completed
                </div>
                <Button 
                  variant="outline"
                  className="text-white border-white hover:text-white/80 hover:bg-white/10"
                  onClick={() => navigate("/lesson-creator")}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Lesson
                </Button>
                <Button 
                  className="md:hidden"
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <TrainingContent 
                activeSection={activeSection}
                activeModule={activeModule}
                activeClass={activeClass}
                activeView={activeView}
                setActiveSection={setActiveSection}
                setActiveModule={setActiveModule}
                setActiveClass={setActiveClass}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TrainingCenter;
