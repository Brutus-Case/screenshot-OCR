import React from 'react';

interface HeaderProps {
  autoCopy: boolean;
  onToggleAutoCopy: (enabled: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ autoCopy, onToggleAutoCopy }) => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-2">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
          Screenshot OCR
        </h1>
        
        {/* Inline Auto-copy Toggle */}
        <div className="ml-6 flex items-center space-x-2 group relative">
          <span className="text-sm text-gray-600 font-medium">Auto-copy</span>
          <button
            onClick={() => onToggleAutoCopy(!autoCopy)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              autoCopy ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            title={`${autoCopy ? 'Disable' : 'Enable'} auto-copy to clipboard`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                autoCopy ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          
          {/* Tooltip */}
          <div className="absolute left-0 top-full mt-2 w-64 bg-forest-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="absolute -top-1 left-8 w-2 h-2 bg-forest-800 rotate-45"></div>
            Automatically copy extracted text to clipboard
          </div>
        </div>
      </div>
      
      <p className="text-base text-gray-600 leading-relaxed">
        Extract text from screenshot to Clipboard
      </p>
    </header>
  );
};

export default Header;