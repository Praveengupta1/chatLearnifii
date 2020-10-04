const User = require("../../model/user.model");

exports.updateUser = async ({ user, isOnline }) => {
  if (user) {
    const updateUser = await User.updateOne(
      { id: user.id },
      { isOnline: isOnline }
    );
  }
};
