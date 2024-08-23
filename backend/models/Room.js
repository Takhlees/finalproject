const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Single', 'Double'],
    required: true
  },
  servantName: String,
  servantContact: String,
  price: {
    type: Number,
    required: true
  },
  image: String,
  description: String,
  status: {
    type: String,
    required: true
  },
  history: [{
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    arrivalDate: Date,
    departureDate: Date,
    personName: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
