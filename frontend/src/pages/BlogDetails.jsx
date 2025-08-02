import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import api from '../api';
import { Calendar, User, Edit, Trash2, ArrowLeft } from 'lucide-react';

export function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId) => {
    try {
      const response = await api.get(`/api/blogs/${blogId}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blog || !window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setDeleting(true);

    try {
      await api.delete(`/api/blogs/${blog._id || blog.id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Blog post not found.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const isAuthor = user?._id === blog.author || user?.id === blog.author;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors duration-200">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-8 sm:p-10">
          <header className="mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between text-gray-600 text-sm">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-gray-700">{blog.author?.name || 'Unknown Author'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600">{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              {isAuthor && (
                <div className="flex items-center space-x-3">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200 shadow-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                Last updated: {formatDate(blog.updatedAt)}
              </p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}