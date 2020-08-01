const express = require("express");
const app = express();
const _ = require("lodash");
const auth = require("../middleware/auth");

const { Task, validate } = require("../models/task");
const { User } = require("../models/user");

app.get("/tasks", auth, async (req, res) => {
  const task = await Task.find();

  res.send(task);
});

app.get("/tasks/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
});

app.post("/tasks", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select("-password");

  task = await new Task(_.pick(req.body, ["taskName"]));

  task.userName = user.name;
  await task.save();

  res.send(task);
});

app.put("/tasks/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(req.params.id, {
    taskName: req.body.taskName,
    editTime: Date.now(),
  });
  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

app.delete("/tasks/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = app;
