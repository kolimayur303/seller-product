const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobileNo: String,
  country: String,
  state: String,
  skills: [String],
  role: { type: String ,enum: ["admin", "seller", "buyer"]},
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // who created this user (admin created seller / seller created buyer)
  }
},{ 
    versionKey: false, 
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);