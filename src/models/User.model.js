const { model, Schema } = require("mongoose");
const validator = require("validator");
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  imageURL: String,
  phnumber: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        console.log("value:", value);
        throw new Error("Invalid Phone Number");
      }
      if (
        value.length < 10 &&
        (value.charAt(0) !== "9" ||
          value.charAt(0) !== "8" ||
          value.charAt(0) !== "7" ||
          value.charAt(0) !== "6")
      ) {
        throw new Error("Invalid Phone Number");
      }
    },
  },
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
