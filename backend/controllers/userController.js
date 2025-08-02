import User from '../models/User.js';
import Blog from '../models/Blog.js';

// @desc    Fetch current user’s profile
// @route   GET /api/users/me
export const getUserProfile = async (req, res) => {
  try {
    // req.user is populated by the 'protect' middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      const userBlogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        blogs: userBlogs,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};