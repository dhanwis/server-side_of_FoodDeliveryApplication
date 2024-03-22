const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    resname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reslocation: { type: String, required: true },
  resaddress: { type: String, required: true },
  resphone: { type: String, required: true },
  restime: { type: String, required: true },
  resimage: { type: String, }


});

const projects=mongoose.model
("restaurants",RestaurantSchema)

module.exports=projects

