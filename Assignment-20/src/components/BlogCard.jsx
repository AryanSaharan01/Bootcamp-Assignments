import React from 'react';
import { Calendar, Clock, User, Edit, Trash2 } from 'lucide-react';

export function BlogCard({ post, showActions = false, onEdit, onDelete, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => onClick?.(post)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{post.authorName}</span>
          </div>
          {!post.published && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Draft
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(post);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(post.id);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}