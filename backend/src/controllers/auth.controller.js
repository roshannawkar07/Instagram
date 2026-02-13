const mongoose = require("mongoose");
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register controller
async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "user allready exist" +
        (isUserAlreadyExists.email == email
          ? "with this email"
          : "with this username"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id, // payload
    },

    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(409).json({
    message: "user register successfully !",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);
  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = { registerController, loginController };
