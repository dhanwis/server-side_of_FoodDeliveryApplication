const mongoose = require("mongoose");

const DeliveryBoySchema = new mongoose.Schema({
  boyname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  boylocation: { type: String, required: true },
  boynumber: { type: String, required: true },
  // status: { type: String, required: true }
});

const projects = mongoose.model("deliveryboys", DeliveryBoySchema);

module.exports = projects;
