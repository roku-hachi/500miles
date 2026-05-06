const userModel = require("../models/userModel");

const getUserById = async (req, res) => {
  const data = req.body;
  const id = Number(req.params.id);
  const user = await userModel.getUserById(id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const data = req.body;
  const { idUser } = req.params;
  if (data.file) {
    data.file = req.file.path;
  }
  const user = await userModel.updateUser(idUser, data);
  res.json(user);
};

module.exports = {
  getUserById,
  updateUser,
};
