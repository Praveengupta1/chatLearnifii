const User = require("../../model/user.model");
const Message = require("../../model/onetoonechat.model");
const GroupMessage = require("../../model/groupmessage.model");
const colors = require("../../colors/colors");

exports.oneChat = async (req, res) => {
  try {
    const { senderid, sendername, recivername, reciverid } = req.body;
    if (!senderid || !sendername || !reciverid || !recivername) {
      throw { message: "sender and reciver is required " };
    }
    let sender = "";
    let reciver = "";
    let messages = [];
    let groupMessges = [];

    sender = await User.findOne({ id: senderid.trim().toLowerCase() });

    if (!sender) {
      console.log("sender data not exists ");
      sender = new User({
        id: senderid.toLowerCase(),
        name: sendername.toLowerCase(),
      });

      await sender.save();
    }

    reciver = await User.findOne({ id: reciverid.trim().toLowerCase() });

    if (!reciver) {
      console.log("reciver data not exists ");
      reciver = new User({
        id: reciverid.toLowerCase(),
        name: recivername.toLowerCase(),
      });

      await reciver.save();
    }

    const senderMessage = await Message.findOne({
      sender: senderid.trim().toLowerCase(),
      reciver: reciverid.trim().toLowerCase(),
    });
    const reciverMessage = await Message.findOne({
      sender: reciverid.trim().toLowerCase(),
      reciver: senderid.trim().toLowerCase(),
    });

    if (!senderMessage && !reciverMessage) {
      const newconversation = new Message({
        sender: senderid.toLowerCase(),
        reciver: reciverid.toLowerCase(),
      });

      await newconversation.save();

      const updatesender = await User.updateOne(
        { id: senderid.trim().toLowerCase() },
        { $push: { messages: { id: newconversation._id } } }
      );

      const updatereciver = await User.updateOne(
        { id: reciverid.trim().toLowerCase() },
        { $push: { messages: { id: newconversation._id } } }
      );
      console.log(updatereciver, updatesender);

      sender = await User.findOne({ id: senderid.trim().toLowerCase() });
      reciver = await User.findOne({ id: reciverid.trim().toLowerCase() });
    }

    if (senderMessage || reciverMessage) {
      console.log(colors.silly("fectching messages "));
      if (sender.messages) {
        console.log(colors.silly("exists messages "));

        for (let i = 0; i <= sender.messages.length - 1; i++) {
          let message = await Message.findOne({ _id: sender.messages[i].id });
          console.log(colors.error(message));
          messages.push(message);
        }
      }

      if (sender.groupmessages) {
        for (let i = 0; i <= sender.groupmessages.length - 1; i++) {
          let groupmessage = await GroupMessage.findOne({
            _id: sender.groupmessages[i].id,
          });
          groupMessges.push(groupmessage);
        }
      }
    }

    res.send({ sender, reciver, messages, groupMessges });
  } catch (e) {
    res.send({ error: e, status: 403 });
  }
};
