const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  const seller = await User.findOne({ email, role: "seller" });
  console.log(seller);
  if (!seller) return res.status(401).json({ message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, seller.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: seller._id, role: "seller" }, process.env.JWT_SECRET);
  res.json({message: 'Seller login successfully', token });
};

module.exports = { sellerLogin };
