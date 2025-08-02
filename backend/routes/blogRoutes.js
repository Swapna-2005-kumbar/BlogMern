const express = require('express');
const router = express.Router();
const { 
  getAllBlogs, 
  createBlog, 
  getBlogById, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const auth = require('../middleware/auth');

// Public route to get all blogs
router.get('/', getAllBlogs);

// Public route to get a single blog by ID
router.get('/:id', getBlogById);

// Protected route to create a new blog
router.post('/', auth, createBlog);

// Protected route to update a blog
router.put('/:id', auth, updateBlog);

// Protected route to delete a blog
router.delete('/:id', auth, deleteBlog);

module.exports = router;
