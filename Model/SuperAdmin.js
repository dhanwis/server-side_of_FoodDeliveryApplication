// SuperAdmin;
const mongoose = require("mongoose");

// const baseSchema = new mongoose.Schema({
//   adminPhoneNumber: { type: String, required: true },
//   adminPassword: { type: String, required: true },
// });

const adminSchema = new mongoose.Schema({
  fname: { type: String, required: false },
  lname: { type: String, required: false },
  adminImg: { type: String, required: false },
  adminPhoneNumber: { type: String, required: false },
  //emailID: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Admin", adminSchema);
