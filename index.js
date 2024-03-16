const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const franchiseRouter = require("./Routes/franchiseRoute");
const superAdminRouter = require("./Routes/superAdminRoute");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const path = require("node:path");

// Configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// using Routes
app.use(express.static("public"));
//app.use("/Images", express.static(path.join(__dirname, "./public/Images")));

app.use(franchiseRouter);
app.use(superAdminRouter);

//Mongoose Setup
const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "FoodDeliveryApp",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
