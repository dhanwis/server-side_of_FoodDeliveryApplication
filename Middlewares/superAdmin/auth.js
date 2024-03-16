const jwt = require("jsonwebtoken");
const Adimin = require("../../Model/SuperAdmin"); // Example User model

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user associated with the token
    const admin = await Adimin.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further use in route handlers
    req.user = admin;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
