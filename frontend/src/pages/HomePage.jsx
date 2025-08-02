import React, { useEffect, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import api from '../api';
import { Search } from 'lucide-react';

export function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/api/blogs');
      const data = response.data;
      setBlogs(data); // Assuming backend now returns populated author and correct date format
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author?.name.toLowerCase().includes(searchTerm.toLowerCase()) // Use optional chaining for author name
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Welcome to <span className="text-blue-600">BlogHub</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover captivating stories, insightful articles, and share your unique perspective with the world.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search blogs by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-lg shadow-sm"
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-2xl font-medium">
            {searchTerm ? 'No blogs found matching your search criteria.' : 'No blogs available yet. Be the first to publish!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}