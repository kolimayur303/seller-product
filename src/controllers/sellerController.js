const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  const seller = await User.findOne({ email, role: "seller" });
  if (!seller) return res.status(401).json({ message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, seller.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: seller._id, role: "seller" }, process.env.JWT_SECRET);
  res.json({message: 'Seller login successfully', token });
};

const createBuyer = async (req, res) => {
  try {
    const { name, email, mobileNo, password, country, state } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: false, message: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const buyer = new User({
      name,
      email,
      mobileNo,
      country,
      state,
      password: hash,
      role: "buyer",
      createdBy: req.user._id
    });
    await buyer.save();
    res.status(201).json({ message: "Buyer created successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { 
  sellerLogin,
  createBuyer
 };
