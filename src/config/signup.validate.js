const joi = require("joi");

const phone = require("joi-phone-number");
const signupvalidate = (data) => {
  console.log('data:', data)
  const schema = joi.object({
    firstName: joi.string().required().label("first name"),
    lastName: joi.string().required().label("last name"),
    email: joi.string().email().label("Email"),
    imageURL: joi.string().required().label("Image"),
    phnumber: phone.string().phoneNumber().validate(data.phnumber),
  });
  return schema.validate(data);
};
module.exports = signupvalidate;
