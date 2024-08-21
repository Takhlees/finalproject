const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  cnic: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salary: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
