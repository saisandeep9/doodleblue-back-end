const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const helmet = require("helmet");
const socketIo = require("socket.io");

//connecting to the Data base
mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

//add a middle ware
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet());
require("express-async-errors");

const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const tes = require("./routes/tes");

app.use("/api", users);
app.use("/api", auth);
app.use("/api", tasks);
app.use("/api", tes);
// app.use(error);
// app.use(error);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

const io = socketIo(server);
let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date().toLocaleDateString();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = server;
