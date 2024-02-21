var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");

// @route   POST /users/login
// @desc    post login info, username, password, check and login existing user
// @access  Public
router.post(
  "/login",
  body("username").trim().escape(),
  body("password"),
  (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(403).json({ message: "Login failed" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          // improved error handling
          if (err) {
            return res.status(500).json({ message: "Server error" });
          }
          if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
          }
          if (isMatch) {
            const jwtPayload = {
              id: user._id,
              username: user.username,
            };
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 10 * 60,
              },
              (err, token) => {
                res.status(200).json({ success: true, token });
              }
            );
          }
        });
      }
    });
  }
);

// @route   POST /users/register
// @desc    post register info, username, password, check and regsiter new user
// @access  Public
router.post(
  "/register",
  body("username").isLength({ min: 3 }).trim().escape(),
  body("password").isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (user) {
        return res.status(403).json({ username: "Username already in use." });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.create(
              {
                username: req.body.username,
                password: hash,
              },
              (err, ok) => {
                if (err) throw err;
                return res.status(200).json({ success: true });
              }
            );
          });
        });
      }
    });
  }
);

module.exports = router;
