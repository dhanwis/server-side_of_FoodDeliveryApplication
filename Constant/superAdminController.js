const Admin = require("../Model/SuperAdmin");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");

const createAdminProfile = async (req, res) => {
  try {
    // Create a new admin profile instance
    const adminProfile = new Admin({
      fname: req.body.fname,
      lname: req.body.lname,
      phoneNumber: req.body.phoneNumber,
      emailID: req.body.emailID,
      country: req.body.country,
      state: req.body.state,
      profileImg: req.file ? req.file.filename : null,
    });

    // Save the new admin profile to the database
    const admin = await adminProfile.save();

    // Respond with a success message and the created admin profile
    res.status(201).json(admin);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(400).json({ message: error.message });
  }
};

// Handler function to update a adminData
const updateAdminProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedImage = req.file; // Contains the updated image file

    // Find the admin profile (assuming there is only one admin)
    const admin = await Franchise.findOne({});

    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    // Update admin data (excluding image)
    admin.name = updatedData.name;
    admin.phoneNumber = updatedData.phoneNumber;
    admin.location = updatedData.location;
    admin.password = updatedData.password;

    // Check if a new password is provided and hash it
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      admin.password = hashedPassword;
    }

    // Updation of image in database and folder
    if (updatedImage) {
      // Delete the old image file from the folder
      if (admin.imageUrl) {
        const imagePath = path.join(
          __dirname,
          "../public/SuperAdminProfileImg",
          admin.imageUrl
        );
        fs.unlinkSync(imagePath);
      }
      admin.imageUrl = updatedImage.filename;
    }

    // Save the updated admin data
    await admin.save();

    res.status(200).json({ message: "Admin profile updated successfully" });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handler function to get admin Data
const getAdminProfile = async (req, res) => {
  try {
    // Fetch all admin profiles from the database
    const adminProfile = await Admin.findOne();

    // Respond with the list of admin profiles
    res.status(200).json(adminProfile);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error fetching admin profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Backend authentication route
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password (you can use any validation library or method)

  // Check if the email and password match with a user in your database
  if (email === "admin@example.com" && password === "password") {
    // Generate a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });

    const adminProfile = await Admin.findOne();
    let uname;

    if (adminProfile) uname = adminProfile.fname + adminProfile.lname;

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "../public/FranchiseImages/1710409488550.jpg",
      name: uname ? uname : "Admin", // and need to set here as if admin.name ? admin.name:'admin'
      email: "admin@example.com",
    };

    // Send the token as a response
    res.status(200).json({ token, user: user });
  } else {
    // If email or password is incorrect, respond with a 401 status code
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  signIn,
  createAdminProfile,
};
