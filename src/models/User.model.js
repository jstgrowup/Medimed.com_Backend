const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
   firstName: { type: String },
   lastName: { type: String},
   email: { type: String, required: true },
   userid: { type: String },
   password: { type: String, required: true },
   imageURL: String
});
const UserModel = model("user", UserSchema);
module.exports = UserModel;
