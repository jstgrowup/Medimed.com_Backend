const express = require("express");

const app = express.Router();
app.post("/order", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt#1",
    });
    return res
      .status(201)
      .send({ message: "Successful", order: order, amount: amount });
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
});
module.exports =app