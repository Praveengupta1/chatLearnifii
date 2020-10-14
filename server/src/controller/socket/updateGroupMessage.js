const GroupMessage = require("../../model/groupmessage.model");

exports.newGroupMessage = async ({ user, message, id }) => {
  if (user && message) {
    let newGroupMessage = await GroupMessage.updateOne(
      { _id: id },
      {
        $push: {
          messages: {
            name: user.name.toLowerCase(),
            id: user.id.toLowerCase(),
            message: message,
            time: new Date(),
          },
        },
      }
    );
  }
};
