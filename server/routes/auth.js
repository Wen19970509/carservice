const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

//middleware
router.use((req, res, next) => {
  console.log("A request is coming in to auth route");
  next();
});

//for test api
router.get("/testAPI", (req, res) => {
  res.send("Test api is working");
});

//register
router.post("/register", async (req, res) => {
  //check validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此電子信箱已被註冊");

  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success!",
      savedObject: savedUser,
    });
  } catch (err) {
    res.status(400).send("User not saved");
  }
});

//get user
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  User.findOne({ _id })
    .then((d) => {
      res.send(d);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});
//login
router.post("/login", (req, res) => {
  //check validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("User not found!");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user.id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          console.log(err);
          res.status(401).send("Wrong password!");
        }
      });
    }
  });
});
module.exports = router;
