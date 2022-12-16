const express = require("express");
const app = express.Router();
const ProductModel = require("../models/Product.model");
app.get("/search", async (req, res) => {
  try {
    const { title } = req.query;

    const agg = [
      {
        $search: {
          autocomplete: {
            query: title,
            path: "title",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $limit: 8,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          url: 1,
        },
      },
    ];
    const arr = await ProductModel.aggregate(agg);

    res.json(arr);
  } catch (error) {}
});
module.exports = app;
