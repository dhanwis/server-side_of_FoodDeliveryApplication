const mongoose = require("mongoose");

const franchiseSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Franchise" }, // Reference to Franchise model
  accessToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FranchiseSession = mongoose.model(
  "FranchiseSession",
  franchiseSessionSchema
);

module.exports = FranchiseSession;
