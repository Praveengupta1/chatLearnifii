const Message = require("../../model/onetoonechat.model");

exports.updateMessage = async ({ id, user, isOnline }) => {
  const senderupdated = await Message.updateMany(
    { "sender.id": user },
    { "sender.isOnline": isOnline },
    { new: true }
  );
  const reciverupdated = await Message.updateMany(
    { "reciver.id": user },
    { "reciver.isOnline": isOnline },
    { new: true }
  );
};
