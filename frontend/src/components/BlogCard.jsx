import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

export function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-700 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>
        
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
          {getExcerpt(blog.content)}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">{blog.author.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-gray-600">{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}