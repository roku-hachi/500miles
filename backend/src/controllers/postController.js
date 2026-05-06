const postModel = require("../models/postModel");

const createPost = async (req, res) => {
  const data = req.body;
  if (req.files && req.files.length > 0) {
    data.image = req.files.map((file) => file.path);
  }
  data.user_id = parseInt(data.user_id);
  const post = await postModel.createPost(data);
  res.json(post);
};

const getPost = async (req, res) => {
  const post = await postModel.getPost();
  res.json(post);
};

const getPostById = async (req, res) => {
  const idPost = parseInt(req.params.idPost);
  const post = await postModel.getPostById(idPost);
  res.json(post);
};

const updatePost = async (req, res) => {
  const data = req.body;
  const idPost = parseInt(req.params.idPost);
  data.user_id = parseInt(data.user_id);
  const post = await postModel.updatePost(idPost, data);
  res.json(post);
};

const deletePost = async (req, res) => {
  const idPost = parseInt(req.params.idPost);
  const post = await postModel.deletePost(idPost);
  res.json({
    message: "user deleted",
    data: post,
  });
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
