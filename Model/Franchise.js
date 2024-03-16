// Franchise
const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  restaurants: { type: Number },
  location: { type: String },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  status: { type: String },
});

module.exports = mongoose.model("Franchise", franchiseSchema);
