const { updateUser } = require("./updateuser");
const { updateMessage } = require("./updateMessage");
const { newMessage } = require("./newMessage");
const { newGroupMessage } = require("./updateGroupMessage");
const { getOneMessage } = require("./getOneMessage");
const Message = require("../../model/onetoonechat.model");

const User = require("../../model/user.model");

const users = [];
const rooms = [];
const chatSocket = function (io) {
  io.on("connection", (socket) => {
    let _id = socket.id;
    console.log(" user now connect " + _id);

    socket.on("make_connections", async (data, callback) => {
      const { user, messages, groupmessages } = data;
      //console.log(user);
      await updateUser({ user, isOnline: true });
      await updateMessage({
        user: user.id,
        isOnline: true,
      });
      users[_id] = user;
      for (let i = 0; i < messages.length; i++) {
        socket.join(messages[i]._id);
      }
      for (let i = 0; i < groupmessages.length; i++) {
        socket.join(groupmessages[i]._id);
      }
      // if (user && room) {
      //   users[_id] = user;
      //   rooms[_id] = room;
      //   updateUser({ user, isOnline: true });
      //   updateMessage({ user: user.id, room: room._id, isOnline: true });
      //   socket.join(room._id);
      // }
    });

    // socket.on("group-and-room", (data, callback) => {
    //   const { user, group } = data;
    //   // console.log(user, group);
    //   if (user && group) {
    //     socket.join(group._id);
    //   }
    // });

    socket.on("sendMessage", async ({ message, user, room }, callback) => {
      console.log("id" + room._id);
      await newMessage({
        user: user,
        message: message,
        id: room._id,
      });
      const updatedmessage = await Message.findOne({ _id: room._id });
      io.emit("message", {
        message: updatedmessage,
      });
      callback();
    });

    socket.on("groupsendMessage", ({ message, user, grouproom }, callback) => {
      // console.log(message, user, grouproom);
      //newGroupMessage({ user, message, id: grouproom._id });
      io.to(grouproom._id).emit("groupmessage", {
        text: message,
        user: user,
        roomId: grouproom._id,
      });
      callback();
    });

    socket.on("disconnect", () => {
      updateUser({ user: users[_id], isOnline: false });
      if (users[_id] && users[_id].id) {
        updateMessage({ user: users[_id].id, isOnline: false });
      }
      // if (users && rooms) {
      //   updateUser({ user: users[_id], isOnline: false });
      //   updateMessage({
      //     user: users[_id] && users[_id].id,
      //     room: rooms[_id] && rooms[_id]._id,
      //     isOnline: false,
      //   });
      // }

      console.log("disconnect user" + _id);
    });
  });
};

module.exports = {
  chatSocket,
};
