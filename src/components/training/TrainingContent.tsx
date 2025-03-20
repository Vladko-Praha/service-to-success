
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trainingData } from "./trainingData";
import { Video, FileText, Download, CheckCircle, MessageSquare } from "lucide-react";

type TrainingContentProps = {
  activeSection: string;
  activeModule: string;
  activeClass: string;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
};

const TrainingContent = ({
  activeSection,
  activeModule,
  activeClass,
  setActiveSection,
  setActiveModule,
  setActiveClass,
}: TrainingContentProps) => {
  const [content, setContent] = useState<{
    title: string;
    description: string;
    content: string;
    sectionTitle: string;
    moduleTitle: string;
  } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [comments, setComments] = useState<{[key: string]: {text: string, date: string}[]}>({});
  const [commentText, setCommentText] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  useEffect(() => {
    // Get content based on active selections
    const sectionData = trainingData.find((s) => s.id === activeSection);
    if (sectionData) {
      const moduleData = sectionData.modules.find((m) => m.id === activeModule);
      if (moduleData) {
        const classData = moduleData.classes.find((c) => c.id === activeClass);
        if (classData) {
          setContent({
            title: classData.title,
            description: `${sectionData.title} > ${moduleData.title}`,
            content: classData.content,
            sectionTitle: sectionData.title,
            moduleTitle: moduleData.title,
          });
        }
      }
    }

    // Load completed lessons from localStorage
    const savedCompletedLessons = localStorage.getItem("completedLessons");
    if (savedCompletedLessons) {
      setCompletedLessons(JSON.parse(savedCompletedLessons));
    }

    // Load comments from localStorage
    const savedComments = localStorage.getItem("lessonComments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [activeSection, activeModule, activeClass]);

  const isLessonCompleted = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    return completedLessons.includes(lessonId);
  };

  const markAsComplete = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    if (!isLessonCompleted()) {
      const updatedCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompletedLessons);
      localStorage.setItem("completedLessons", JSON.stringify(updatedCompletedLessons));
    }
  };

  const getLessonComments = () => {
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    return comments[lessonId] || [];
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    
    const lessonId = `${activeSection}-${activeModule}-${activeClass}`;
    const newComment = {
      text: commentText,
      date: new Date().toLocaleDateString()
    };
    
    const updatedComments = {
      ...comments,
      [lessonId]: [...(comments[lessonId] || []), newComment]
    };
    
    setComments(updatedComments);
    localStorage.setItem("lessonComments", JSON.stringify(updatedComments));
    setCommentText("");
  };

  const toggleVideoPlayer = () => {
    setShowVideoPlayer(!showVideoPlayer);
  };

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <span className="cursor-pointer hover:text-military-navy" 
              onClick={() => setActiveSection(activeSection)}>
          {content.sectionTitle}
        </span>
        <span>/</span>
        <span className="cursor-pointer hover:text-military-navy"
              onClick={() => setActiveModule(activeModule)}>
          {content.moduleTitle}
        </span>
        <span>/</span>
        <span className="text-military-navy">{content.title}</span>
      </div>

      {/* Lesson Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-military-navy flex items-center gap-2">
          {content.title}
          {isLessonCompleted() && <CheckCircle className="h-6 w-6 text-green-500" />}
        </h1>
        <p className="text-gray-600 mt-2">{content.description}</p>
      </div>

      {/* Video Player (Placeholder) */}
      {showVideoPlayer ? (
        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">
              <p className="text-center mb-4">Video player placeholder</p>
              <Button onClick={toggleVideoPlayer} variant="outline" className="bg-white text-black">
                Close Video
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="h-10 w-10 text-military-navy" />
            <div>
              <h3 className="font-medium">Lesson Video</h3>
              <p className="text-sm text-gray-600">Watch the full lesson video</p>
            </div>
          </div>
          <Button onClick={toggleVideoPlayer} variant="outline" className="bg-white">
            Play Video
          </Button>
        </div>
      )}

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: content.content }} 
          />
        </CardContent>
      </Card>

      {/* Downloads Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-military-navy" />
                <span>Lesson Summary PDF</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-military-navy" />
                <span>Exercise Worksheet</span>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mark as Complete Button */}
      <div className="flex justify-center">
        <Button 
          onClick={markAsComplete} 
          className="w-full md:w-auto px-8"
          disabled={isLessonCompleted()}
        >
          {isLessonCompleted() ? "Completed" : "Mark As Complete"}
        </Button>
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({getLessonComments().length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getLessonComments().length > 0 ? (
              <div className="space-y-4">
                {getLessonComments().map((comment, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium">User</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-3">No comments yet. Be the first to comment!</p>
            )}
            
            <Separator />
            
            <div className="space-y-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded-md p-3 min-h-[100px]"
              />
              <Button onClick={addComment} disabled={!commentText.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingContent;
