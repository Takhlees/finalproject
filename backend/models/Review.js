const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
   required:true
  },
 
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
