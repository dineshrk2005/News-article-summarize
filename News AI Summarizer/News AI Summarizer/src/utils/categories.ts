import { NewsCategory } from '../types';

export const categoryConfig = {
  technology: {
    name: 'Technology',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    icon: '💻'
  },
  business: {
    name: 'Business',
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: '💼'
  },
  politics: {
    name: 'Politics',
    color: 'bg-red-500',
    lightColor: 'bg-red-100',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: '🏛️'
  },
  sports: {
    name: 'Sports',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    icon: '⚽'
  },
  entertainment: {
    name: 'Entertainment',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    icon: '🎬'
  },
  health: {
    name: 'Health',
    color: 'bg-pink-500',
    lightColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    icon: '🏥'
  },
  science: {
    name: 'Science',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-100',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    icon: '🔬'
  },
  world: {
    name: 'World',
    color: 'bg-teal-500',
    lightColor: 'bg-teal-100',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
    icon: '🌍'
  },
  local: {
    name: 'Local',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    icon: '📍'
  }
} as const;

export const getCategoryConfig = (category: NewsCategory) => {
  return categoryConfig[category];
};