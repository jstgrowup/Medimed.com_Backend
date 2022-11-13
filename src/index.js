const express = require("express");
const Connect = require("./config/db");
const cors = require("cors");
const ProductRoute = require("./routers/Product.route");
const CartRoute = require("./routers/Cart.route");
const UserModel = require("./models/User.model");
require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/products", ProductRoute);
app.use("/carts", CartRoute);
app.post("/getuser", async (req, res) => {
  const { userid } = req.body;
  if (userid) {
    const data = await UserModel.findOne({ userid: userid });
    res.send(data);
  }
  else {
    res.status(400).send({
      message: "Please provide a userid"
    });
  }
});
app.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;


  if (email, password) {
    try {
      const data = await UserModel.findOne({ email: email, password: password });
      if (!data) {
        return res.status(404).send("no")
      }

      res.send(data);

    } catch (error) {
      res.status(500).send("wrong credentials");
    }
  }
  else {
    res.status(400).send({
      message: "Please provide a userid"
    });
  }
});
app.post("/postUserViaForm", async (req, res) => {
  const { userid } = req.body;
  if (userid) {
    const data = await UserModel.create(req.body);
    res.send(data);
  }
  else {
    res.status(400).send("invalid userid");
  }
});
app.listen(port, async () => {
  await Connect();
  console.log("Server started on port 8080");
});
