import React, { useRef, useState } from 'react';
import { Upload, Image, Cast as Paste } from 'lucide-react';

interface UploadAreaProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onImageUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find(item => item.type.startsWith('image/'));
    
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        onImageUpload(file);
      }
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl p-12 shadow-xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-2xl ${
        isDragOver
          ? 'border-orange-400 bg-orange-50 scale-105'
          : isProcessing
          ? 'border-orange-400 bg-orange-50'
          : 'border-coral-300 hover:border-orange-400 hover:bg-coral-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onClick={() => fileInputRef.current?.click()}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          fileInputRef.current?.click();
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isProcessing}
      />
      
      <div className="text-center">
        <div className="mb-8">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver
              ? 'bg-orange-500 scale-110'
              : isProcessing
              ? 'bg-orange-500 animate-pulse'
              : 'bg-gradient-to-br from-forest-500 to-forest-600'
          }`}>
            {isProcessing ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : isDragOver ? (
              <Upload className="w-10 h-10 text-white" />
            ) : (
              <Image className="w-10 h-10 text-white" />
            )}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-forest-800 mb-4">
          {isProcessing ? 'Processing Image...' : isDragOver ? 'Drop Image Here' : 'Upload Screenshot'}
        </h3>
        
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {isProcessing
            ? 'Extracting text from your image using OCR technology'
            : 'Drag and drop, paste (Ctrl+V), or click to select your screenshot'
          }
        </p>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Paste className="w-4 h-4" />
            <span>Paste (Ctrl+V)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Drag & Drop</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span>Click to Browse</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;