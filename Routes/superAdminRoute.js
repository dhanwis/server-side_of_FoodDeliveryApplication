const express = require("express");
const router = express.Router();
const path = require("node:path");
const adminController = require("../Constant/superAdminController");

// Image Uploader setup;
const multer = require("multer");

// Multer configuration for file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/SuperAdminProfileImg/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilterConfig = function (req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
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

router.post("/signIn", adminController.signIn);

router.get("/getAdminProfile", adminController.getAdminProfile);

router.post(
  "/create_or_updateAdminProfile",
  upload.single("adminImg"),
  adminController.create_or_updateAdminProfile
);

module.exports = router;
