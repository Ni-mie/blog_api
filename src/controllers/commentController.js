const Comment = require('../models/Comment');

const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    try {
      const comments = await Comment.findAll({
        where: { postId },
        limit: parseInt(limit),
        offset: (page - 1) * limit,
      });
      res.send(comments);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({ postId, content, authorId: req.user.id });
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findOne({ where: { id, authorId: req.user.id } });
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    comment.content = content;
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findOne({ where: { id, authorId: req.user.id } });
    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getCommentsByPostId, createComment, updateComment, deleteComment };
