const Product = require("../models/product");
const path = require("path");

const addProduct = async (req, res) => {
  const { productName, productDescription } = req.body;
  const brands = JSON.parse(req.body.brands || "[]");
  try {
    const brandData = brands.map((brand, i) => ({
      brandName: brand.brandName,
      detail: brand.detail,
      price: brand.price,
      image: req.files[i]?.path,
    }));
    const product = new Product({
      productName,
      productDescription,
      seller: req.user.id,
      brands: brandData,
    });
    const result = await product.save();
    res.status(201).json({ message: "Product added", result });
  } catch (err) {
    res.status(500).json({ message: "Error adding product" });
  }
};

const listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find({ seller: req.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments({ seller: req.user.id })
    ]);
    res.json({ status:true, limit, total, pages: Math.ceil(total/limit), data: items });
  } catch (err) {
    res.status(500).json({ message: "Error adding product" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.seller.toString() !== req.user.id)
    return res.status(403).json({ message: "Product not found" });
  await product.deleteOne();
  res.json({ message: "Product deleted" });
};

module.exports = {
    addProduct,
    listProducts,
    deleteProduct
}