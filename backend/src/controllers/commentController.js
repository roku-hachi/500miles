const commentModel = require("../models/commentModel");

const createComment = async (req, res) => {
  const data = req.body;
  const comment = await commentModel.createComment(data);
  res.json(comment);
};

const getComment = async (req, res) => {
  const { postId } = req.params;
  const totalMain = await commentModel.totalMain(postId);
  const totalReplies = await commentModel.totalReplies(postId);
  const comment = await commentModel.getComment(postId);
  res.json({
    comments: comment,
    totalMain: totalMain,
    totalReplies: totalReplies,
  });
};

module.exports = {
  createComment,
  getComment,
};
