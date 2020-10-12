const Message = require("../../model/onetoonechat.model");

exports.getOneMessage = async ({ id }) => {
  console.log("get id " + id);
  const updatedmessage = await Message.findOne({ _id: id });
  //console.log(updatedmessage);
  return { updatedmessage };
};
