const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js");

// @route   GET api/users
// @desc    Get all users excluding the current user
// @access  Private
router.get("/users", validateToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/likes/:userId
// @desc    Like a user and check for a match
// @access  Private
router.post("/likes/:userId", validateToken, async (req, res) => {
  try {
    const likedUser = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!likedUser || !currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add liked user's ID to the current user's likes
    if (!currentUser.likes.includes(likedUser._id)) {
      currentUser.likes.push(likedUser._id);
      await currentUser.save();
    }

    // Check for a match
    if (likedUser.likes.includes(currentUser._id)) {
      // match
      res.json({ msg: "Match found!" });
    } else {
      res.json({ msg: "User liked." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
