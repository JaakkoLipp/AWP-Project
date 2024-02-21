const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js");

// @route   GET api/users
// @desc    Get all users excluding the current user
// @access  Private
router.get("/users", validateToken, async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.user.id } },
      { username: 1, description: 1 }
    );
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/description
// @desc    Get the user's own description
// @access  Private
router.get("/description", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ description: user.description });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the user's description.",
    });
  }
});

// @route   PATCH api/edit-description
// @desc    Allows user to edits its own description
// @access  Private
router.patch("/edit-description", authenticateToken, async (req, res) => {
  const { description } = req.body;

  // Ensure description is provided
  if (!description) {
    return res.status(400).json({ message: "Description is required." });
  }

  try {
    // Assuming req.user.id holds the authenticated user's ID
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { description },
      { new: true }
    );

    // If the user is not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with the updated user information (without sensitive fields)
    res.json({
      message: "Description updated successfully.",
      description: updatedUser.description,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the description." });
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
