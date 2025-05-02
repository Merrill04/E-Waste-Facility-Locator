import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Make userId optional
  
  facilityName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  modelName: {
    type: String,
    required: false
  },
  modelType: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  currentState: {
    type: String,
    required: false
  },
  depreciationFactor: {
    type: Number,
    required: false
  },
  ownershipType: {
    type: String,
    required: false
  },
  materialComposition: {
    type: String,
    required: false
  },
  environmentalImpactRating: {
    type: String,
    required: false
  },
  recyclingProcessComplexity: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;