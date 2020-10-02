const mongoose = require("../db/index");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    id: { type: String, trim: true, required: true, unique: true },
    isOnline: { type: Boolean, trim: true, default: false },
    class: { type: String, trim: true },
    age: { type: Number },
    isvender: { type: Boolean },

    messages: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
      },
    ],

    groupmessages: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
