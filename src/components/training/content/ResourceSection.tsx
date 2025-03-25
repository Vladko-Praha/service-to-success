
import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Download, RefreshCw } from "lucide-react";
import { useContentDelivery } from "@/hooks/use-content-delivery";
import { useToast } from "@/hooks/use-toast";
import { DocumentResource } from "@/services/media/documentCdnService";

const ResourceSection: React.FC = () => {
  const { toast } = useToast();
  const { 
    fetchDocument, 
    documentResources, 
    loading, 
    errors, 
    isResourceExpiring,
    refreshResourceUrl
  } = useContentDelivery();
  
  // Demo resource IDs
  const resourceIds = [
    "doc-business-structure-comparison",
    "doc-registration-checklist"
  ];
  
  // Function to handle document download
  const handleDocumentDownload = async (documentId: string) => {
    try {
      // Check if we already have the document resource
      let document = documentResources[documentId];
      
      // If not loaded or expiring soon, fetch/refresh it
      if (!document || isResourceExpiring(documentId, 'document')) {
        document = await fetchDocument(documentId);
      }
      
      if (!document) {
        toast({
          title: "Download Failed",
          description: "Could not prepare the document for download",
          variant: "destructive"
        });
        return;
      }
      
      // Track the document usage
      import('@/services/media/documentCdnService').then(module => {
        module.documentCdnService.trackDocumentUsage(documentId, 'download');
      });
      
      // Open the download URL in a new tab
      window.open(document.downloadUrl, '_blank');
      
      toast({
        title: "Download Started",
        description: `${document.title} is downloading...`
      });
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading",
        variant: "destructive"
      });
    }
  };
  
  // Function to get document title
  const getDocumentTitle = (documentId: string): string => {
    if (documentResources[documentId]) {
      return documentResources[documentId].title;
    }
    
    // Default titles if not loaded
    switch (documentId) {
      case "doc-business-structure-comparison":
        return "Business Structure Comparison Chart";
      case "doc-registration-checklist":
        return "Business Registration Checklist";
      default:
        return "Document Resource";
    }
  };
  
  // Function to format file size
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "";
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  // Render a document item with download button
  const renderDocumentItem = (documentId: string) => {
    const document = documentResources[documentId];
    const isLoading = loading[documentId];
    const error = errors[documentId];
    
    return (
      <div key={documentId} className="flex items-center justify-between bg-military-beige/10 p-3 rounded-lg">
        <div className="flex items-center">
          <Folder className="h-5 w-5 mr-2 text-military-olive" />
          <div>
            <span>{getDocumentTitle(documentId)}</span>
            {document && (
              <div className="text-xs text-gray-500 mt-0.5">
                {formatFileSize(document.fileSize)}
                {document.pages && ` • ${document.pages} pages`}
              </div>
            )}
          </div>
        </div>
        
        {error ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => fetchDocument(documentId)}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Retry
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDocumentDownload(documentId)}
            disabled={isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            {isLoading ? "Preparing..." : "Download"}
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Additional Resources</h3>
      <div className="space-y-2">
        {resourceIds.map(renderDocumentItem)}
      </div>
    </div>
  );
};

export default ResourceSection;
