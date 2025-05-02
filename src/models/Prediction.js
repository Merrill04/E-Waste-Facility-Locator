import mongoose from 'mongoose';

// Define prediction schema
const predictionSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true
  },
  deviceCategory: {
    type: String,
    required: true
  },
  deviceCondition: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  predictedValue: {
    type: Number,
    required: true
  },
  predictionConfidence: {
    type: Number,
    default: 0.85
  },
  userEmail: {
    type: String,
    default: null
  },
  userId: {
    type: String,
    default: null
  },
  deviceImage: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model is already defined to prevent overwriting during hot reloading
const Prediction = mongoose.models.Prediction || mongoose.model('Prediction', predictionSchema);

export default Prediction; 