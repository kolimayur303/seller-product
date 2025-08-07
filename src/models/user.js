const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobileNo: String,
  country: String,
  state: String,
  skills: [String],
  role: { type: String, enum: ["admin", "seller"] },
}, { versionKey: false });

module.exports = mongoose.model("user", userSchema);