const express = require("express");
const router = express.Router();
const { registerAdmin, adminLogin, createSeller, listSellers } = require("../controllers/adminController");
const auth = require("../middleware/auth");
const { validateAdminLogin, validateCreateSeller, validateAdminRegister} = require('../middleware/validationMiddleware');

router.post('/register', validateAdminRegister, registerAdmin);
router.post("/login", auth(["admin"]), validateAdminLogin, adminLogin);
router.post("/sellers", auth(["admin"]), validateCreateSeller, createSeller);
router.get("/sellers", auth(["admin"]), listSellers);

module.exports = router;