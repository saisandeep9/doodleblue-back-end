const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");

// const jwt = require("jsonwebtoken");

//Task name , creation timestamp, edit timestamp, expiry, completion status, created
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    minlength: 5,
    maxlength: 50,

    trim: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
  editTime: {
    type: Date,
    default: Date.now,
  },
  expiry: {
    type: Date,
    default: Date.now,
  },

  iscompleted: Boolean,
});

const Task = mongoose.model("tasks", taskSchema);

function validatetask(task) {
  const schema = {
    taskName: Joi.string().min(5).max(50).trim().required(),
    userName: Joi,
    entryTime: Joi,
    editTime: Joi,
    expiry: Joi,
  };
  return Joi.validate(task, schema);
}

module.exports.Task = Task;
module.exports.validate = validatetask;
