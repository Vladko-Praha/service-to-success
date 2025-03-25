
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, Download, RefreshCw, Upload } from "lucide-react";
import { useContentDelivery } from "@/hooks/use-content-delivery";
import { useToast } from "@/hooks/use-toast";
import { DocumentResource, documentCdnService } from "@/services/media/documentCdnService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState("");
  const [docDescription, setDocDescription] = useState("");
  
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
      documentCdnService.trackDocumentUsage(documentId, 'download');
      
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
  
  // Function to handle document upload
  const handleDocumentUpload = async () => {
    if (!docFile || !docTitle) {
      toast({
        title: "Upload Failed",
        description: "Please provide a file and title",
        variant: "destructive"
      });
      return;
    }
    
    setUploadingDoc(true);
    
    try {
      // Determine the number of pages (in a real app, you would extract this from the PDF)
      const pages = docFile.type.includes('pdf') ? 10 : undefined; // Dummy value for demonstration
      
      // Upload the document
      const documentId = await documentCdnService.uploadDocument(docFile, {
        title: docTitle,
        description: docDescription,
        pages
      });
      
      if (documentId) {
        toast({
          title: "Upload Successful",
          description: `${docTitle} has been uploaded successfully`,
        });
        
        // Reset the form
        setDocFile(null);
        setDocTitle("");
        setDocDescription("");
        
        // Fetch the document to add it to the resources list
        fetchDocument(documentId);
      } else {
        toast({
          title: "Upload Failed",
          description: "Could not upload the document",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading",
        variant: "destructive"
      });
    } finally {
      setUploadingDoc(false);
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
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Additional Resources</h3>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a document to share with your team.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="Document title" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea 
                  id="description" 
                  value={docDescription}
                  onChange={(e) => setDocDescription(e.target.value)}
                  placeholder="Document description" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <Input 
                  id="file" 
                  type="file" 
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleDocumentUpload}
                disabled={uploadingDoc || !docFile || !docTitle}
              >
                {uploadingDoc ? "Uploading..." : "Upload Document"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-2">
        {resourceIds.map(renderDocumentItem)}
      </div>
    </div>
  );
};

export default ResourceSection;
