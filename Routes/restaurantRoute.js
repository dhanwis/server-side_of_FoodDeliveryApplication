const express = require("express");


const restaurantcontroller = require("../Controller/restaurantcontroller");

const path = require("node:path");
// const multerconfig = require('../Middlewares/multerMiddleware')
const router=new express.Router()

const multer = require("multer");

// Multer configuration for file uploads
// Storing the image with franchise ID as part of the filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/restaurantimages/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilterConfig = function (req, file, cb) {
  // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  // }
  const filetypes = /jpeg|jpg|png|gif|tiff|bmp|svg|webp|heif|psd|ai|eps/
  ;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

// Initialize multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, //means maximum file size 2mb;
  fileFilter: fileFilterConfig,
});



// add restaurant
router.post(
  "/restaurants/addrestaurant",
  upload.single("resimage"),
  restaurantcontroller.addRestaurant
);


// get restaurant
router.get('/restaurants/getrestaurant',restaurantcontroller.getallRestaurant)

// edit restaurant
router.put('/restaurants/update/:id',upload.single('resimage'),restaurantcontroller.editRestaurant)



module.exports=router
