const Message = require("../../model/onetoonechat.model");

exports.getMessagebyId = async (req, res) => {
  try {
    const { id } = req.body;
  } catch (error) {
    res.send({ error, statuscode: 403 });
  }
};
