const userModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await userModel.createUser(name, email);

  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await userModel.getUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await userModel.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await userModel.updateUser(req.params.id, name, email);

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);

  res.json({ message: "User deleted" });
};
