import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async (myPosts = false) => {
    try {
      setLoading(true);
      const data = myPosts ? await api.getMyPosts() : await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const data = await api.createPost(postData);
      await fetchPosts(true);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const data = await api.updatePost(id, postData);
      await fetchPosts(true);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  const deletePost = async (id) => {
    try {
      await api.deletePost(id);
      await fetchPosts(true);
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}