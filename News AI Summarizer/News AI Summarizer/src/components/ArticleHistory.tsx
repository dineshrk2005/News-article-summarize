import React, { useState } from 'react';
import { Clock, Search, Trash2, ExternalLink } from 'lucide-react';
import { SummaryData } from '../types';

interface ArticleHistoryProps {
  history: SummaryData[];
  onSelect: (summaryData: SummaryData) => void;
}

export const ArticleHistory: React.FC<ArticleHistoryProps> = ({ history, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item =>
    item.article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600">Your summarized articles will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Article History</h2>
          <span className="text-sm text-gray-500">{history.length} articles</span>
        </div>

        <div className="relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">
                  {item.article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.readingTime} min read</span>
                  </div>
                  <span>•</span>
                  <span>{item.summaryLength} words</span>
                  <span>•</span>
                  <span>{item.createdAt.toLocaleDateString()}</span>
                  {item.article.source && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="h-3 w-3" />
                        <span>{item.article.source}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // In a real app, this would remove the item from history
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-4"
                title="Delete from history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && searchTerm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600">Try searching with different keywords.</p>
          </div>
        </div>
      )}
    </div>
  );
};