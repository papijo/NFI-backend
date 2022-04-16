//Imports
const config = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

//Route Imports
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Database Connection
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful!!!!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

//Route Handlers
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//Module Export
module.exports = app;
