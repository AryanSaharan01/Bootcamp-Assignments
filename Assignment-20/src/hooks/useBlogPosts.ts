import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost, CreatePostData } from '../types/blog';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (published = true) => {
    try {
      setLoading(true);
      const query = supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(name, email)
        `)
        .order('created_at', { ascending: false });

      if (published) {
        query.eq('published', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedPosts = data.map((post: any) => ({
        ...post,
        author_name: post.author?.name || 'Anonymous',
        author_email: post.author?.email || '',
      }));

      setPosts(formattedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: CreatePostData) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...postData,
          reading_time: Math.ceil(postData.content.length / 1000),
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchPosts(false);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updatePost = async (id: string, postData: Partial<CreatePostData>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString(),
          reading_time: postData.content ? Math.ceil(postData.content.length / 1000) : undefined,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchPosts(false);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts(false);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
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