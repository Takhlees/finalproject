const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'User'
  },
  bookingHistory: [{
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    },
    arrivalDate: Date,
    departureDate: Date,
    numberOfAdults: Number,
    numberOfChildren: Number,
    totalPrice: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

