const mongoose = require("../db/index");

const groupMessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    id: { type: String, trim: true, unique: true, required: true },
    users: [
      {
        name: { type: String, trim: true },
        id: { type: String, trim: true },
      },
    ],
    messages: [
      {
        time: { type: Date, default: new Date() },
        name: { type: String, required: true, trim: true },
        id: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

module.exports = GroupMessage;
