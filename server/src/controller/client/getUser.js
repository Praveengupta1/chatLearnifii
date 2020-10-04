const User = require("../../model/user.model");
const Message = require("../../model/onetoonechat.model");
const GroupMessage = require("../../model/groupmessage.model");
const colors = require("../../colors/colors");

exports.getUser = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;

    if (!id) {
      throw { error: "user id is not exists" };
    }
    const user = await User.findOne({ id: id });

    let messages = [];
    let groupmessages = [];
    if (user.messages) {
      for (let i = 0; i <= user.messages.length - 1; i++) {
        let message = await Message.findOne({ _id: user.messages[i].id });
        messages.push(message);
      }
    }

    if (user.groupmessages) {
      for (let i = 0; i <= user.groupmessages.length - 1; i++) {
        let groupmessage = await GroupMessage.findOne({
          _id: user.groupmessages[i].id,
        });
        groupmessages.push(groupmessage);
      }
    }
    res.send({ user, messages, groupmessages });
  } catch (e) {
    res.send({ e, statuscode: 403 });
  }
};
