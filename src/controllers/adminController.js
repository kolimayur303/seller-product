const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require('../models/user');

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await user.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await user.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });

    if (admin.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (admin._id.toString() !== decoded.id.toString()) {
          return res.status(403).json({ message: "Access denied: token mismatch" });
        }
      } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }

    const newToken = jwt.sign(
      { id: admin._id.toString(), role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token: newToken,
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const createSeller = async (req, res) => {
  const { name, email, mobileNo, country, state, skills, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });
    const hash = await bcrypt.hash(password, 10);
    const seller = new User({
      name,
      email,
      mobileNo,
      country,
      state,
      skills,
      password: hash,
      role: "seller",
      createdBy: req.user._id
    });
    await seller.save();
    res.status(201).json({ message: "Seller created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating seller" });
  }
};

const listSellers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const sellers = await User.find({ role: "seller" }).select("-password").skip(skip).limit(limit);
  res.json({
    page,
    limit,
    count: sellers.length,
    sellers,
  });
};

module.exports = {
    registerAdmin,
    adminLogin,
    createSeller,
    listSellers
}