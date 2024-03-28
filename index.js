const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const franchiseRouter = require("./Routes/franchiseRoute");
const superAdminRouter = require("./Routes/superAdminRoute");
const deliveryboyrouter=require('./Routes/deliveryBoyRoute')
const restaurantrouter=require('./Routes/restaurantRoute')


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
app.use("/Images", express.static(path.join(__dirname, "./public/Images")));
app.use("/proimage", express.static(path.join(__dirname, "./public/proimage")));


app.use(franchiseRouter);
app.use(superAdminRouter);

app.use(deliveryboyrouter)
app.use(restaurantrouter)

// app.use('/uploads',express.static('./uploads'))




//Mongoose Setup
const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGO_URL, {
  dbName: "FoodDeliveryApp",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
