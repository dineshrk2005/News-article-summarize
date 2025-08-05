import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { SummaryDisplay } from './components/SummaryDisplay';
import { ArticleHistory } from './components/ArticleHistory';
import { DailyNewsFeed } from './components/news/DailyNewsFeed';
import { Footer } from './components/Footer';
import { Article, SummaryData } from './types';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [articleHistory, setArticleHistory] = useState<SummaryData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'summarize' | 'history'>('news');

  const handleArticleSubmit = async (article: Article) => {
    setIsProcessing(true);
    setCurrentArticle(article);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const summary = generateSummary(article.content);
    const newSummaryData: SummaryData = {
      id: Date.now().toString(),
      article,
      summary,
      createdAt: new Date(),
      readingTime: Math.ceil(article.content.split(' ').length / 200),
      summaryLength: summary.split(' ').length,
    };

    setSummaryData(newSummaryData);
    setArticleHistory(prev => [newSummaryData, ...prev].slice(0, 10));
    setIsProcessing(false);
  };

  const generateSummary = (content: string): string => {
    // Mock summarization logic - in real app, this would call an AI API
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const keyPoints = sentences
      .sort((a, b) => b.length - a.length)
      .slice(0, Math.max(2, Math.floor(sentences.length * 0.3)))
      .sort((a, b) => content.indexOf(a) - content.indexOf(b));
    
    return keyPoints.join('. ').trim() + '.';
  };

  const handleHistorySelect = (summaryData: SummaryData) => {
    setCurrentArticle(summaryData.article);
    setSummaryData(summaryData);
    setActiveTab('summarize');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('news')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'news'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📰 Daily News
            </button>
            <button
              onClick={() => setActiveTab('summarize')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'summarize'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ✨ Summarize Article
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📚 History ({articleHistory.length})
            </button>
          </nav>
        </div>

        {activeTab === 'news' && <DailyNewsFeed />}

        {activeTab === 'summarize' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ArticleInput onSubmit={handleArticleSubmit} isLoading={isProcessing} />
            </div>
            
            <div className="space-y-6">
              <SummaryDisplay 
                article={currentArticle}
                summaryData={summaryData}
                isLoading={isProcessing}
              />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <ArticleHistory 
            history={articleHistory}
            onSelect={handleHistorySelect}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;