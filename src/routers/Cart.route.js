const express = require("express");
const CartModel = require("../models/Cart.model");

const app = express.Router();

// ,{
//     headers:{userid:"636d1da8f6cde62d954b2473"}
//   }
//auth
const authMiddleware = (req, res, next) => {
  let userId = req.headers.userid;

  if (userId) {
    req.userId = userId;
    next();
  } else {
    return res.status(401).send("user not authorise");
  }
};

//middlewares
app.use(authMiddleware);

///routes
app.get("/", async (req, res) => {
  let data = await CartModel.find({ userId: req.userId }).populate([
    "userId",
    "productId",
  ]);

  return res.send(data);
});

app.post("/create", async (req, res) => {
  let { productId, quantity } = req.body;
  let userId = req.userId;

  let existingcartItems = await CartModel.findOne({ userId, productId });

  if (existingcartItems) {
    // update if exist
    try {
      let update = await CartModel.findByIdAndUpdate(existingcartItems._id, {
        $set: { quantity: existingcartItems.quantity + 1 },
      });
      // let updatedData=await CartModel.findById(existingcartItems.id)
      return res.send({
        message: "item added successfully",
      });
    } catch (e) {
      return res.status(401).send(e.message);
    }
  } else {
    // create id not exist
    try {
      let data = await CartModel.create({ productId, quantity, userId });
      return res.send({
        message: "item created successfully",
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
});

// patch
app.post("/update", async (req, res) => {
  let { type, productId } = req.body;
  let userId = req.headers.userid;
  // console.log(type,productId,userId)
  // console.log(123456)
  let existingcartItems = await CartModel.findOne({ userId, productId });
  try {
    if (type === "dec") {
      let updatedData = await CartModel.findByIdAndUpdate(
        existingcartItems._id,
        { $set: { quantity: existingcartItems.quantity - 1 } }
      );
      // console.log(existingcartItems);
      res.send({
        message: "item qty decremented",
      });
    } else {
      let updatedData = await CartModel.findByIdAndUpdate(
        existingcartItems._id,
        { $set: { quantity: existingcartItems.quantity + 1 } }
      );

      return res.send({
        message: "item qty incremented",
      });
    }
  } catch (e) {
    return res.status(500).send("something went wrong");
  }
});

// remove route
app.post("/remove", async (req, res) => {
  let { productId } = req.body;
  let userId = req.headers.userid;
  // console.log(type,productId,userId)

  let existingcartItems = await CartModel.findOne({ userId, productId });
  // console.log(existingcartItems);
  if (existingcartItems) {
    try {
      await CartModel.findByIdAndDelete(existingcartItems._id);
      return res.send("item deleted from cart");
    } catch {
      return res.status(500).send(e.message);
    }
  } else {
    return res.status(500).send("something went wrong");
  }
});

module.exports = app;
