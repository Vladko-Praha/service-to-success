
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Document, 
  getAllDocuments, 
  getDocumentById, 
  getDocumentsByCategory,
  getDocumentsByType,
  searchDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  exportDocumentToHTML
} from '@/services/documents/documentService';

type DocumentFilters = {
  category?: string;
  type?: string;
  searchQuery?: string;
  sortBy?: 'title' | 'createdAt' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
};

export const useDocuments = (initialFilters?: DocumentFilters) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DocumentFilters>(initialFilters || {});
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Fetch documents when filters change
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        let results: Document[] = [];
        
        // Apply filters
        if (filters.searchQuery) {
          results = searchDocuments(filters.searchQuery);
        } else if (filters.category) {
          results = getDocumentsByCategory(filters.category);
        } else if (filters.type) {
          results = getDocumentsByType(filters.type);
        } else {
          results = getAllDocuments();
        }
        
        // Apply sorting
        if (filters.sortBy) {
          results = [...results].sort((a, b) => {
            const aValue = a[filters.sortBy as keyof Document];
            const bValue = b[filters.sortBy as keyof Document];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return filters.sortDirection === 'desc'
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
            }
            
            return 0;
          });
        }
        
        setDocuments(results);
      } catch (error) {
        console.error('Error fetching documents:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch documents. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocuments();
  }, [filters, toast]);

  // Get a single document by ID
  const getDocument = (id: string): Document | undefined => {
    return getDocumentById(id);
  };

  // Select a document to view/edit
  const selectDocument = (id: string) => {
    const doc = getDocumentById(id);
    if (doc) {
      setSelectedDocument(doc);
    } else {
      toast({
        title: 'Document Not Found',
        description: 'The requested document could not be found.',
        variant: 'destructive',
      });
    }
  };

  // Create a new document
  const addDocument = (
    document: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'version'>
  ) => {
    try {
      const newDoc = createDocument(document);
      setDocuments(prev => [...prev, newDoc]);
      toast({
        title: 'Document Created',
        description: 'Your document has been created successfully.',
      });
      return newDoc;
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: 'Error',
        description: 'Failed to create document. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Update an existing document
  const editDocument = (
    id: string,
    updates: Partial<Omit<Document, 'id' | 'createdAt' | 'version'>>
  ) => {
    try {
      const updatedDoc = updateDocument(id, updates);
      if (updatedDoc) {
        setDocuments(prev => 
          prev.map(doc => doc.id === id ? updatedDoc : doc)
        );
        if (selectedDocument?.id === id) {
          setSelectedDocument(updatedDoc);
        }
        toast({
          title: 'Document Updated',
          description: 'Your document has been updated successfully.',
        });
        return updatedDoc;
      }
      return null;
    } catch (error) {
      console.error('Error updating document:', error);
      toast({
        title: 'Error',
        description: 'Failed to update document. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Remove a document
  const removeDocument = (id: string) => {
    try {
      const success = deleteDocument(id);
      if (success) {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        if (selectedDocument?.id === id) {
          setSelectedDocument(null);
        }
        toast({
          title: 'Document Deleted',
          description: 'The document has been deleted successfully.',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete document. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Export document to HTML
  const exportToHTML = (id: string) => {
    try {
      const htmlContent = exportDocumentToHTML(id);
      if (htmlContent) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const doc = getDocumentById(id);
        
        a.href = url;
        a.download = `${doc?.title || 'document'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: 'Document Exported',
          description: 'Document has been exported as HTML.',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error exporting document:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export document. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<DocumentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
  };

  return {
    documents,
    loading,
    filters,
    selectedDocument,
    getDocument,
    selectDocument,
    addDocument,
    editDocument,
    removeDocument,
    exportToHTML,
    updateFilters,
    resetFilters
  };
};
