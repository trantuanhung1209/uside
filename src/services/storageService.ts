import { storage } from '../config/firebase';
import { 
  ref, 
  uploadBytes, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject, 
  listAll 
} from 'firebase/storage';
import type { UploadTaskSnapshot } from 'firebase/storage';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number;
}

class StorageService {
  // Upload a file to Firebase Storage
  async uploadFile(
    file: File, 
    path: string, 
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      
      if (onProgress) {
        // Upload with progress tracking
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot: UploadTaskSnapshot) => {
              const progress = {
                bytesTransferred: snapshot.bytesTransferred,
                totalBytes: snapshot.totalBytes,
                progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              };
              onProgress(progress);
            },
            (error) => {
              console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      } else {
        // Simple upload without progress
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Get download URL for a file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }

  // List all files in a directory
  async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      
      const downloadURLs = await Promise.all(
        result.items.map(itemRef => getDownloadURL(itemRef))
      );
      
      return downloadURLs;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(
    files: File[], 
    basePath: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<string[]> {
    try {
      const uploadPromises = files.map((file, index) => {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${basePath}/${fileName}`;
        
        return this.uploadFile(
          file, 
          filePath, 
          onProgress ? (progress) => onProgress(index, progress) : undefined
        );
      });
      
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
