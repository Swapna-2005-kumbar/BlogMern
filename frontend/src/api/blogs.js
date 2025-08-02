import axiosInstance from './axiosInstance';

/**
 * Fetches all blog posts.
 * @returns {Promise<Array>} A list of all blogs.
 */
export const getAllBlogs = async () => {
  const { data } = await axiosInstance.get('/blogs');
  return data;
};

/**
 * Fetches a single blog post by its ID.
 * @param {string} id - The ID of the blog post.
 * @returns {Promise<object>} The blog post object.
 */
export const getBlogById = async (id) => {
  const { data } = await axiosInstance.get(`/blogs/${id}`);
  return data;
};

/**
 * Creates a new blog post.
 * @param {object} blogData - The blog data { title, content }.
 * @returns {Promise<object>} The newly created blog post.
 */
export const createBlog = async (blogData) => {
  const { data } = await axiosInstance.post('/blogs', blogData);
  return data;
};

/**
 * Updates an existing blog post.
 * @param {string} id - The ID of the blog post to update.
 * @param {object} blogData - The updated blog data { title, content }.
 * @returns {Promise<object>} The updated blog post.
 */
export const updateBlog = async (id, blogData) => {
  const { data } = await axiosInstance.put(`/blogs/${id}`, blogData);
  return data;
};

/**
 * Deletes a blog post by its ID.
 * @param {string} id - The ID of the blog post to delete.
 * @returns {Promise<object>} A confirmation message.
 */
export const deleteBlog = async (id) => {
  const { data } = await axiosInstance.delete(`/blogs/${id}`);
  return data;
};