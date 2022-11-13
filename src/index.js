const express = require("express");
const Connect = require("./config/db");
const cors = require("cors");
const ProductRoute = require("./routers/Product.route");
const CartRoute = require("./routers/Cart.route");
const passport = require("./config/GoogleOauth");
const UserModel = require("./models/User.model");
require("dotenv").config();
const redis = require("ioredis");
const redisClient = new redis(process.env.REDIS_KEY);

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/products", ProductRoute);
app.use("/carts", CartRoute);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/redisdata", async (req, res) => {
  try {
    let data = await redisClient.get("userdata");
    data = JSON.parse(data);
    if (!data) res.status(404).send("no user found");
    else {
      res.send(data);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/redisLogout", async (req, res) => {
  const data = await redisClient.del("userdata");
  res.redirect("https://medimed.netlify.app");
});
app.post("/getuser", async (req, res) => {
  const { email } = req.body;
  const data = await UserModel.find({ email: email });
  res.send(data);
});
app.post("/postUserViaForm", async (req, res) => {

 const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const data = await UserModel.create(req.body);
    const val = JSON.stringify(data);
    const redisdata = await redisClient.setex("userdata", 8, val);
    res.send(data);
  }
  res.status(404).send("invalid request");
});
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    const val = JSON.stringify(req.user[0]);
    const data = await redisClient.setex("userdata", 5, val);
    console.log(req.user[0]);
    res.redirect("https://medimed.netlify.app");
  }
);


app.listen(port, async () => {
  await Connect();
  console.log("Server started on port 8080");
});
