const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const validateToken = require("../auth/validateToken.js");

// @route   POST api/messages
// @desc    Send a message to a user
// @access  Private
router.post("/", validateToken, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    let message = new Message({
      sender: req.user.id,
      recipient,
      content,
    });
    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/messages/:conversationPartnerId
// @desc    Get messages between the current user and the conversation partner
// @access  Private
router.get("/:conversationPartnerId", validateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.conversationPartnerId },
        { sender: req.params.conversationPartnerId, recipient: req.user.id },
      ],
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
