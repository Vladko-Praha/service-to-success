
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trainingData } from "./trainingData";

type TrainingContentProps = {
  activeSection: string;
  activeModule: string;
  activeClass: string;
};

const TrainingContent = ({
  activeSection,
  activeModule,
  activeClass,
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

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-military-navy">{content.title}</h1>
        <p className="text-gray-600 mt-2">{content.description}</p>
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
