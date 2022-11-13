const express = require("express");
require("dotenv").config();
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

const app = express.Router();
const mainSecretKey = process.env.MAIN_SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

app.post("/login", async (req, res) => {
   const { email, password } = req.body;
   const user = await UserModel.findOne({ email, password });

   if (!user) {
      return res.status(401).send("Invalid Credential. ");
   }

   const mainToken = jwt.sign(
      { id: user._id, email: user.email },
      mainSecretKey,
      { expiresIn: "1 hour" }
   );

   const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      refreshSecretKey,
      { expiresIn: "7 days" }
   );

   res.send({ mainToken, refreshToken });
});

app.post("/refresh", async (req, res) => {
   const refreshToken = req.headers.token;

   try {
      const data = jwt.verify(refreshToken, refreshSecretKey);
      const mainToken = jwt.sign(
         { id: data.id, email: data.email },
         mainSecretKey,
         { expiresIn: "1 hour" }
      );

      res.send({ mainToken });
   } catch (e) {
      console.log(e.message);
      res.status(401).send("invalid token");
   }
});

app.get("/:id", async (req, res) => {
   const { id } = req.params;

   const mainToken = req.headers.token;

   if (!mainToken) res.status(401).send("unauthorized");

   try {
      jwt.verify(mainToken, mainSecretKey);
      const user = await UserModel.findById(id);
      res.send(user);
   } catch (e) {
      console.log(e.message);
      res.status(401).send("invalid token");
   }
});

module.exports = app;
