const Admin = require("../Model/SuperAdmin");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");

// Backend authentication route
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "password") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });

    // Send back the token in the response
    return res.status(200).json({ token });
  } else {
    // If the credentials don't match, send an error response
    return res.status(401).json({ error: "Invalid credentials" });
  }
};

const createAdminProfile = async (req, res) => {
  try {
    // Create a new admin profile instance
    const adminProfile = new Admin({
      fname: req.body.fname,
      lname: req.body.lname,
      phoneNumber: req.body.phoneNumber,
      adminImg: req.file ? req.file.filename : null,
    });

    const admin = await adminProfile.save();
    res.status(201).json(admin);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ message: error.message });
  }
};

const updateAdminProfile = (req, res) => {
  console.log(req.body);
  console.log(req.file);
};

// try {
//   // Find the existing admin profile
//   const admin = await Admin.findOne({ emailID: req.user.email });
//   const updatedImage = req.file; // Contains the updated image file

//   if (!admin) {
//     return res.status(404).json({ message: "Admin profile not found" });
//   }

//   // Update admin profile fields with new data
//   admin.fname = req.body.fname || admin.fname;
//   admin.lname = req.body.lname || admin.lname;
//   admin.phoneNumber = req.body.phoneNumber || admin.phoneNumber;
//   admin.emailID = req.body.emailID || admin.emailID;

//   if (updatedImage) {
//     // Delete the old image file from the folder
//     if (admin.adminImg) {
//       const imagePath = path.join(
//         __dirname,
//         "../public/SuperAdminProfileImg",
//         admin.adminImg
//       );
//       fs.unlinkSync(imagePath);
//     }
//     admin.adminImg = updatedImage.filename;
//   }

//   // Save the updated admin profile
//   const updatedAdmin = await admin.save();

//   // Return the updated admin profile
//   res.status(200).json(updatedAdmin);
// } catch (error) {
//   // If an error occurs, respond with an error message
//   res.status(400).json({ message: error.message });
// }

// Handler function to get admin Data
// const getAdminProfile = async (req, res) => {
//   try {
//     // Fetch all admin profiles from the database
//     const adminProfile = await Admin.findOne();
//     console.log(adminProfile);

//     // Respond with the list of admin profiles
//     res.status(200).json(adminProfile);
//   } catch (error) {
//     // If an error occurs, respond with an error message
//     console.error("Error fetching admin profiles:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

module.exports = {
  //getAdminProfile,
  createAdminProfile,
  updateAdminProfile,
  signIn,
};
