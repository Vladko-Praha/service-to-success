
import { useState, useCallback } from 'react';
import { videoService, VideoResource, SignedUrlOptions } from '@/services/media/videoService';
import { documentCdnService, DocumentResource, SignedDocumentOptions } from '@/services/media/documentCdnService';

interface UseContentDeliveryOptions {
  defaultVideoOptions?: SignedUrlOptions;
  defaultDocumentOptions?: SignedDocumentOptions;
  prefetchThreshold?: number; // Percentage of video complete before prefetching next (0-100)
}

export function useContentDelivery(options: UseContentDeliveryOptions = {}) {
  const [videoResources, setVideoResources] = useState<Record<string, VideoResource>>({});
  const [documentResources, setDocumentResources] = useState<Record<string, DocumentResource>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Default options
  const defaultVideoOptions = options.defaultVideoOptions || { expiresIn: 3600 };
  const defaultDocumentOptions = options.defaultDocumentOptions || { expiresIn: 3600 };
  const prefetchThreshold = options.prefetchThreshold || 80; // Default 80%
  
  // Function to fetch a video with signed URL
  const fetchVideo = useCallback(async (videoId: string, customOptions?: SignedUrlOptions) => {
    try {
      setLoading(prev => ({ ...prev, [videoId]: true }));
      setErrors(prev => ({ ...prev, [videoId]: '' }));
      
      const combinedOptions = { ...defaultVideoOptions, ...customOptions };
      const video = await videoService.getVideo(videoId, combinedOptions);
      
      if (video) {
        setVideoResources(prev => ({ ...prev, [videoId]: video }));
      }
      
      setLoading(prev => ({ ...prev, [videoId]: false }));
      return video;
    } catch (error) {
      setErrors(prev => ({ ...prev, [videoId]: 'Failed to load video' }));
      setLoading(prev => ({ ...prev, [videoId]: false }));
      console.error('Error fetching video:', error);
      return null;
    }
  }, [defaultVideoOptions]);
  
  // Function to fetch a document with signed URL
  const fetchDocument = useCallback(async (documentId: string, customOptions?: SignedDocumentOptions) => {
    try {
      setLoading(prev => ({ ...prev, [documentId]: true }));
      setErrors(prev => ({ ...prev, [documentId]: '' }));
      
      const combinedOptions = { ...defaultDocumentOptions, ...customOptions };
      const document = await documentCdnService.getDocument(documentId, combinedOptions);
      
      if (document) {
        setDocumentResources(prev => ({ ...prev, [documentId]: document }));
      }
      
      setLoading(prev => ({ ...prev, [documentId]: false }));
      return document;
    } catch (error) {
      setErrors(prev => ({ ...prev, [documentId]: 'Failed to load document' }));
      setLoading(prev => ({ ...prev, [documentId]: false }));
      console.error('Error fetching document:', error);
      return null;
    }
  }, [defaultDocumentOptions]);
  
  // Function to track video playback and handle prefetching
  const trackVideoProgress = useCallback((videoId: string, currentTime: number, duration: number) => {
    if (!videoResources[videoId]) return;
    
    const percentComplete = (currentTime / duration) * 100;
    
    // Track the playback for analytics
    videoService.trackPlayback(videoId, { 
      currentTime, 
      duration,
      isPlaying: true 
    });
    
    // Check if we should prefetch the next video
    if (percentComplete >= prefetchThreshold) {
      const nextVideoId = videoResources[videoId].nextInSequence;
      if (nextVideoId && !videoResources[nextVideoId] && !loading[nextVideoId]) {
        console.log(`Prefetching next video ${nextVideoId} based on watch progress`);
        fetchVideo(nextVideoId, { expiresIn: 7200 }); // Longer expiry for prefetched content
      }
    }
  }, [videoResources, loading, prefetchThreshold, fetchVideo]);
  
  // Function to refresh an expiring resource URL
  const refreshResourceUrl = useCallback(async (resourceId: string, resourceType: 'video' | 'document') => {
    if (resourceType === 'video') {
      return fetchVideo(resourceId, defaultVideoOptions);
    } else {
      return fetchDocument(resourceId, defaultDocumentOptions);
    }
  }, [fetchVideo, fetchDocument, defaultVideoOptions, defaultDocumentOptions]);
  
  // Function to check if a resource URL is expiring soon (within 5 minutes)
  const isResourceExpiring = useCallback((resourceId: string, resourceType: 'video' | 'document'): boolean => {
    const resource = resourceType === 'video' 
      ? videoResources[resourceId] 
      : documentResources[resourceId];
      
    if (!resource || !resource.expiresAt) return false;
    
    // Check if URL expires within 5 minutes
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
    return resource.expiresAt < fiveMinutesFromNow;
  }, [videoResources, documentResources]);
  
  return {
    videoResources,
    documentResources,
    loading,
    errors,
    fetchVideo,
    fetchDocument,
    trackVideoProgress,
    refreshResourceUrl,
    isResourceExpiring
  };
}
