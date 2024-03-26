// SuperAdmin;
const mongoose = require("mongoose");

// const baseSchema = new mongoose.Schema({
//   adminPhoneNumber: { type: String, required: true },
//   adminPassword: { type: String, required: true },
// });

const adminSchema = new mongoose.Schema({
  fname: { type: String, required: false },
  lname: { type: String, required: false },
  //password: { type: String },
  //emailID: { type: String },
  adminImg: { type: String, required: false },
  adminPhoneNumber: { type: String, required: false },
});

module.exports = mongoose.model("Admin", adminSchema);
