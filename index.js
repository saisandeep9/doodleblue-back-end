const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const helmet = require("helmet");

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

app.use("/api", users);
app.use("/api", auth);
app.use("/api", tasks);
// app.use(error);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
