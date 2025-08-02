import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool, User, LogOut, Home, Plus } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-3xl font-extrabold text-white hover:text-blue-100 transition-colors duration-300">
            <PenTool className="h-9 w-9" />
            <span>BlogHub</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {user ? (
              <>
                <Link to="/create" className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
                  <Plus className="h-5 w-5" />
                  <span>Write</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-white hover:text-red-200 transition-colors duration-300 text-lg font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-white text-blue-600 px-5 py-2 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 font-semibold shadow-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}