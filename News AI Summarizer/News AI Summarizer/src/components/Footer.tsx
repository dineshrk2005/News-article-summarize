import React from 'react';
import { Heart, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-red-500" />
          <span>and</span>
          <Code className="h-4 w-4 text-blue-500" />
          <span>for intelligent news consumption</span>
        </div>
        <div className="text-center mt-2 text-xs text-gray-500">
          © 2025 NewsAI Summarizer. Powered by advanced AI technology.
        </div>
      </div>
    </footer>
  );
};