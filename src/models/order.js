const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  brandName:   { type: String, required: true },
  unitPrice:   { type: Number, required: true },
  quantity:    { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true, min: 0 },
  status:      { type: String, enum: ['SUCCESS','FAILED'], default: 'SUCCESS' }
},{
    versionKey: false, 
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
