const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
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
  location: {
    address: String,
    city: String,
    district: String,
    postalCode: String,
  },
  type: {
    type: String,
    enum: ['house', 'apartment', 'land', 'commercial'],
    required: true,
  },
  bedrooms: Number,
  bathrooms: Number,
  area: {
    type: Number,
    description: 'Area in square meters',
  },
  images: [String],
  amenities: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sellerPhone: {
    type: String,
    description: 'Seller phone number',
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'under-review'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', propertySchema);
