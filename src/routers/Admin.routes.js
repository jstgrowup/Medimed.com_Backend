const express = require("express");
const app = express.Router();
const AdminModel = require("../models/Admin.model");
const UserModel = require("../models/User.model");
const ProductModel = require("../models/Product.model");

app.get("/", (req, res) => {
  res.send("welcome admin backend ");
});

// admin create Internel use Only
app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let ExistingUser = await AdminModel.findOne({ email });
    if (ExistingUser) {
      return res.status(401).send({
        message: "email id already exist",
        place: "admin create existing check",
      });
    } else {
      try {
        let admin = await AdminModel.create({ name, email, password });

        res.send({
          message: "admin created successfully",
        });
      } catch (e) {
        res.status(500).send({
          message: e.message,
          place: "admin create",
        });
      }
    }
  } catch (e) {
    return res.status(500).send({
      message: "something went wrong",
      place: "admin create existing check",
    });
  }
});

// get all user
app.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find();
    res.send(users);
  } catch (e) {
    res.status(500).send({
      message: "problem facing when geting users",
      place: "admin get users",
    });
  }
});

// remove user
app.post("/users/remove", async (req, res) => {
  let { id } = req.body;

  try {
    let users = await UserModel.findByIdAndDelete(id);
    console.log(users);
    res.send({
      message: "user removed",
    });
  } catch (e) {
    res.status(500).send({
      message: "problem facing when remove users",
      place: "admin remove users",
    });
  }
});

//Products

// get all products
app.get("/products", async (req, res) => {
  try {
    let products = await ProductModel.find();
    res.send(products);
  } catch (e) {
    res.status(500).send({
      message: "problem facing when geting products",
      place: "admin get products",
    });
  }
});

// product create
app.post("/products/create", async (req, res) => {
  const { url, off, title, mkt, price, Fprice } = req.body;
  try {
    let product = await ProductModel.create({
      url,
      off,
      title,
      mkt,
      price,
      Fprice,
    });

    res.send({
      message: "product create successfully",
    });
  } catch (e) {
    res.status(501).send({
      message: "problem facing when create product",
      place: "admin create product",
    });
  }
});

// remove product
app.post("/products/remove", async (req, res) => {
  let { id } = req.body;

  try {
    let product = await ProductModel.findByIdAndDelete(id);

    res.send({
      message: "product removed",
    });
  } catch (e) {
    res.status(500).send({
      message: "problem facing when remove product",
      place: "admin remove product",
    });
  }
});

module.exports = app;
