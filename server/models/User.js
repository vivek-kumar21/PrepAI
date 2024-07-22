const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Only require password if not using Google login
    required: function () {
      return !this.googleId;
    },
    minlength: 6,
  },
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
