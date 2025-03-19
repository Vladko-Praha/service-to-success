
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Speaker } from "lucide-react";
import { trainingData } from "./trainingData";

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
  } | null>(null);

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
          });
        }
      }
    }
  }, [activeSection, activeModule, activeClass]);

  const handleSectionChange = (sectionId: string) => {
    const section = trainingData.find((s) => s.id === sectionId);
    if (section && section.modules.length > 0 && section.modules[0].classes.length > 0) {
      setActiveSection(sectionId);
      setActiveModule(section.modules[0].id);
      setActiveClass(section.modules[0].classes[0].id);
    }
  };

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-military-navy">{content.title}</h1>
        <p className="text-gray-600 mt-2">{content.description}</p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Button 
            variant={activeSection === "business-establishment" ? "default" : "outline"}
            className="gap-2"
            onClick={() => handleSectionChange("business-establishment")}
          >
            <Briefcase className="h-4 w-4" />
            Business Establishment
          </Button>
          <Button 
            variant={activeSection === "online-business-types" ? "default" : "outline"}
            className="gap-2"
            onClick={() => handleSectionChange("online-business-types")}
          >
            <Globe className="h-4 w-4" />
            Online Business Types
          </Button>
          <Button 
            variant={activeSection === "marketing" ? "default" : "outline"}
            className="gap-2"
            onClick={() => handleSectionChange("marketing")}
          >
            <Speaker className="h-4 w-4" />
            Marketing
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingContent;
