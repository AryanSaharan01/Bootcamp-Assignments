import React from 'react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

export function PostViewer({ post, onBack }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to posts</span>
        </button>

        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}