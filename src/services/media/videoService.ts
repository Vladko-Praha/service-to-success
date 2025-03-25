
import { nanoid } from 'nanoid';

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnailUrl: string;
  streamUrl: string;
  downloadUrl?: string;
  transcriptUrl?: string;
  hlsUrl?: string; // HLS streaming URL
  quality: VideoQuality[];
  expiresAt?: number; // Timestamp when URL expires
  nextInSequence?: string; // ID of the next video in sequence for prefetching
}

export type VideoQuality = '360p' | '480p' | '720p' | '1080p' | 'auto';

export interface PlaybackOptions {
  autoplay?: boolean;
  startTime?: number; // in seconds
  quality?: VideoQuality;
  prefetchNext?: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  playbackRate: number;
  quality: VideoQuality;
  isBuffering: boolean;
  chunkStatus?: {
    loaded: number;
    total: number;
  };
}

export interface SignedUrlOptions {
  expiresIn?: number; // seconds until expiration, default 3600 (1 hour)
  limitByIp?: string; // restrict to specific IP
  region?: string; // preferred CDN region
}

class VideoService {
  private cdnBaseUrl = 'https://cdn.example.com'; // Would be replaced with your actual CDN URL
  private cdnRegions = ['us-east', 'us-west', 'eu-central', 'ap-southeast'];
  private apiBaseUrl = 'https://api.example.com'; // Would be replaced with your actual API endpoint
  private prefetchQueue: string[] = [];
  
  /**
   * Get a video by its ID with a signed URL that expires
   */
  async getVideo(videoId: string, options: SignedUrlOptions = {}): Promise<VideoResource | null> {
    // This would be an API call to your backend service to get a signed URL
    console.log(`Fetching video with ID ${videoId} and generating signed URL`);
    
    // Default expiration to 1 hour if not specified
    const expiresIn = options.expiresIn || 3600;
    const expiresAt = Date.now() + (expiresIn * 1000);
    
    // Select the closest CDN region if specified, otherwise use geo-routing
    const region = options.region || this.getClosestRegion();
    
    // In a real implementation, this would call your backend to generate a signed URL
    // with proper JWT or other signing mechanism
    const signedToken = this.generateSignedToken(videoId, expiresAt, options.limitByIp);
    
    // Construct URLs with the signed token
    const baseResourceUrl = `${this.cdnBaseUrl}/${region}/videos/${videoId}`;
    const signedUrlParam = `?token=${signedToken}&expires=${expiresAt}`;
    
    // Mock response with signed URLs
    return {
      id: videoId,
      title: "Business Structure Selection Guide",
      description: "Learn how to choose the right legal structure for your business",
      duration: 1245, // 20:45
      thumbnailUrl: `${baseResourceUrl}/thumbnail.jpg${signedUrlParam}`,
      streamUrl: `${baseResourceUrl}/stream.mp4${signedUrlParam}`,
      hlsUrl: `${baseResourceUrl}/manifest.m3u8${signedUrlParam}`,
      downloadUrl: `${baseResourceUrl}/download.mp4${signedUrlParam}`,
      transcriptUrl: `${baseResourceUrl}/transcript.txt${signedUrlParam}`,
      quality: ['360p', '480p', '720p', '1080p'],
      expiresAt: expiresAt,
      nextInSequence: "video-102" // ID of the next logical video for prefetching
    };
  }
  
  /**
   * Get multiple videos by IDs with signed URLs
   */
  async getVideos(videoIds: string[], options: SignedUrlOptions = {}): Promise<VideoResource[]> {
    // This would batch fetch multiple videos with signed URLs
    console.log(`Fetching videos with IDs: ${videoIds.join(', ')} and generating signed URLs`);
    
    const videos: VideoResource[] = [];
    for (const id of videoIds) {
      const video = await this.getVideo(id, options);
      if (video) videos.push(video);
    }
    
    return videos;
  }
  
  /**
   * Track video playback analytics
   */
  trackPlayback(videoId: string, state: Partial<PlaybackState>, userId?: string): void {
    // This would send analytics data to your backend
    console.log(`Tracking playback for video ${videoId}`, state);
    
    // Check if we should prefetch the next video
    if (state.currentTime && state.duration) {
      const percentComplete = (state.currentTime / state.duration) * 100;
      
      // When user reaches 80% of the video, prefetch the next one if available
      if (percentComplete >= 80) {
        this.prefetchNextVideo(videoId);
      }
    }
  }
  
  /**
   * Prefetch the next video in sequence to improve user experience
   */
  private async prefetchNextVideo(currentVideoId: string): Promise<void> {
    try {
      // Get the current video to find the next one in sequence
      const currentVideo = await this.getVideo(currentVideoId);
      
      if (currentVideo?.nextInSequence && !this.prefetchQueue.includes(currentVideo.nextInSequence)) {
        console.log(`Prefetching next video in sequence: ${currentVideo.nextInSequence}`);
        
        // Add to prefetch queue to avoid duplicate prefetching
        this.prefetchQueue.push(currentVideo.nextInSequence);
        
        // In a real implementation, you would:
        // 1. Use fetch() with a Range header to get just the first few segments
        // 2. For HLS, fetch the manifest and first few segments
        
        // Mock implementation
        const prefetchOptions: SignedUrlOptions = {
          expiresIn: 7200, // Longer expiration for prefetched content
        };
        
        // Actually fetch the video metadata (in background)
        this.getVideo(currentVideo.nextInSequence, prefetchOptions)
          .then(nextVideo => {
            if (nextVideo?.hlsUrl) {
              // In a real app, fetch the HLS manifest and first segment
              console.log(`Pre-loaded manifest for: ${nextVideo.title}`);
            }
          });
      }
    } catch (error) {
      console.error("Error prefetching next video:", error);
    }
  }
  
  /**
   * Get playback options for a video player, configured for HLS
   */
  getPlayerConfig(videoId: string, options: PlaybackOptions = {}): Record<string, any> {
    // Return configuration for your video player of choice
    return {
      videoId,
      autoplay: options.autoplay ?? false,
      startTime: options.startTime ?? 0,
      quality: options.quality ?? 'auto',
      controls: true,
      responsive: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      hlsConfig: {
        enableWorker: true,
        lowLatencyMode: false,
        progressive: true,
        // These settings help with faster seeking and better adaptive streaming
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        backBufferLength: 30
      },
      loadingSpinner: true,
      preload: 'auto',
      techOrder: ['html5'],
    };
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
  private generateSignedToken(resourceId: string, expiresAt: number, ipAddress?: string): string {
    // In a real implementation, this would use a JWT or HMAC to sign
    // the resource ID, expiration, and optional IP restriction
    
    // This is a simplified mock implementation
    const payload = {
      resource: resourceId,
      exp: expiresAt,
      ip: ipAddress,
      nonce: nanoid(8)
    };
    
    // In a real app, you would sign this with your secret key
    // return jwt.sign(payload, process.env.CDN_SECRET_KEY);
    
    // Mock token
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }
}

// Export a singleton instance
export const videoService = new VideoService();
