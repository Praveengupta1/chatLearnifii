const Message = require("../../model/onetoonechat.model");

exports.updateMessage = async ({ user, room, isOnline }) => {
  const sendermessage = await Message.findOne({ _id: room, "sender.id": user });
  if (sendermessage) {
    await Message.updateOne({ _id: room }, { "sender.isOnline": isOnline });
  } else {
    await Message.updateOne({ _id: room }, { "reciver.isOnline": isOnline });
  }
};
