const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username allready exist !"],
    required: [true, "username is required !"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email are require"],
    unique: [true, "user with this email allready exist"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required !"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/lwazexsq6/360_F_964891898_SuTIP6H2AVZkBuUG2cIpP9nvdixORKpM.jpg?updatedAt=1770801824268",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
