const mongoose = require("mongoose");

// message Schema, used in messagesPage component. created on message send.
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Mongoose automatic createdAt and updatedAt
  }
);

module.exports = mongoose.model("Message", messageSchema);
