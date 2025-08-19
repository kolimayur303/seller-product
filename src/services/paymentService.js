const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');
const user = require('../models/user');

async function handlePayment({ buyerId, productId, brandName, quantity }) {
  // 1. Start a MongoDB session
  const session = await mongoose.startSession();
  session.startTransaction(); // Begin the transaction

  try {
    // 2. Fetch buyer and product inside the transaction
    const buyer = await user.findById(buyerId).session(session);
    const product = await Product.findById(productId).session(session);

    if (!buyer) throw new Error('Buyer not found');
    if (!product) throw new Error('Product not found');
    if (!Array.isArray(product.brands) || product.brands.length === 0) 
      throw new Error('Product has no brands');

    // 3. Find the requested brand within product
    const brand = product.brands.find(b => b.brandName === brandName);
    if (!brand) throw new Error('Brand not found for this product');

    const qty = Number(quantity || 1);
    if (qty < 1) throw new Error('Quantity must be at least 1');

    const unitPrice = Number(brand.price);
    const totalAmount = unitPrice * qty;

    // 4. Check buyer balance
    if (Number(buyer.balance) < totalAmount) 
      throw new Error('Insufficient balance');

    // 5. Deduct money from buyer's wallet
    buyer.balance = Number(buyer.balance) - totalAmount;
    await buyer.save({ session });  // save inside transaction

    // 6. Create an order record (proof of payment)
    const order = await Order.create([{
      buyerId,
      productId,
      brandName,
      unitPrice,
      quantity: qty,
      totalAmount,
      status: 'SUCCESS'
    }], { session });

    // 7. If everything is successful → commit the transaction
    await session.commitTransaction();
    session.endSession();

    return { success:true, order: order[0] };
  } catch (err) {
    console.log(err, "fblfublaufblubsdub");
    // 8. If any step fails → rollback changes
    await session.abortTransaction();
    session.endSession();
    return { success:false, message: err.message };
  }
}

module.exports = { handlePayment };
