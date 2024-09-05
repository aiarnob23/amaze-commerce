const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
  images: [String],
  color: [String],
  brand: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  tags: [String],
  stock: {
    type: Number,
    required: true,
  },
  about: {
    type: [String],
    required:true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [
    {
      user: String,
      comment: String,
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  displayImage: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model('Product', productSchema);