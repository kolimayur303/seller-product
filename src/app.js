const express = require("express");
const app = express();
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const buyerRoutes = require("./routes/buyerRoute");

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/buy", buyerRoutes);

module.exports = app;
