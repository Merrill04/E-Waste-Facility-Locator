const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  modelName: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currentState: {
    type: String,
    required: true
  },
  depreciationFactor: {
    type: Number,
    required: true
  },
  ownershipType: {
    type: String,
    required: true
  },
  materialComposition: {
    type: String,
    required: true
  },
  environmentalImpactRating: {
    type: String,
    required: true
  },
  recyclingProcessComplexity: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema); 