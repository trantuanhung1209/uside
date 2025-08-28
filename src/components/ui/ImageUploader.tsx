import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { ImageUploadService } from '../../services/imageUploadService';
import { useAccentColor } from '../../hooks/useAccentColor';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onError,
  className = '',
  disabled = false
}) => {
  const { currentAccentColor } = useAccentColor();
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleError = (error: string) => {
    if (onError) {
      onError(error);
    } else {
      console.error(error);
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await ImageUploadService.uploadImage(file);
      onChange(result.url);
    } catch (error) {
      handleError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    uploadImage(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled || isUploading) return;
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange('');
  };

  const containerStyles = {
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(8px)",
    border: `2px dashed ${dragActive ? currentAccentColor : 'rgba(51, 65, 85, 0.5)'}`,
    borderRadius: "12px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
  };

  const uploadButtonStyles = {
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(51, 65, 85, 0.5)",
    color: "#f1f5f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease"
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload Area */}
      {!value && (
        <div
          className={`relative p-6 text-center cursor-pointer transition-all duration-300 ${
            dragActive ? 'scale-105' : ''
          }`}
          style={containerStyles}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled || isUploading}
          />
          
          <div className="flex flex-col items-center gap-4">
            {isUploading ? (
              <Loader2 
                className="w-12 h-12 animate-spin" 
                style={{ color: currentAccentColor }}
              />
            ) : (
              <div 
                className="p-4 rounded-full"
                style={{
                  background: currentAccentColor,
                  color: "#FFFFFF"
                }}
              >
                <Upload className="w-8 h-8" />
              </div>
            )}
            
            <div>
              <p 
                className="text-lg font-semibold mb-1"
                style={{ color: "#f1f5f9" }}
              >
                {isUploading ? 'Đang tải lên...' : 'Chọn hoặc kéo thả ảnh'}
              </p>
              <p 
                className="text-sm"
                style={{ color: "#94a3b8" }}
              >
                Hỗ trợ JPG, PNG, GIF (tối đa 5MB)
              </p>
            </div>
            
            {!isUploading && (
              <button
                type="button"
                className="px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer"
                style={uploadButtonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                }}
              >
                Chọn file
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      {value && !isUploading && (
        <div 
          className="relative p-3 rounded-lg"
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          <div className="relative">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Remove button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#ef4444",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Replace button */}
          <button
            type="button"
            onClick={handleClick}
            className="mt-3 w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            style={uploadButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(15, 23, 42, 0.7)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
            disabled={disabled}
          >
            <ImageIcon className="w-4 h-4" />
            Thay đổi ảnh
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      )}
      
      {/* Loading overlay */}
      {isUploading && value && (
        <div 
          className="absolute inset-0 flex items-center justify-center rounded-lg"
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(4px)"
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <Loader2 
              className="w-8 h-8 animate-spin" 
              style={{ color: currentAccentColor }}
            />
            <p 
              className="text-sm font-medium"
              style={{ color: "#f1f5f9" }}
            >
              Đang tải lên...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
