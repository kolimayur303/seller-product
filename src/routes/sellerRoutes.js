const express = require("express");
const router = express.Router();
const { sellerLogin } = require("../controllers/sellerController");
const { validateSellerLogin } = require('../middleware/validationMiddleware');
const { createBuyer } = require('../controllers/sellerController');
const auth = require("../middleware/auth");
const { validateCreateBuyer } = require('../middleware/validationMiddleware')

router.post("/login", validateSellerLogin, sellerLogin);
router.post("/create-buyer", auth(["seller"]), validateCreateBuyer, createBuyer);

module.exports = router;