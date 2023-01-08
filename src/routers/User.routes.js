const express = require("express");

const UserModel = require("../models/User.model");
const app = express.Router();
app.post("/getuser", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await UserModel.findOne({ email: email });
    res.send(data);
  } catch (error) {
    res.status(404).send("User not found");
  }
});
app.post("/postUserViaForm", async (req, res) => {
  console.log("req:", req.body);
  const { phnumber } = req.body;
  try {
    const data = await UserModel.findOne({ phnumber: phnumber });
    if (data) {
      return res.status(404).send({ message: "User Already exists" });
    }
    await UserModel.create(req.body);
    return res.status(200).send({ message: "OK" });
  } catch (error) {
    return res.status(404).send(error);
  }
});
app.post("/google", async (req, res) => {
  const { email, imageURL: image, firstName, lastName } = req.body;
  const data = await UserModel.findOne({ email: email });

  if (data) {
    const { imageURL } = data;
    if (imageURL && imageURL !== image) {
      const data = await UserModel.findOneAndUpdate(
        { email: email },
        { $set: { imageURL: image } }
      );
    }
    res.send(data);
  } else if (!data) {
    const huru = await UserModel.create(req.body);
    res.send(huru);
  } else {
    res.status(404).send("invalid request");
  }
});
app.post("/getViaPhonenumber", async (req, res) => {
  const { phnumber } = req.body;
  let huru = phnumber.trim("").split("").map(Number);
  let arr = huru.slice(3, 13);
  arr = arr.join("");
  try {
    const data = await UserModel.findOne({ phnumber: arr });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("User Doesnt exist");
    }
  } catch (error) {
    res.status(404).send(`${error.message}`);
  }
});


module.exports = app;
