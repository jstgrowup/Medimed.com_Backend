const mongoose = require("mongoose");

require("dotenv").config();
const url = process.env.MONGO_URI;

const connect = () => {
   return mongoose.connect(url);
};

module.exports = connect;
