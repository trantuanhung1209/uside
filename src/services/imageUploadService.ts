import { supabase, STORAGE_BUCKET } from '../config/supabase';
import { supabaseAdmin } from '../config/supabaseAdmin';
import { auth } from '../config/firebase';

export interface UploadImageResult {
  url: string;
  path: string;
}

// Migrate old Supabase URLs to new ones
export const migrateSupabaseUrl = (url: string): string => {
  const oldProjectId = 'mxughxhmiocbmgxzukyo';
  const newProjectId = 'hfliuepqksujzfigdbil';
  
  if (url && url.includes(oldProjectId)) {
    return url.replace(
      `https://${oldProjectId}.supabase.co`,
      `https://${newProjectId}.supabase.co`
    );
  }
  
  return url;
};

export class ImageUploadService {
  /**
   * Upload image to Supabase Storage
   * @param file - File object from input
   * @param folder - Optional folder path (default: 'news')
   * @returns Promise with public URL and file path
   */
  static async uploadImage(file: File, folder: string = 'news'): Promise<UploadImageResult> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('File size must be less than 5MB');
      }

      // Check if user is authenticated with Firebase (optional - for audit logging)
      const currentUser = auth.currentUser;
      const userInfo = currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email
      } : null;
      
      // Log upload attempt for audit (optional)
      if (userInfo) {
        console.log(`Image upload by user: ${userInfo.email}`);
      } else {
        console.log('Image upload by anonymous user');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Use admin client to bypass RLS if available, otherwise use regular client
      const clientToUse = supabaseAdmin || supabase;

      // Upload file to Supabase Storage
      const { error } = await clientToUse.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL using regular client (always works for public URLs)
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      return {
        url: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  /**
   * Delete image from Supabase Storage
   * @param path - File path in storage
   */
  static async deleteImage(path: string): Promise<void> {
    try {
      // Use admin client to bypass RLS if available, otherwise use regular client
      const clientToUse = supabaseAdmin || supabase;
      
      const { error } = await clientToUse.storage
        .from(STORAGE_BUCKET)
        .remove([path]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  /**
   * Get optimized image URL with transformations
   * @param path - File path in storage
   * @param options - Transform options
   */
  static getOptimizedImageUrl(
    path: string, 
    options: {
      width?: number;
      height?: number;
      quality?: number;
    } = {}
  ): string {
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path, {
        transform: {
          width: options.width,
          height: options.height,
          quality: options.quality
        }
      });

    return data.publicUrl;
  }
}
