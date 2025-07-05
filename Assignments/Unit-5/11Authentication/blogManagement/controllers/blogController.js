const Blog = require("../models/Blog");
const User = require("../models/User");

const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blog = await Blog.create({
      title,
      content,
      tags,
      createdBy: req.user.userId,
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user.userId });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();

    const blogsPerUser = await Blog.aggregate([
      {
        $group: {
          _id: "$createdBy",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          user: "$user.name",
          count: 1,
        },
      },
    ]);

    const commonTags = await Blog.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalBlogs,
      blogsPerUser,
      mostCommonTags: commonTags,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog stats" });
  }
};

module.exports = {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getBlogStats,
};
