const jwt = require("jsonwebtoken");

const generateAccessToken = (franchise) => {
  // Sign the JWT token with the payload and secret key
  const accessToken = jwt.sign(
    { franchiseId: franchise._id },
    process.env.JWT_SECRET
  );

  return accessToken;
};

module.exports = generateAccessToken;
