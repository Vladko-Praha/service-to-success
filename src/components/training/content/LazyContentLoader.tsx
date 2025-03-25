
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { DocumentResource } from '@/services/media/documentCdnService';
import { VideoResource } from '@/services/media/videoService';

interface LazyContentLoaderProps {
  resourceId: string;
  resourceType: 'video' | 'document';
  fetchResource: () => Promise<VideoResource | DocumentResource | null>;
  renderContent: (resource: VideoResource | DocumentResource) => React.ReactNode;
  placeholder?: React.ReactNode;
}

const LazyContentLoader: React.FC<LazyContentLoaderProps> = ({
  resourceId,
  resourceType,
  fetchResource,
  renderContent,
  placeholder
}) => {
  const [resource, setResource] = useState<VideoResource | DocumentResource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Intersection Observer to detect when the component comes into view
  const { ref, inView } = useInView({
    triggerOnce: true,  // Only trigger once
    threshold: 0.1,     // Load when at least 10% is visible
    rootMargin: '100px' // Start loading when within 100px of viewport
  });
  
  useEffect(() => {
    let isMounted = true;
    
    const loadResource = async () => {
      if (!inView || loading || resource) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const resourceData = await fetchResource();
        
        if (isMounted) {
          setResource(resourceData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load resource');
          setLoading(false);
          console.error('Error loading resource:', err);
        }
      }
    };
    
    loadResource();
    
    return () => {
      isMounted = false;
    };
  }, [inView, resourceId, loading, resource, fetchResource]);
  
  // Default placeholder if none is provided
  const defaultPlaceholder = (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
  
  return (
    <div ref={ref} className="w-full">
      {loading && (placeholder || defaultPlaceholder)}
      {error && <div className="text-red-500 p-4 border border-red-200 rounded-md">{error}</div>}
      {resource && renderContent(resource)}
    </div>
  );
};

export default LazyContentLoader;
