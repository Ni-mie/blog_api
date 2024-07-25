const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const posts = await Post.findAll({
        limit: parseInt(limit),
        offset: (page - 1) * limit,
      });
      res.send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, authorId: req.user.id });
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ where: { id, authorId: req.user.id } });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id, authorId: req.user.id } });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    await post.destroy();
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
