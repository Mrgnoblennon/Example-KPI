const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who placed the order
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the product included in the order
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // You can add more fields related to each product in the order if needed
    },
  ],
  // Additional order-related fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
