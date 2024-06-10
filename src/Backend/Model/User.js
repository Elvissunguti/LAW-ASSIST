const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: String,
  },
});




const UserModel = mongoose.model("User", User);

module.exports = UserModel;
