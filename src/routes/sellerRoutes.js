const express = require("express");
const router = express.Router();
const { sellerLogin } = require("../controllers/sellerController");
const { validateSellerLogin } = require('../middleware/validationMiddleware');

router.post("/login", validateSellerLogin, sellerLogin);

module.exports = router;