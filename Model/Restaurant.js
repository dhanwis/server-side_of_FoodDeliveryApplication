const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  franchise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Franchise',
    required: true
  },
  resname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reslocation: { type: String, required: true },
  resaddress: { type: String, required: true },
  resphone: { type: String, required: true },
  restime: { type: String, required: true },
  resimage: { type: String },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
