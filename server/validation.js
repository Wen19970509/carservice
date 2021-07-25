const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const carValidation = (data) => {
  const schema = Joi.object({
    carname: Joi.string().min(0).max(50).required(),
    description: Joi.string().allow(null, ""),
    price: Joi.number().min(10).required(),
    lowestPrice: Joi.number().min(5).required(),
    year: Joi.string().required(),
    mileage: Joi.number().min(1).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.carValidation = carValidation;
