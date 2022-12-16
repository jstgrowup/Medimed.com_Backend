const express = require("express");
const ProductModel = require("../models/Product.model");
const app = express.Router();

app.get("/", async (req, res) => {
  let data = await ProductModel.find();

  res.send(data);
});

app.get("/single/:id", async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  try {
    let data = await ProductModel.findById(id);
    res.send(data);
  } catch (e) {
    res.status(500).send("something went wrong");
  }
});

app.post("/create", async (req, res) => {
  let body = req.body;
  // console.log(body);
  try {
    let data = await ProductModel.create(body);
    return res.send(data);
  } catch (e) {
    return res.status(401).send(e);
  }
});

module.exports = app;
