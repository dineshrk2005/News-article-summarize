import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Newspaper className="h-12 w-12 text-white" />
                <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">NewsAI</h1>
                <p className="text-blue-100">Intelligent News Platform</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white leading-tight">
              Stay Informed with AI-Powered News Summarization
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Get personalized news summaries, track trending topics, and never miss important stories with our advanced AI technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 space-y-4"
          >
            <div className="flex items-center space-x-3 text-blue-100">
              <TrendingUp className="h-5 w-5 text-yellow-300" />
              <span>Real-time trending news analysis</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-100">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span>Instant AI-powered article summaries</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-100">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span>Personalized news recommendations</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};