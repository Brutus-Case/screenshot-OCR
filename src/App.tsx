import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import ResultsArea from './components/ResultsArea';
import { useOCR } from './hooks/useOCR';
import { useClipboard } from './hooks/useClipboard';
import { AlertCircle } from 'lucide-react';

function App() {
  const [autoCopy, setAutoCopy] = useState(true);
  const [extractedText, setExtractedText] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  
  const { processImage, isProcessing, error } = useOCR();
  const { copyToClipboard } = useClipboard();

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleClearResults = () => {
    setExtractedText('');
    setPreviewImage('');
    showNotification('Results cleared');
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Process with OCR
      const text = await processImage(file);
      setExtractedText(text);

      if (text) {
        if (autoCopy) {
          const success = await copyToClipboard(text);
          if (success) {
            showNotification('Text extracted and copied to clipboard!');
          } else {
            showNotification('Text extracted! Click copy button to copy manually.');
          }
        } else {
          showNotification('Text extracted successfully!');
        }
      } else {
        showNotification('No text found in the image.');
      }
    } catch (err) {
      showNotification('Failed to process image. Please try again.');
    }
  };

  const handleCopyText = async () => {
    const success = await copyToClipboard(extractedText);
    if (success) {
      showNotification('Text copied to clipboard!');
    } else {
      showNotification('Failed to copy text. Please try selecting and copying manually.');
    }
  };

  // Global paste handler
  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      if (isProcessing) return;
      
      const items = Array.from(e.clipboardData?.items || []);
      const imageItem = items.find(item => item.type.startsWith('image/'));
      
      if (imageItem) {
        e.preventDefault();
        const file = imageItem.getAsFile();
        if (file) {
          handleImageUpload(file);
        }
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, [isProcessing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Header autoCopy={autoCopy} onToggleAutoCopy={setAutoCopy} />
        
        {/* Results Area - Now positioned above Upload Area */}
        <ResultsArea
          extractedText={extractedText}
          onCopyText={handleCopyText}
          onClearResults={handleClearResults}
          previewImage={previewImage}
        />
        
        {/* Upload Area - Now positioned below Results Area */}
        <UploadArea 
          onImageUpload={handleImageUpload} 
          isProcessing={isProcessing} 
        />
        
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {notification && (
          <div className="fixed bottom-6 right-6 bg-forest-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 animate-fade-in">
            <p className="font-medium">{notification}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;