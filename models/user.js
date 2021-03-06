const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1050,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 6,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("Users", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).trim().required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(350).required(),
    gender: Joi.string().min(4).max(5).required(),
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
