const Message = require("../../model/onetoonechat.model");

exports.newMessage = async ({ user, message, id }) => {
  await Message.updateOne(
    { _id: id },
    { $push: { messages: { name: user.name, id: user.id, message: message } } }
  );
};
