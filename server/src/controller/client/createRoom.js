const Chat = require("../../model/chat.modal");

exports.createRoom = async (req, res) => {
  try {
    const { id, name, roomid, roomname } = req.body;

    if (!id || !name || !roomid || !roomname) {
      throw { message: "id , name, roomid & roomname is required" };
    }

    let existsUser = await Chat.findOne({ id: id });

    if (existsUser) {
      console.log("if user is  exists ");

      const existsRoom = await Chat.findOne({
        id: id,
        rooms: { $elemMatch: { id: roomid } },
      });

      if (existsRoom) {
        console.log("if both  user and room are exists");

        res.send({
          message: "user and rooom already exists",
          chat: existsRoom,
        });
      } else {
        console.log("if user is exists and room is not exists ");

        const chat = await Chat.updateOne(
          { id: id },
          {
            $push: {
              rooms: {
                name: roomname.toLowerCase(),
                id: roomid.toLowerCase(),
                class: req.body.class,
              },
            },
          }
        );

        const chatInfo = await Chat.findOne({ id: id });

        res.send({
          message:
            "user is all ready exists but room is now successfully created ",
          chat: chatInfo,
        });
      }
    } else {
      console.log("if user is not exist ");

      const chat = new Chat({
        name: req.body.name,
        id: req.body.id,
        rooms: [
          {
            name: req.body.roomname,
            id: req.body.roomid,
            class: req.body.class,
          },
        ],
      });

      console.log("new chat");

      await chat.save();

      console.log("saved data ");
      res.send({ message: "user and room is successfully create", chat: chat });
    }
  } catch (e) {
    res.send(e);
  }
};
