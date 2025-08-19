const express = require("express");
const router = express.Router();
const { validateBuyerLogin } = require('../middleware/validationMiddleware');
const { buyerLogin } = require('../controllers/buyerController');
const { buyProduct } = require('../controllers/buyerController');
const auth = require("../middleware/auth");

router.post("/login", validateBuyerLogin, buyerLogin);
router.post('/buy-product', auth(['buyer']), buyProduct);

module.exports = router;