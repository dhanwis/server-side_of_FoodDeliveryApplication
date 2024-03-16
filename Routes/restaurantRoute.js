const express = require("express");
const router = express.Router();

// middleware using ;

router.get("/restaurantsData", (req, res) => {
  res.send("helo");
});

router.post("/addRestaurants", (req, res) => {
  console.log(req.body);
});

module.exports = router;
