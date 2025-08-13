import React from 'react';
import { BlogCard } from './BlogCard';

export function BlogList({ posts, loading, error, showActions = false, onEdit, onDelete, onPostClick }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          showActions={showActions}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onPostClick}
        />
      ))}
    </div>
  );
}