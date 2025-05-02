import mongoose from 'mongoose';

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pincode: {
    type: String,
    required: [true, 'PIN code is required']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time slot is required']
  },
  itemDetails: {
    type: String,
    required: [true, 'Item details are required']
  },
  specificRequirements: {
    type: String,
    required: [true, 'Special requirements are required']
  },
  // Prediction data fields
  predictionData: {
    deviceName: {
      type: String,
      default: null
    },
    predictedValue: {
      type: Number,
      default: null
    },
    deviceCategory: {
      type: String,
      default: null
    },
    deviceCondition: {
      type: String,
      default: null
    },
    originalPrice: {
      type: Number,
      default: null
    },
    predictionConfidence: {
      type: Number,
      default: null
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Check if the model is already defined to prevent overwriting during hot reloading
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking; 