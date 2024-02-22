const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validateToken = require("../auth/validateToken.js");

// @route   GET api/users
// @desc    Get all users and their desc excluding the current user
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
router.patch("/edit-description", validateToken, async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description is required." });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { description },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

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

// @route   POST api/likes/
// @desc    Like a user and check for a match
// @access  Private
router.post("/likes", validateToken, async (req, res) => {
  const likerId = req.user.id;
  const { likedUserId } = req.body;

  if (!likedUserId) {
    return res.status(400).json({ message: "Liked user ID is required." });
  }

  try {
    // Add likedUserId to the liker's likes array if not already liked
    await User.findByIdAndUpdate(
      likerId,
      { $addToSet: { likes: likedUserId } },
      { new: true }
    );

    // if the userToBeLiked has liked the liker back == match
    const userToBeLiked = await User.findById(likedUserId);
    const isMatch =
      userToBeLiked.likes && userToBeLiked.likes.includes(likerId);

    if (isMatch) {
      // Update both users' matched list
      await User.findByIdAndUpdate(
        likerId,
        { $addToSet: { matches: likedUserId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        likedUserId,
        { $addToSet: { matches: likerId } },
        { new: true }
      );

      res.json({ message: "It's a match!", isMatch: true });
    } else {
      res.json({ message: "User liked successfully.", isMatch: false });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating likes." });
  }
});

// @route   GET api/matches
// @desc    Get matched user objects.
// @access  Private
router.get("/matches", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const matchedUsers = await User.find({ _id: { $in: user.matches } });

    res.json({ matches: matchedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the user's description.",
    });
  }
});

module.exports = router;
