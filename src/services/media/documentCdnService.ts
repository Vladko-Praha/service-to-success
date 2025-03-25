
import { nanoid } from 'nanoid';

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
  private cdnBaseUrl = 'https://cdn.example.com'; // Would be replaced with your actual CDN URL
  private cdnRegions = ['us-east', 'us-west', 'eu-central', 'ap-southeast'];
  private apiBaseUrl = 'https://api.example.com'; // Would be replaced with your actual API endpoint
  
  /**
   * Get a document by its ID with a signed URL that expires
   */
  async getDocument(documentId: string, options: SignedDocumentOptions = {}): Promise<DocumentResource | null> {
    // This would be an API call to your backend service to get a signed URL
    console.log(`Fetching document with ID ${documentId} and generating signed URL`);
    
    // Default expiration to 1 hour if not specified
    const expiresIn = options.expiresIn || 3600;
    const expiresAt = Date.now() + (expiresIn * 1000);
    
    // Select the closest CDN region if specified, otherwise use geo-routing
    const region = options.region || this.getClosestRegion();
    
    // In a real implementation, this would call your backend to generate a signed URL
    // with proper JWT or other signing mechanism
    const signedToken = this.generateSignedToken(documentId, expiresAt, options.limitByIp, options.watermark);
    
    // Construct URLs with the signed token
    const baseResourceUrl = `${this.cdnBaseUrl}/${region}/documents/${documentId}`;
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
    // This would batch fetch multiple documents with signed URLs
    console.log(`Fetching documents with IDs: ${documentIds.join(', ')} and generating signed URLs`);
    
    const documents: DocumentResource[] = [];
    for (const id of documentIds) {
      const document = await this.getDocument(id, options);
      if (document) documents.push(document);
    }
    
    return documents;
  }
  
  /**
   * Track document view/download analytics
   */
  trackDocumentUsage(documentId: string, action: 'view' | 'download', userId?: string): void {
    // This would send analytics data to your backend
    console.log(`Tracking ${action} for document ${documentId} by user ${userId || 'anonymous'}`);
  }
  
  /**
   * Get the closest CDN region based on user's location
   */
  private getClosestRegion(): string {
    // In a real implementation, this would use geolocation or IP-based detection
    // to determine the closest region
    
    // For now, just return a default region
    return this.cdnRegions[0]; // us-east
  }
  
  /**
   * Generate a signed token for secure URL access
   */
  private generateSignedToken(
    resourceId: string, 
    expiresAt: number, 
    ipAddress?: string,
    watermark?: { text: string; opacity?: number }
  ): string {
    // In a real implementation, this would use a JWT or HMAC to sign
    // the resource ID, expiration, and optional restrictions
    
    // This is a simplified mock implementation
    const payload = {
      resource: resourceId,
      exp: expiresAt,
      ip: ipAddress,
      watermark,
      nonce: nanoid(8)
    };
    
    // In a real app, you would sign this with your secret key
    // return jwt.sign(payload, process.env.CDN_SECRET_KEY);
    
    // Mock token
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }
}

// Export a singleton instance
export const documentCdnService = new DocumentCdnService();
