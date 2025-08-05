export interface Article {
  id?: string;
  title: string;
  content: string;
  url?: string;
  source?: string;
  category: NewsCategory;
  publishedAt?: Date;
  imageUrl?: string;
  author?: string;
}

export interface SummaryData {
  id: string;
  article: Article;
  summary: string;
  createdAt: Date;
  readingTime: number;
  summaryLength: number;
  userId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  favoriteCategories: NewsCategory[];
  summaryLength: 'short' | 'medium' | 'long';
  theme: 'light' | 'dark';
}

export type NewsCategory = 
  | 'technology' 
  | 'business' 
  | 'politics' 
  | 'sports' 
  | 'entertainment' 
  | 'health' 
  | 'science' 
  | 'world' 
  | 'local';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  source: string;
  author?: string;
  publishedAt: Date;
  category: NewsCategory;
  trending?: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}