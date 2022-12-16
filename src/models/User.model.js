const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageURL: String,
  phnumber: String,
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
