import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BlogCard } from "../components/BlogCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { User, PenTool, Plus } from "lucide-react";
import api from '../api'; // Import your Axios instance

export function ProfilePage() { // Corrected function name
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); // Store profile data

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/users/me'); // Call the backend route
      setProfile(response.data); // Store profile data
      setBlogs(response.data.blogs); // Store blogs
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!profile) {
    return <LoadingSpinner />; // Show loading spinner if profile is not yet loaded
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
          <div className="flex items-center space-x-4 text-center sm:text-left mb-4 sm:mb-0">
            <div className="bg-blue-100 p-4 rounded-full shadow-inner">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600 text-lg">{profile.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <PenTool className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            My Blog Posts ({blogs.length})
          </h2>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <PenTool className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              No blog posts yet
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Start sharing your thoughts with the world by creating your first blog
              post.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}