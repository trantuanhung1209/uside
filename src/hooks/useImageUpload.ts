import { useState } from 'react';
import { ImageUploadService, type UploadImageResult } from '../services/imageUploadService';

interface UseImageUploadResult {
  uploadImage: (file: File, folder?: string) => Promise<UploadImageResult>;
  deleteImage: (path: string) => Promise<void>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useImageUpload = (): UseImageUploadResult => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, folder?: string): Promise<UploadImageResult> => {
    setIsUploading(true);
    setError(null);
    
    try {
      const result = await ImageUploadService.uploadImage(file, folder);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (path: string): Promise<void> => {
    setError(null);
    
    try {
      await ImageUploadService.deleteImage(path);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMessage);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return {
    uploadImage,
    deleteImage,
    isUploading,
    error,
    clearError
  };
};
