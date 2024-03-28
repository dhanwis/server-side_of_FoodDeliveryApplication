const express = require("express");


const deliveryboyController = require("../Controller/deliveryController");

const path = require("node:path");


const multer = require("multer");


const router=new express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/deliveryboyimages/");
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
  
  

  router.post(
    "/deliveryboys/adddeliveryboy",
    upload.single("devimage"),
    deliveryboyController.addboyys
  );


// get delivery boy
router.get('/deliveryboys/getboy',deliveryboyController.getdeliveryboy)


// update delivery boy
router.put('/deliveryboys/updateboy/:id',upload.single('devimage'),deliveryboyController.updatedeliveryboy)



// delete deliveryboy
router.delete('/deliveryboys/remove/:id',deliveryboyController.deletedeliveryboy)


// block and unblock
router.put("/deliveryboys/block-deliveryboy/:id", deliveryboyController.blockDeliveryboy);
router.put("/deliveryboys/unblock-deliveryboy/:id", deliveryboyController.unblockDeliveryboy);




module.exports=router















module.exports = router;
