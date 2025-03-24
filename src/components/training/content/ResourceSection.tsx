
import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Download } from "lucide-react";

const ResourceSection: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Additional Resources</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-military-beige/10 p-3 rounded-lg">
          <div className="flex items-center">
            <Folder className="h-5 w-5 mr-2 text-military-olive" />
            <span>Business Structure Comparison Chart</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        
        <div className="flex items-center justify-between bg-military-beige/10 p-3 rounded-lg">
          <div className="flex items-center">
            <Folder className="h-5 w-5 mr-2 text-military-olive" />
            <span>Business Registration Checklist</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceSection;
