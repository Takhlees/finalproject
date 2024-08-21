const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomNo: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double'],
    required: true
  },
  servantName: String,
  servantContact: String,
  pricePerDay: {
    type: Number,
    required: true
  },
  image: String,
  description: String,
  availabilityStatus: {
    type: Boolean,
    default: true
  },
  history: [{
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    },
    arrivalDate: Date,
    departureDate: Date,
    personName: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
