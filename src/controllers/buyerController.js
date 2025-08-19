const jwt = require("jsonwebtoken");
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const { handlePayment } = require('../services/paymentService');
const user = require('../models/user');

const buyerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const buyer = await user.findOne({ email });

    if (!buyer) return res.status(401).json({ status:false, message:'Invalid credentials' });

    const ok = await bcrypt.compare(password, buyer.password);
    if (!ok) return res.status(401).json({ status:false, message:'Invalid credentials' });

    const token = jwt.sign({ id: buyer._id, role: 'buyer' }, process.env.JWT_SECRET, {expiresIn: '1d'});
    delete buyer.password;
    res.json({ status:true, buyer, token});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const buyProduct = async (req, res, next) => {
  const { productId, brandName, quantity } = req.body;
  const buyerId = req.user.id; // from JWT
  const result = await handlePayment({ buyerId, productId, brandName, quantity });
  if (!result.success) return res.status(400).json({ status:false, message: result.message });
  res.json({ status:true, message:'Payment successful', order: result.order });
};

module.exports = router;

module.exports = {
    buyerLogin,
    buyProduct
}