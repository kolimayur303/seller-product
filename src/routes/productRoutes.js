const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addProduct, listProducts, deleteProduct } = require("../controllers/productController");
const { upload } = require("../uploads/upload");
const { validateAddProduct } = require('../middleware/validationMiddleware');


router.post("/products", auth(["seller"]), upload.array("images"), validateAddProduct, addProduct);
router.get("/products", auth(["seller"]), listProducts);
router.delete("/products/:id", auth(["seller"]), deleteProduct);

module.exports = router;