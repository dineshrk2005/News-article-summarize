import React from 'react';
import { Clock, BarChart3, Copy, Download, CheckCircle, Loader2 } from 'lucide-react';
import { Article, SummaryData } from '../types';
import { getCategoryConfig } from '../utils/categories';

interface SummaryDisplayProps {
  article: Article | null;
  summaryData: SummaryData | null;
  isLoading: boolean;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ 
  article, 
  summaryData, 
  isLoading 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (summaryData?.summary) {
      await navigator.clipboard.writeText(summaryData.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = () => {
    if (summaryData) {
      const content = `Title: ${summaryData.article.title}\n\nOriginal Article:\n${summaryData.article.content}\n\nSummary:\n${summaryData.summary}\n\nGenerated on: ${summaryData.createdAt.toLocaleString()}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${summaryData.article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Article</h3>
            <p className="text-gray-600">Our AI is reading and summarizing your article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Summarize</h3>
          <p className="text-gray-600">Enter an article URL or paste content to get started.</p>
        </div>
      </div>
    );
  }

  const compressionRatio = Math.round((1 - summaryData.summaryLength / summaryData.article.content.split(' ').length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy summary"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleExport}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export as text file"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-gray-600 mr-1" />
            </div>
            <div className="text-sm font-medium text-gray-900">{summaryData.readingTime} min</div>
            <div className="text-xs text-gray-600">Reading Time</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">{compressionRatio}%</div>
            <div className="text-xs text-gray-600">Compressed</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">{summaryData.summaryLength}</div>
            <div className="text-xs text-gray-600">Words</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Article Title</h3>
            <p className="text-gray-900 font-medium">{summaryData.article.title}</p>
          </div>

          {summaryData.article.source && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Source</h3>
              <div className="flex items-center space-x-2">
                <p className="text-blue-600">{summaryData.article.source}</p>
                {summaryData.article.category && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryConfig(summaryData.article.category).lightColor} ${getCategoryConfig(summaryData.article.category).textColor}`}>
                    {getCategoryConfig(summaryData.article.category).icon} {getCategoryConfig(summaryData.article.category).name}
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">AI Summary</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-900 leading-relaxed">{summaryData.summary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
        <p className="text-xs text-gray-500">
          Generated on {summaryData.createdAt.toLocaleDateString()} at {summaryData.createdAt.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};