const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  gender: String,
});

module.exports = mongoose.model("user", userSchema);
