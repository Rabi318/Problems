const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getBlogStats,
} = require("../controllers/blogController");

router.use(authMiddleware);
router.post("/", createBlog);
router.get("/", getUserBlogs);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.get("/stats", getBlogStats); // Aggregation route

module.exports = router;
