const express = require("express");
const Connect = require("./config/db");
const cors = require("cors");
const ProductRoute = require("./routers/Product.route");
const CartRoute = require("./routers/Cart.route");
const SearchRoute = require("./routers/Search.route");
const PaymentRoute = require("./routers/Payment.route");
const AdminRoute = require("./routers/Admin.routes");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();
const userRoute = require("./routers/User.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors()
);
app.use("/products", ProductRoute);
app.use("/carts", CartRoute);
app.use("/admin", AdminRoute);
app.use("/auth", userRoute);
app.use("/search", SearchRoute);
app.use("/payment", PaymentRoute);
app.get("/", (req, res) => {
  res.send("<h1>All Good Ready to integrate</h1>");
});
app.listen(port, async () => {
  await Connect();
  console.log("Server started on port 8080");
});
