const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("post", { posts: posts });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/upload", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await post.save();
    res.redirect("/posts");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
