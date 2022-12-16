const express = require("express");
const passport = require("passport");
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
  const { phnumber } = req.body;
  const data = await UserModel.findOne({ phnumber: phnumber });

  if (data) {
    res.status(404).send("User Already exists");
  } else if (!data) {
    const huru = await UserModel.create(req.body);
    res.send(huru);
  } else {
    res.status(404).send("invalid request");
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
// router.get("/", (req, res, next) => {
//   res.render("login");
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/auth" }),
//   function (req, res) {
//     res.send("nice bruh");
//     // res.redirect("http://localhost:5173/login");
//   }
// );

// router.get("/logout", (req, res, next) => {
//   req.logout();
//   res.redirect("/auth");
// });

module.exports = app;
