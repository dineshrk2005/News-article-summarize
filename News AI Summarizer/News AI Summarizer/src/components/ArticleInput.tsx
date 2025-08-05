import React, { useState } from 'react';
import { Link, Type, Send, Loader2 } from 'lucide-react';
import { Article, NewsCategory } from '../types';
import { getCategoryConfig } from '../utils/categories';

interface ArticleInputProps {
  onSubmit: (article: Article) => void;
  isLoading: boolean;
}

export const ArticleInput: React.FC<ArticleInputProps> = ({ onSubmit, isLoading }) => {
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('technology');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputType === 'url' && url.trim()) {
      // In a real app, this would fetch the article content
      const mockContent = `This is a sample article content fetched from ${url}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec auctor blandit quam non rutrum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`;
      
      onSubmit({
        title: `Article from ${new URL(url).hostname}`,
        content: mockContent,
        url: url,
        source: new URL(url).hostname,
        category: selectedCategory
      });
    } else if (inputType === 'text' && content.trim()) {
      onSubmit({
        title: title.trim() || 'Custom Article',
        content: content.trim(),
        category: selectedCategory
      });
    }
  };

  const isValid = inputType === 'url' ? url.trim() : content.trim();
  const categories: NewsCategory[] = ['technology', 'business', 'politics', 'sports', 'entertainment', 'health', 'science', 'world', 'local'];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Article</h2>
        
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setInputType('url')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              inputType === 'url'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Link className="h-4 w-4" />
            <span>From URL</span>
          </button>
          <button
            type="button"
            onClick={() => setInputType('text')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              inputType === 'text'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>Paste Text</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Article Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as NewsCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            >
              {categories.map((category) => {
                const config = getCategoryConfig(category);
                return (
                  <option key={category} value={category}>
                    {config.icon} {config.name}
                  </option>
                );
              })}
            </select>
          </div>

          {inputType === 'url' ? (
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Article URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Article Title (optional)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your article content here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Summarize Article</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};