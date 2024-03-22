// Franchise
const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("Franchise", franchiseSchema);
