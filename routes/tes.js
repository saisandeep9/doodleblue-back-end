const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = app;
