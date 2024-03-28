const Franchise = require("../../Model/Franchise");

// Middleware to authenticate franchise users
const authenticateFranchise = async (req, res, next) => {
  try {
    let token;

    // Check if the token is present in the Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];
    } else if (req.body && req.body.token) {
      // If the token is not in the Authorization header, check the request body
      token = req.body.token;
    } else {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Verify the token to ensure its validity
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token contains the franchise user ID
    if (!decodedToken.franchiseId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Optionally, you can fetch the franchise user from the database and attach it to the request
    const franchise = await Franchise.findById(decodedToken.franchiseId);

    if (!franchise) {
      return res.status(404).json({ message: "Franchise user not found" });
    }

    // Attach the franchise user to the request object for further processing
    req.user = franchise;

    // If authentication is successful, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating franchise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticateFranchise;
