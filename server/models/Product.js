const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0, // Default quantity is 0, can be updated when adding or modifying products
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming a User model exists)
    required: true,
  },
  category: {
    type: String, // You can adjust the data type (e.g., String, Array) based on your needs
    required: true, // Make this field required if every product must have a category
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Additional product-related fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
