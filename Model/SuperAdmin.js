// SuperAdmin;
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  profileImg: { type: String },
  emailID: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
