const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name') // Populate author's name
      .sort({ createdAt: -1 });   // latest blogs first

    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Server error while fetching blogs' });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please provide title and content' });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Server error while creating blog' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ message: 'Server error while fetching blog' });
  }
};

const updateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error.message);
    res.status(500).json({ message: 'Server error while updating blog' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog removed' });
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ message: 'Server error while deleting blog' });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
