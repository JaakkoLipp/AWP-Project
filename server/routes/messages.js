const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const validateToken = require("../auth/validateToken.js");

// @route   POST /message
// @desc    Send a message to a user
// @access  Private
router.post("/", validateToken, async (req, res) => {
  const { recipient, content } = req.body;
  const sender = req.user.id;

  if (!recipient || !content) {
    return res
      .status(400)
      .json({ message: "Recipient and content are required." });
  }

  try {
    const newMessage = new Message({
      sender,
      recipient,
      content,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the message." });
  }
});

// @route   GET /message/:conversationPartnerId
// @desc    Get messages between the current user and the conversation partner
// @access  Private
router.get("/:conversationPartnerId", validateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.conversationPartnerId },
        { sender: req.params.conversationPartnerId, recipient: req.user.id },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
