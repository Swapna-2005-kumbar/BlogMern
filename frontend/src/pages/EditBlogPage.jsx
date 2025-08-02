import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import api from '../api'; // Import your Axios instance

export function EditBlogPage() { // Corrected function name
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId) => {
    try {
      const response = await api.get(`/api/blogs/${blogId}`); // Call the backend route
      const data = response.data;

      // Check if user is the author (adjust property name if needed)
      if (data.author !== user?.id) {
        navigate('/');
        return;
      }

      setBlog(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setUpdating(true);
    setError('');

    try {
      await api.put(`/api/blogs/${id}`, { // Call the backend route
        title: title.trim(),
        content: content.trim(),
      });

      navigate(`/blog/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update blog post'); // Access error message from response
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(`/blog/${id}`)}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Post
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Edit Blog Post
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
              placeholder="Enter your blog post title"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
              placeholder="Write your blog post content here..."
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
            >
              {updating ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}