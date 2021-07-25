const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  carname: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lowestPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Car", carSchema);
