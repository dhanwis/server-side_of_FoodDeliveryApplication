const Franchise = require("../Model/Franchise");
const Restaurant = require("../Model/Restaurant");

// add restaurant
exports.addRestaurant = async (req, res) => {
  const { resname, reslocation, resaddress, resphone, restime } = req.body;
  console.log(req.file);

  //   try {
  //     const existingrestaurant = await restaurantss.findOne({ resphone });
  //     if (existingrestaurant) {
  //       res.status(406).json("restaurant already exists");
  //     } else {
  //       const newrestaurant = new Restaurant({
  //         resname,
  //         reslocation,
  //         resaddress,
  //         resphone,
  //         restime,
  //         resimage,
  //       });
  //       await newrestaurant.save();
  //       res.status(200).json(newrestaurant);
  //     }
  //   } catch (err) {
  //     res.status(401).json(`request failed due to ${err}`);
  //   }

  try {
    const existingRestaurant = await Restaurant.findOne({ resphone });

    if (existingRestaurant) {
      res.status(406).json("Restaurant already exists");
    }

    // Check if the franchise exists
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) {
      throw new Error("Franchise not found");
    }

    // Create the restaurant with the franchise reference
    const newRestaurant = await Restaurant.create({
      franchise: req.params.id,
      ...req.body,
    });

    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

// get restaurant
exports.getallRestaurant = async (req, res) => {
  let franchiseId = req.params.id;
  //   try {
  //     const Restaurants = await Restaurant.findById(req.params.id);
  //     res.status(200).json(Restaurants);
  //   } catch (err) {
  //     res.status(401).json(`request failed due to ${err}`);
  //   }

  try {
    // Check if the franchise exists
    const franchise = await Franchise.findById(franchiseId);
    if (!franchise) {
      throw new Error("Franchise not found");
    }

    // Fetch restaurants associated with the franchise
    const Restaurants = await Restaurant.find({ franchise: franchiseId });

    res.status(200).json(Restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// edit restaurant
exports.editRestaurant = async (req, res) => {
  const { id } = req.params;
  // const userid=req.payload

  const { resname, reslocation, resaddress, resphone, restime, resimage } =
    req.body;
  const uploadedrestaurantimage = req.file ? req.file.filename : resimage;

  try {
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      { _id: id },
      {
        resname,
        reslocation,
        resaddress,
        resphone,
        restime,
        resimage: uploadedrestaurantimage,
      },
      { new: true }
    );

    await updateRestaurant.save();
    res.status(200).json(updateRestaurant);
  } catch (err) {
    res.status(401).json(err);
  }
};
