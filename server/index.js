const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRouter = require("./routes").auth;
const carRoute = require("./routes").car;
const passport = require("passport");
require("./config/passport")(passport);
//connect to mongoDB altlas
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//所有api/user的網址都會進入authRoute,這裏加入/api是為了之後與前端react一同使用
app.use("/api/user", authRouter);
app.use(
  "/api/cars",
  passport.authenticate("jwt", { session: false }),
  carRoute
);
app.get("/", (req, res) => {
  res.send("CarService API");
});
//server side 不能使用port 3000 因為React 本身是運行在port 3000上
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
