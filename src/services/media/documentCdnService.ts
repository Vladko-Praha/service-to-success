
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';

// Import the Supabase client from the AdminDashboard
import { supabase } from '@/pages/AdminDashboard';

export interface DocumentResource {
  id: string;
  title: string;
  description?: string;
  fileSize: number; // in bytes
  thumbnailUrl?: string;
  downloadUrl: string;
  viewUrl: string;
  mimeType: string;
  expiresAt?: number; // Timestamp when URL expires
  pages?: number; // For PDF documents
}

export interface SignedDocumentOptions {
  expiresIn?: number; // seconds until expiration, default 3600 (1 hour)
  limitByIp?: string; // restrict to specific IP
  region?: string; // preferred CDN region
  watermark?: {
    text: string;
    opacity?: number;
  };
}

class DocumentCdnService {
  private cdnRegions = ['us-east', 'us-west', 'eu-central', 'ap-southeast'];
  private storageBucket = 'documents';
  
  /**
   * Get a document by its ID with a signed URL that expires
   */
  async getDocument(documentId: string, options: SignedDocumentOptions = {}): Promise<DocumentResource | null> {
    try {
      console.log(`Fetching document with ID ${documentId} and generating signed URL`);
      
      // Default expiration to 1 hour if not specified
      const expiresIn = options.expiresIn || 3600;
      
      // First get document metadata from the database
      const { data: docMetadata, error: metadataError } = await supabase
        .from('document_metadata')
        .select('*')
        .eq('id', documentId)
        .single();
      
      if (metadataError) {
        console.error('Error fetching document metadata:', metadataError);
        return this.getFallbackDocument(documentId, expiresIn); // Return fallback if database fetch fails
      }
      
      // Generate signed URLs for document assets
      const { data: downloadData } = await supabase
        .storage
        .from(this.storageBucket)
        .createSignedUrl(`${documentId}/download.pdf`, expiresIn);
        
      const { data: viewData } = await supabase
        .storage
        .from(this.storageBucket)
        .createSignedUrl(`${documentId}/view.pdf`, expiresIn);
      
      const { data: thumbnailData } = await supabase
        .storage
        .from(this.storageBucket)
        .createSignedUrl(`${documentId}/thumbnail.jpg`, expiresIn);
      
      // If we couldn't get the download URL, return fallback
      if (!downloadData?.signedUrl) {
        return this.getFallbackDocument(documentId, expiresIn);
      }
      
      // Create the document resource with real signed URLs
      return {
        id: documentId,
        title: docMetadata?.title || "Document Resource",
        description: docMetadata?.description,
        fileSize: docMetadata?.file_size || 0,
        thumbnailUrl: thumbnailData?.signedUrl,
        downloadUrl: downloadData.signedUrl,
        viewUrl: viewData?.signedUrl || downloadData.signedUrl,
        mimeType: docMetadata?.mime_type || "application/pdf",
        expiresAt: Date.now() + (expiresIn * 1000),
        pages: docMetadata?.pages
      };
    } catch (error) {
      console.error('Error getting document:', error);
      return this.getFallbackDocument(documentId, options.expiresIn || 3600);
    }
  }
  
  /**
   * Fallback method to provide mock data when Supabase is unavailable
   */
  private getFallbackDocument(documentId: string, expiresIn: number): DocumentResource {
    console.log('Using fallback document data');
    const expiresAt = Date.now() + (expiresIn * 1000);
    const region = this.getClosestRegion();
    const signedToken = this.generateSignedToken(documentId, expiresAt);
    
    // Construct a mock URL structure
    const baseResourceUrl = `https://cdn.example.com/${region}/documents/${documentId}`;
    const signedUrlParam = `?token=${signedToken}&expires=${expiresAt}`;
    
    // Mock response with signed URLs for a PDF
    return {
      id: documentId,
      title: "Business Structure Comparison Chart",
      description: "A detailed comparison of different business legal structures",
      fileSize: 2576928, // ~2.5MB
      thumbnailUrl: `${baseResourceUrl}/thumbnail.jpg${signedUrlParam}`,
      downloadUrl: `${baseResourceUrl}/download.pdf${signedUrlParam}`,
      viewUrl: `${baseResourceUrl}/view.pdf${signedUrlParam}`,
      mimeType: "application/pdf",
      expiresAt: expiresAt,
      pages: 12
    };
  }
  
  /**
   * Get multiple documents by IDs with signed URLs
   */
  async getDocuments(documentIds: string[], options: SignedDocumentOptions = {}): Promise<DocumentResource[]> {
    console.log(`Fetching documents with IDs: ${documentIds.join(', ')} and generating signed URLs`);
    
    const documents: DocumentResource[] = [];
    for (const id of documentIds) {
      const document = await this.getDocument(id, options);
      if (document) documents.push(document);
    }
    
    return documents;
  }
  
  /**
   * Upload a new document to storage
   */
  async uploadDocument(file: File, metadata: { 
    title: string; 
    description?: string;
    pages?: number;
  }): Promise<string | null> {
    try {
      // Generate a unique ID for the document
      const documentId = `doc-${nanoid(8)}`;
      
      // Upload the document file
      const { error: uploadError } = await supabase
        .storage
        .from(this.storageBucket)
        .upload(`${documentId}/download.pdf`, file);
        
      if (uploadError) {
        console.error('Error uploading document:', uploadError);
        return null;
      }
      
      // Save metadata to the database
      const { error: metadataError } = await supabase
        .from('document_metadata')
        .insert({
          id: documentId,
          title: metadata.title,
          description: metadata.description,
          file_size: file.size,
          mime_type: file.type,
          pages: metadata.pages,
          created_at: new Date()
        });
        
      if (metadataError) {
        console.error('Error saving document metadata:', metadataError);
        // Still return the ID since the file was uploaded
      }
      
      return documentId;
    } catch (error) {
      console.error('Error in uploadDocument:', error);
      return null;
    }
  }
  
  /**
   * Track document usage analytics
   */
  async trackDocumentUsage(documentId: string, action: 'view' | 'download', userId?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('document_analytics')
        .insert({
          document_id: documentId,
          user_id: userId || 'anonymous',
          action: action,
          timestamp: new Date()
        });
        
      if (error) {
        console.error('Error tracking document analytics:', error);
      }
    } catch (error) {
      console.error('Error in trackDocumentUsage:', error);
    }
  }
  
  private getClosestRegion(): string {
    // In a real implementation, this would use geolocation or IP-based detection
    // to determine the closest region
    return this.cdnRegions[0]; // us-east
  }
  
  private generateSignedToken(resourceId: string, expiresAt: number): string {
    // This is only used for fallback mock data
    const payload = {
      resource: resourceId,
      exp: expiresAt,
      nonce: nanoid(8)
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }
}

// Export a singleton instance
export const documentCdnService = new DocumentCdnService();
