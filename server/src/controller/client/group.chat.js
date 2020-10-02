const User = require("../../model/user.model");
const GroupMessage = require("../../model/groupmessage.model");

exports.groupChat = async (req, res) => {
  try {
    const { users, id, name } = req.body;

    if (!users || !id || !name) {
      throw { message: "data is required " };
    }

    const existsgroup = await GroupMessage.findOne({
      id: id.trim().toLowerCase(),
    });

    if (existsgroup) {
      res.send({
        message: "this groupid is already exists ",
        group: existsgroup,
      });
    } else {
      //validate users
      for (let i = 0; i <= users.length - 1; i++) {
        console.log("users");
        if (!users[i].id || !users[i].name) {
          throw { message: "user data is not complete" };
        }

        let existsuser = await User.findOne({
          id: users[i].id.trim().toLowerCase(),
        });

        if (!existsuser) {
          let newuser = new User({
            id: users[i].id.toLowerCase(),
            name: users[i].name.toLowerCase(),
          });

          await newuser.save();
        }
      }

      //create group
      let newgroup = new GroupMessage({
        id: id.toLowerCase(),
        name: name.toLowerCase(),
      });

      console.log(newgroup);

      await newgroup.save();

      console.log("users group end");
      //update group and users
      for (let i = 0; i <= users.length - 1; i++) {
        console.log(users[i]);
        let updateGroup = await GroupMessage.updateOne(
          { id: id.trim().toLowerCase() },
          {
            $push: {
              users: {
                name: users[i].name.toLowerCase(),
                id: users[i].id.toLowerCase(),
              },
            },
          }
        );
        let updateUser = await User.updateOne(
          { id: users[i].id.trim().toLowerCase() },
          { $push: { groupmessages: { id: newgroup._id } } }
        );
      }

      const group = await GroupMessage.findOne({ id: id.trim().toLowerCase() });
      res.send({ message: "group data ", group: group });
    }
  } catch (e) {
    res.send(e);
  }
};
