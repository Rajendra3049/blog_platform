const express = require("express");
const { blogModel } = require("../models/blog.model");
const { userAuth } = require("../middlewares/userAuth");

const blogRoutes = express.Router();

blogRoutes.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).send({ data: blogs });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching blogs" });
  }
});
blogRoutes.patch("/like-blog/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await blogModel.findById(_id);

    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).send({ msg: "Blog liked successfully", data: updatedBlog });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while liking the blog" });
  }
});
blogRoutes.patch("/dislike-blog/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const blog = await blogModel.findById(_id);

    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id },
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    res.status(200).send({ msg: "Blog liked successfully", data: updatedBlog });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while liking the blog" });
  }
});

blogRoutes.get("/my-blogs", userAuth, async (req, res) => {
  const userId = req.body.userId;
  try {
    const blogs = await blogModel.find({ userId });
    res.status(200).send({ data: blogs });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching your blogs" });
  }
});

blogRoutes.post("/blog", userAuth, async (req, res) => {
  try {
    const newBlog = await blogModel.create(req.body);
    res.status(201).send({ msg: "Blog created successfully", data: newBlog });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the blog" });
  }
});

blogRoutes.patch("/blog/:id", userAuth, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  try {
    const blog = await blogModel.findById(_id);

    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .send({ error: "Unauthorized to update this blog" });
    }

    await blogModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send({ msg: "Blog updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating the blog" });
  }
});

blogRoutes.delete("/blog/:id", userAuth, async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;

  try {
    const blog = await blogModel.findById(_id);

    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .send({ error: "Unauthorized to delete this blog" });
    }

    await blogModel.findByIdAndDelete(_id);
    res.status(200).send({ msg: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the blog" });
  }
});

module.exports = { blogRoutes };
