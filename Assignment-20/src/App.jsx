import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AuthForm } from './components/AuthForm';
import { BlogList } from './components/BlogList';
import { BlogForm } from './components/BlogForm';
import { PostViewer } from './components/PostViewer';
import { useAuth } from './hooks/useAuth';
import { useBlogPosts } from './hooks/useBlogPosts';
import { Plus } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPost, setCurrentPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { posts, fetchPosts, createPost, updatePost, deletePost } = useBlogPosts();

  const handlePostSave = async (postData) => {
    setLoading(true);
    let result;
    if (editingPost) {
      result = await updatePost(editingPost.id, postData);
    } else {
      result = await createPost(postData);
    }
    if (!result.error) {
      setCurrentPage('dashboard');
      setEditingPost(null);
    }
    setLoading(false);
  };

  const handlePostDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setCurrentPage('create');
  };

  const handlePostClick = (post) => {
    setCurrentPost(post);
    setCurrentPage('view');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setEditingPost(null);
    setCurrentPost(null);
    if (page === 'home') {
      fetchPosts(false);
    } else if (page === 'dashboard' && user) {
      fetchPosts(true);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (currentPage === 'auth') {
    return <AuthForm onSuccess={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'create') {
    return (
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        <BlogForm
          post={editingPost}
          onSave={handlePostSave}
          onCancel={() => handleNavigate('dashboard')}
          loading={loading}
        />
      </Layout>
    );
  }

  if (currentPage === 'view' && currentPost) {
    return (
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        <PostViewer
          post={currentPost}
          onBack={() => setCurrentPage('home')}
        />
      </Layout>
    );
  }

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {currentPage === 'home' && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
                Welcome to MY Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover amazing stories, share your thoughts, and connect with writers from around the world.
              </p>
            </div>
            <BlogList
              posts={posts}
              onPostClick={handlePostClick}
            />
          </>
        )}
        {currentPage === 'dashboard' && user && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
                <p className="text-gray-600">Manage your blog posts</p>
              </div>
              <button
                onClick={() => setCurrentPage('create')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </button>
            </div>
            <BlogList
              posts={posts}
              showActions={true}
              onEdit={handleEditPost}
              onDelete={handlePostDelete}
              onPostClick={handlePostClick}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;