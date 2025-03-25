
import { supabase } from '@/pages/AdminDashboard';

/**
 * Set up the necessary tables and storage buckets for the media services
 * Run this function once to initialize the Supabase database
 */
export const setupMediaTables = async (): Promise<{success: boolean, error?: any}> => {
  try {
    console.log('Setting up media tables in Supabase...');
    
    // Create video_metadata table
    const { error: videoMetadataError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'video_metadata',
      table_definition: `
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        duration INTEGER DEFAULT 0,
        quality TEXT[] DEFAULT '{"480p"}',
        next_in_sequence TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (videoMetadataError) {
      console.error('Error creating video_metadata table:', videoMetadataError);
      
      // Try SQL approach if RPC fails
      const { error: sqlError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS video_metadata (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          duration INTEGER DEFAULT 0,
          quality TEXT[] DEFAULT '{"480p"}',
          next_in_sequence TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      if (sqlError) {
        console.error('Error creating video_metadata table with SQL:', sqlError);
        throw sqlError;
      }
    }
    
    // Create video_analytics table
    const { error: videoAnalyticsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'video_analytics',
      table_definition: `
        id SERIAL PRIMARY KEY,
        video_id TEXT NOT NULL REFERENCES video_metadata(id),
        user_id TEXT NOT NULL,
        current_time REAL,
        duration REAL,
        is_playing BOOLEAN,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (videoAnalyticsError) {
      console.error('Error creating video_analytics table:', videoAnalyticsError);
      
      // Try SQL approach if RPC fails
      const { error: sqlError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS video_analytics (
          id SERIAL PRIMARY KEY,
          video_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          current_time REAL,
          duration REAL,
          is_playing BOOLEAN,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          FOREIGN KEY (video_id) REFERENCES video_metadata(id)
        );
      `);
      
      if (sqlError) {
        console.error('Error creating video_analytics table with SQL:', sqlError);
        throw sqlError;
      }
    }
    
    // Create document_metadata table
    const { error: documentMetadataError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'document_metadata',
      table_definition: `
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        file_size INTEGER DEFAULT 0,
        mime_type TEXT DEFAULT 'application/pdf',
        pages INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (documentMetadataError) {
      console.error('Error creating document_metadata table:', documentMetadataError);
      
      // Try SQL approach if RPC fails
      const { error: sqlError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS document_metadata (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          file_size INTEGER DEFAULT 0,
          mime_type TEXT DEFAULT 'application/pdf',
          pages INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
      
      if (sqlError) {
        console.error('Error creating document_metadata table with SQL:', sqlError);
        throw sqlError;
      }
    }
    
    // Create document_analytics table
    const { error: documentAnalyticsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'document_analytics',
      table_definition: `
        id SERIAL PRIMARY KEY,
        document_id TEXT NOT NULL REFERENCES document_metadata(id),
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      `
    });
    
    if (documentAnalyticsError) {
      console.error('Error creating document_analytics table:', documentAnalyticsError);
      
      // Try SQL approach if RPC fails
      const { error: sqlError } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS document_analytics (
          id SERIAL PRIMARY KEY,
          document_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          action TEXT NOT NULL,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          FOREIGN KEY (document_id) REFERENCES document_metadata(id)
        );
      `);
      
      if (sqlError) {
        console.error('Error creating document_analytics table with SQL:', sqlError);
        throw sqlError;
      }
    }
    
    // Create storage buckets
    const videoBucket = await createBucketIfNotExists('videos', false);
    const documentBucket = await createBucketIfNotExists('documents', false);
    
    if (!videoBucket.success || !documentBucket.success) {
      return { 
        success: false, 
        error: videoBucket.error || documentBucket.error 
      };
    }
    
    console.log('Media tables setup completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error setting up media tables:', error);
    return { success: false, error };
  }
};

/**
 * Create a storage bucket if it doesn't exist
 */
async function createBucketIfNotExists(name: string, isPublic: boolean = false): Promise<{success: boolean, error?: any}> {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === name);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(name, {
        public: isPublic
      });
      
      if (error) {
        console.error(`Error creating ${name} bucket:`, error);
        return { success: false, error };
      }
      
      console.log(`Created ${name} bucket`);
    } else {
      console.log(`${name} bucket already exists`);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error creating ${name} bucket:`, error);
    return { success: false, error };
  }
}

// Export a function to insert sample data
export const insertSampleMediaData = async (): Promise<{success: boolean, error?: any}> => {
  try {
    console.log('Inserting sample media data...');
    
    // Insert sample video metadata
    const { error: videoError } = await supabase
      .from('video_metadata')
      .upsert([
        {
          id: 'video-101',
          title: 'Business Structure Selection Guide',
          description: 'Learn how to choose the right legal structure for your business',
          duration: 1245, // 20:45
          quality: ['480p', '720p', '1080p'],
          next_in_sequence: 'video-102'
        },
        {
          id: 'video-102',
          title: 'Business Plan Development Workshop',
          description: 'Step-by-step guide to creating a comprehensive business plan',
          duration: 1850, // 30:50
          quality: ['480p', '720p'],
          next_in_sequence: 'video-103'
        }
      ], { onConflict: 'id' });
    
    if (videoError) {
      console.error('Error inserting sample video metadata:', videoError);
    }
    
    // Insert sample document metadata
    const { error: docError } = await supabase
      .from('document_metadata')
      .upsert([
        {
          id: 'doc-business-structure-comparison',
          title: 'Business Structure Comparison Chart',
          description: 'A detailed comparison of different business legal structures',
          file_size: 2576928, // ~2.5MB
          mime_type: 'application/pdf',
          pages: 12
        },
        {
          id: 'doc-registration-checklist',
          title: 'Business Registration Checklist',
          description: 'Complete checklist for registering your business in all 50 states',
          file_size: 1048576, // ~1MB
          mime_type: 'application/pdf',
          pages: 8
        }
      ], { onConflict: 'id' });
    
    if (docError) {
      console.error('Error inserting sample document metadata:', docError);
    }
    
    console.log('Sample media data inserted successfully');
    return { success: true };
  } catch (error) {
    console.error('Error inserting sample media data:', error);
    return { success: false, error };
  }
};
