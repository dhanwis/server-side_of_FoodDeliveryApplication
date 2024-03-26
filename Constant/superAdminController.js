const Admin = require("../Model/SuperAdmin");
const fs = require("fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");

// Backend authentication route
const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "password") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    //await newAdmin.save();
    return res.status(200).json({ token: token });
  } else {
    // If the credentials don't match, send an error response
    return res.status(401).json({ error: "Invalid credentials" });
  }
};
const create_or_updateAdminProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedImage = req.file; // Contains the updated image file

    // Find the existing admin
    let currentAdmin = await Admin.findOne();

    if (currentAdmin) {
      // Update admin data
      currentAdmin.fname = updatedData.fname;
      currentAdmin.lname = updatedData.lname;
      currentAdmin.adminPhoneNumber = updatedData.adminPhoneNumber;

      // Update admin image if provided
      if (updatedImage) {
        // Delete the old image file from the folder
        if (currentAdmin.adminImg) {
          const imagePath = path.join(
            __dirname,
            "../public/SuperAdminProfileImg",
            currentAdmin.adminImg
          );
          fs.unlinkSync(imagePath);
        }
        currentAdmin.adminImg = updatedImage.filename;
      }

      // Save the updated admin data
      currentAdmin = await currentAdmin.save();

      res.status(200).json({ adminData: currentAdmin });
    } else {
      // Create a new admin if none exists
      const newAdmin = new Admin({
        fname: updatedData.fname,
        lname: updatedData.lname,
        adminPhoneNumber: updatedData.adminPhoneNumber,
        adminImg: updatedImage ? updatedImage.filename : null,
      });

      await newAdmin.save();

      res.status(201).json({ adminData: newAdmin });
    }
  } catch (error) {
    console.error("Error creating or updating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const createOrUpdateAdminProfile = async (req, res) => {
//   try {
//     // Check if an admin already exists
//     const existingAdmin = await Admin.findOne();

//     if (existingAdmin) {
//       // Update existing admin data
//       const updatedAdmin = await Admin.findByIdAndUpdate(
//         existingAdmin._id,
//         req.body, // Use the request body as the updated data
//         { new: true }
//       );
//       res.status(200).json(updatedAdmin); // Send the updated admin object to the frontend
//     } else {
//       // Create a new admin
//       const newAdmin = new Admin({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         adminPhoneNumber: req.body.adminPhoneNumber,
//         adminImg: req.file ? req.file.filename : null,
//       });

//       const savedAdmin = await newAdmin.save();
//       res.status(201).json(savedAdmin); // Send the newly created admin object to the frontend
//     }
//   } catch (error) {
//     console.error("Error creating or updating admin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
const getAdminProfile = async (req, res) => {
  try {
    // Execute the query to retrieve admin data
    let admin = await Admin.findOne().exec();

    // Return the admin data in the response
    res.status(200).json(admin);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create_or_updateAdminProfile,
  signIn,
  getAdminProfile,
};
