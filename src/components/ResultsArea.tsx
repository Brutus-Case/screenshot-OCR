import React, { useState } from 'react';
import { Copy, Check, FileText, Download, X } from 'lucide-react';

interface ResultsAreaProps {
  extractedText: string;
  onCopyText: () => void;
  onClearResults: () => void;
  previewImage?: string;
}

const ResultsArea: React.FC<ResultsAreaProps> = ({ 
  extractedText, 
  onCopyText, 
  onClearResults, 
  previewImage 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopyText();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!extractedText) return null;

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-forest-600 to-forest-500 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Extracted Text</h3>
              <p className="text-forest-100">
                {extractedText.length} characters • {extractedText.split('\n').length} lines
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClearResults}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
              title="Clear results and start over"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
              title="Download text as file"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button
              onClick={handleCopy}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                copied
                  ? 'bg-white text-forest-600'
                  : 'bg-white/20 hover:bg-white text-white hover:text-forest-600'
              }`}
              title="Copy text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* OCR Text appears first */}
        <div className="bg-coral-50 rounded-xl p-6 border border-coral-200 mb-6">
          <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
            {extractedText}
          </pre>
        </div>
        
        {/* Preview image appears after the OCR text */}
        {previewImage && (
          <div>
            <img
              src={previewImage}
              alt="Uploaded screenshot"
              className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsArea;