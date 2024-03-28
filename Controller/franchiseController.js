const Franchise = require("../Model/Franchise");

const bcrypt = require("bcrypt");
const fs = require("fs");
const generateAccessToken = require("../Middlewares/generateAccessToken");
const path = require("node:path");
const FranchiseSession = require("../Model/SessionModel/FranchiseSessionSchema");

// Handler function to get all franchises
const getAllFranchises = async (req, res) => {
  //const directoryPath = path.join(__dirname, "../public/FranchiseImages");

  try {
    //const franchises = await Franchise.find().select("-password"); to avoid the password if needed;

    const franchises = await Franchise.find();
    //const imageFiles = fs.readdirSync(directoryPath);
    // const franchiseData = franchises.map((franchise, index) => {
    //   const imageUrl = imageFiles[index] ? `${imageFiles[index]}` : null;
    //   return {
    //     ...franchise.toObject(), // Convert Mongoose document to plain JavaScript object
    //     imageUrl: imageUrl,
    //   };
    // });

    res.json(franchises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler function to create a new franchise
const createFranchise = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const franchise = new Franchise({
      name: req.body.name,
      location: req.body.location,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      imageUrl: req.file ? req.file.filename : null, // Save the filename if file was uploaded
      status: "active",
    });

    const newFranchise = await franchise.save();

    res.status(201).json(newFranchise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Handler function to update a franchise
const updateFranchise = async (req, res) => {
  try {
    const franchiseId = req.params.id;
    const updatedData = req.body;
    const updatedImage = req.file; // Contains the updated image file

    // Find the franchise by ID
    const franchise = await Franchise.findById(franchiseId);
    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    // Update franchise data (excluding image)
    franchise.name = updatedData.name;
    franchise.phoneNumber = updatedData.phoneNumber;
    franchise.location = updatedData.location;
    franchise.password = updatedData.password;

    // Check if a new password is provided and hash it
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      franchise.password = hashedPassword;
    }

    //updation of image in database and folder
    if (updatedImage) {
      // Delete the old image file from the folder
      if (franchise.imageUrl) {
        const imagePath = path.join(
          __dirname,
          "../public/FranchiseImages",
          franchise.imageUrl
        );
        fs.unlinkSync(imagePath);
      }
      franchise.imageUrl = updatedImage.filename;
    }

    // Save the updated franchise data
    await franchise.save();

    res.status(200).json({ message: "Franchise updated successfully" });
  } catch (error) {
    console.error("Error updating franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handler function to delete a franchise
const deleteFranchise = async (req, res) => {
  try {
    const franchiseId = req.params.id;

    // Find the franchise by ID and retrieve the image filename
    const deletedFranchise = await Franchise.findById(franchiseId);

    if (!deletedFranchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    // Retrieve the filename of the image associated with the franchise
    const imageUrl = deletedFranchise.imageUrl;

    // Delete the franchise from MongoDB
    await Franchise.findByIdAndDelete(franchiseId);

    // Delete the image file from the folder
    if (imageUrl) {
      const imagePath = path.join(
        __dirname,
        "../public/FranchiseImages",
        imageUrl
      );
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: "Franchise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockFranchise = async (req, res) => {
  try {
    const franchiseId = req.params.id;

    // Hey new dev, are you here to edit this ? read it before;
    // Update the franchise status to "blocked" in the database
    // This step depends on how your database is structured and how you manage franchise status
    // For example, if you have a field called "status" in your Franchise model, you would update it accordingly
    // Here, I'll assume you're using Mongoose for MongoDB and have a Franchise model
    const updatedFranchise = await Franchise.findByIdAndUpdate(
      franchiseId,
      {
        status: "blocked",
      },
      // Using { new: true } ensure the updatedData contains the document after the update operation is applied.
      { new: true }
    );

    if (!updatedFranchise) {
      return res.status(404).json({ message: "Franchise not found to block" });
    }

    // Send a success response to the client
    res.status(200).json({
      message: `Franchise ${updatedFranchise.name} blocked successfully`,
      franchiseStatus: updatedFranchise.status,
    });
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error blocking franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const unblockFranchise = async (req, res) => {
  try {
    const franchiseId = req.params.id;
    const updatedFranchise = await Franchise.findByIdAndUpdate(
      franchiseId,
      {
        status: "active", // Assuming "active" is the status for an unblocked franchise
      },
      { new: true }
    );

    if (!updatedFranchise) {
      return res
        .status(404)
        .json({ message: "Franchise not found to unblock" });
    }

    // Send a success response to the client
    res.status(200).json({
      message: `Franchise ${updatedFranchise.name} unblocked successfully`,
      franchiseStatus: updatedFranchise.status,
    });
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error unblocking franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Endpoint
const loginFranchise = async (req, res) => {
  try {
    const { franchiseName, password } = req.body;
    // Find the franchise by name
    const franchise = await Franchise.findOne({ name: franchiseName });
    // Check if franchise exists and password is correct
    if (!franchise || !bcrypt.compareSync(password, franchise.password)) {
      console.log("franchise is not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const existingSession = await FranchiseSession.findOne({
      userId: franchise._id,
    });

    if (existingSession) {
      console.log("Franchise is already  used");
      // Franchise is already logged in on another device
      return res
        .status(401)
        .json({ message: "Franchise is already logged In" });
    }

    // Generate access token
    const accessToken = generateAccessToken(franchise);

    // Store session identifier in the database
    await FranchiseSession.create({
      userId: franchise._id,
      accessToken: accessToken,
    });

    const userData = {
      _id: franchise._id,
      name: franchise.name,
      imageUrl: franchise.imageUrl,
      phoneNumber: franchise.phoneNumber,
      location: franchise.location,
      status: franchise.status,
      createdAt: franchise.createdAt,
    };

    // Send token as response
    res.status(200).json({
      token: accessToken,
      franchiseData: userData,
    });
  } catch (error) {
    console.error("Error logging in franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout function for franchise users
const logoutFranchise = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the session associated with the franchise user
    const session = await FranchiseSession.findOneAndDelete({
      userId: userId,
    });
    console.log(session);
    if (!session) {
      // If no session found, return an error response
      return { success: false, message: "Session not found" };
    }

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Franchise logged out successfully" });
  } catch (error) {
    console.error("Error logging out franchise:", error);
    //return { success: false, message: "Internal server error" };
    res.status(401).json({ success: false, message: "Internal server error" });
  }
};

const getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findOne({ _id: req.params.id });

    const userData = {
      _id: franchise._id,
      name: franchise.name,
      imageUrl: franchise.imageUrl,
      phoneNumber: franchise.phoneNumber,
      location: franchise.location,
      status: franchise.status,
      createdAt: franchise.createdAt,
    };

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFranchises,
  createFranchise,
  getFranchiseById,
  updateFranchise,
  deleteFranchise,
  blockFranchise,
  unblockFranchise,
  loginFranchise,
  logoutFranchise,
};
