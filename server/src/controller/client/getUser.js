const User = require("../../model/user.model");
const Message = require("../../model/onetoonechat.model");
const GroupMessage = require("../../model/groupmessage.model");
const colors = require("../../colors/colors");

exports.getUser = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name } = req.body;

    if (!id || !name) {
      throw { error: "user id is not exists" };
    }
    let user = await User.findOne({ id: id });
    if (!user) {
      user = new User({
        name: name.toLowerCase(),
        id: id.toLowerCase(),
      });
      await user.save();
    }

    let messages = [];
    let groupmessages = [];
    if (user.messages) {
      for (let i = 0; i <= user.messages.length - 1; i++) {
        if (user.messages[i].id) {
          let message = await Message.findOne({ _id: user.messages[i].id });
          messages.push(message);
        }
      }
    }

    if (user.groupmessages) {
      for (let i = 0; i <= user.groupmessages.length - 1; i++) {
        if (user.groupmessages[i].id) {
          let groupmessage = await GroupMessage.findOne({
            _id: user.groupmessages[i].id,
          });
          groupmessages.push(groupmessage);
        }
      }
    }
    res.send({ user, messages, groupmessages });
  } catch (e) {
    res.send({ e, statuscode: 403 });
  }
};
