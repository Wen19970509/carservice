const router = require("express").Router();
const Car = require("../models").carModel;
const carValidation = require("../validation").carValidation;
//middleWare
router.use((req, res, next) => {
  console.log("A request is coming in to carRoute");
  next();
});

//get
router.get("/", (req, res) => {
  Car.find({})
    .then((cars) => {
      res.send(cars);
    })
    .catch(() => {
      res.status(500).send("Error!! Can not get Cars");
    });
});

//getByID
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Car.findOne({ _id })
    .then((d) => {
      res.send(d);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});
//search
router.get("/search/:name", (req, res) => {
  let { name } = req.params;
  let newName = new RegExp(name);
  Car.find({ carname: { $regex: newName, $options: "i" } })
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
//post new car
router.post("/", async (req, res) => {
  //validate the input before making a new course
  const { error } = carValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { carname, mileage, price, lowestPrice, description, year } = req.body;
  let newCar = new Car({
    carname,
    mileage,
    price,
    lowestPrice,
    description,
    year,
  });

  try {
    await newCar.save();
    res.status(200).send("New Car has been saved");
  } catch (err) {
    console.log(err);
    res.status(400).send("Can not saved new car");
  }
});

//patch
router.patch("/:_id", async (req, res) => {
  let { _id } = req.params;
  let car = await Car.findOne({ _id });

  if (!car) {
    res.status(404);
    return res.json({
      success: false,
      message: "This Car not found.",
    });
  } else {
    Car.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Car updated!");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  }
});

//delete
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let car = await Car.findOne({ _id });
  if (!car) {
    res.status(404);
    return res.json({
      success: false,
      message: "Car not found.",
    });
  }
  Car.deleteOne({ _id })
    .then(() => {
      res.send("Car deleted!");
    })
    .catch((e) => {
      res.send({
        success: false,
        message: e,
      });
    });
});

module.exports = router;
