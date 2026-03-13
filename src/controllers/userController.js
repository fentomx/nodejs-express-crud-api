const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        messaje: "empty table",
      });
    }

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    res.status(200).json({
      success: true,
      users: formattedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(name, email, hashedPassword);
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(201).json({
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.updateUser(
      req.params.id,
      name,
      email,
      hashedPassword,
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
