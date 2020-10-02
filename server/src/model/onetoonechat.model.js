const mongoose = require("../db/index");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true, unique: true, trim: true },
    reciver: { type: String, required: true, unique: true, trim: true },
    messages: [
      {
        time: { type: Date, default: new Date() },
        name: { type: String, required: true, trim: true },
        id: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
