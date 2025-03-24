
import { nanoid } from 'nanoid';

// Document types
export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'template' | 'worksheet' | 'checklist' | 'guide';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  category: string;
  version: number;
}

// Mock document database
let documents: Document[] = [];

// Initialize with some sample documents
const initializeDocuments = () => {
  const sampleDocuments: Document[] = [
    {
      id: nanoid(),
      title: 'Business Plan Template',
      content: '<h1>Business Plan Template</h1><p>Use this template to create your business plan...</p>',
      type: 'template',
      tags: ['business-plan', 'template', 'startup'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'System',
      category: 'business-establishment',
      version: 1
    },
    {
      id: nanoid(),
      title: 'Market Research Guide',
      content: '<h1>Market Research Guide</h1><p>Follow these steps to conduct effective market research...</p>',
      type: 'guide',
      tags: ['research', 'market', 'analysis'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'System',
      category: 'market-research',
      version: 1
    }
  ];
  
  // Only initialize if not already done
  if (documents.length === 0) {
    documents = sampleDocuments;
  }
};

// Initialize on import
initializeDocuments();

// Get all documents
export const getAllDocuments = (): Document[] => {
  return [...documents];
};

// Get documents by category
export const getDocumentsByCategory = (category: string): Document[] => {
  return documents.filter(doc => doc.category === category);
};

// Get documents by type
export const getDocumentsByType = (type: string): Document[] => {
  return documents.filter(doc => doc.type === type);
};

// Get document by ID
export const getDocumentById = (id: string): Document | undefined => {
  return documents.find(doc => doc.id === id);
};

// Search documents by query
export const searchDocuments = (query: string): Document[] => {
  const lowerQuery = query.toLowerCase();
  return documents.filter(
    doc => 
      doc.title.toLowerCase().includes(lowerQuery) || 
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Create a new document
export const createDocument = (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Document => {
  const newDocument: Document = {
    ...document,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1
  };
  
  documents.push(newDocument);
  return newDocument;
};

// Update an existing document
export const updateDocument = (id: string, updates: Partial<Omit<Document, 'id' | 'createdAt' | 'version'>>): Document | null => {
  const index = documents.findIndex(doc => doc.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedDocument = {
    ...documents[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    version: documents[index].version + 1
  };
  
  documents[index] = updatedDocument;
  return updatedDocument;
};

// Delete a document
export const deleteDocument = (id: string): boolean => {
  const initialLength = documents.length;
  documents = documents.filter(doc => doc.id !== id);
  return documents.length < initialLength;
};

// Export a document to HTML
export const exportDocumentToHTML = (id: string): string | null => {
  const document = getDocumentById(id);
  
  if (!document) {
    return null;
  }
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.title}</title>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    h2 { color: #444; margin-top: 30px; }
    p { margin-bottom: 20px; }
    .meta { color: #777; font-size: 0.9em; margin-bottom: 30px; }
    .content { margin-top: 30px; }
  </style>
</head>
<body>
  <h1>${document.title}</h1>
  <div class="meta">
    <p>Type: ${document.type} | Category: ${document.category} | Version: ${document.version}</p>
    <p>Created: ${new Date(document.createdAt).toLocaleDateString()} | Last Updated: ${new Date(document.updatedAt).toLocaleDateString()}</p>
    <p>Tags: ${document.tags.join(', ')}</p>
  </div>
  <div class="content">
    ${document.content}
  </div>
</body>
</html>`;
};
