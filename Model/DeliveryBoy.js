const mongoose = require("mongoose");

const DeliveryBoySchema = new mongoose.Schema({
  boyname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  boylocation: { type: String, required: true },
  boynumber: { type: String, required: true },
<<<<<<< HEAD
  devimage:{type:String},
   status: { type: String }

=======
  // status: { type: String, required: true }
>>>>>>> b4b72fa257aea2b3c4c6df062134610775d32663
});

const projects = mongoose.model("deliveryboys", DeliveryBoySchema);

module.exports = projects;
