const Message = require("../../model/onetoonechat.model");

exports.getMessagebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    console.log(message);
    res.send({ message });
  } catch (error) {
    res.send({ error, statuscode: 403 });
  }
};
