require("dotenv").config();
// default imports
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var messageRouter = require("./routes/messages");
var apiRouter = require("./api/api");
var app = express();

// additional packages
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
const dbURI = "mongodb://localhost:27017";
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// routing
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/message", messageRouter);
app.use("/api", apiRouter);

module.exports = app;
