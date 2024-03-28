const express = require("express");
const router = express.Router();
const franchiseController = require("../Controller/franchiseController");
const path = require("node:path");
const authenticateFranchise = require("../Middlewares/authenticationMiddlewares/authenticateFranchise");

// Image Uploader setup;
const multer = require("multer");

// Multer configuration for file uploads
// Storing the image with franchise ID as part of the filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/FranchiseImages/");
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

//getting all franchise data
router.get("/allFranchiseData", franchiseController.getAllFranchises);
//creating new franchise
router.post(
  "/addFranchise",
  upload.single("image"),
  franchiseController.createFranchise
);

//franchise by ID
router.get("/franchiseDataBy/:id", franchiseController.getFranchiseById);
//franchise update
router.put("/:id", upload.single("image"), franchiseController.updateFranchise);

//block && unblock
router.put("/block-franchise/:id", franchiseController.blockFranchise);
router.put("/unblock-franchise/:id", franchiseController.unblockFranchise);

//delete franchise By ID
router.delete("/:id", franchiseController.deleteFranchise);

//login & logout
router.post("/auth/login", franchiseController.loginFranchise);
router.post("/auth/logout", franchiseController.logoutFranchise);

module.exports = router;
