const { updateUser } = require("./updateuser");
const { updateMessage } = require("./updateMessage");
const { newMessage } = require("./newMessage");
const { newGroupMessage } = require("./updateGroupMessage");

const users = [];
const rooms = [];

const chatSocket = function (io) {
  io.on("connection", (socket) => {
    const _id = socket.id;
    console.log(" user now connect " + _id);

    socket.on("user-and-room", (data, callback) => {
      const { user, room } = data;
      if (!user || !room) {
        callback({ error: "send me user or room" });
      }
      if (user && room) {
        users[_id] = user;
        rooms[_id] = room;
        updateUser({ user, isOnline: true });
        updateMessage({ user: user.id, room: room._id, isOnline: true });
        socket.join(room._id);
      }
    });

    socket.on("group-and-room", (data, callback) => {
      const { user, group } = data;
      // console.log(user, group);
      if (user && group) {
        socket.join(group._id);
      }
    });

    socket.on("sendMessage", ({ message, user, room }, callback) => {
      // console.log(message, room, user);
      newMessage({ user: user, message: message, id: room._id });
      io.to(room._id).emit("message", {
        text: message,
        userId: user.id,
        roomId: room._id,
      });
      callback();
    });

    socket.on("groupsendMessage", ({ message, user, grouproom }, callback) => {
      // console.log(message, user, grouproom);
      newGroupMessage({ user, message, id: grouproom._id });
      io.to(grouproom._id).emit("groupmessage", {
        text: message,
        user: user,
        roomId: grouproom._id,
      });
      callback();
    });

    socket.on("disconnect", () => {
      if (users && rooms) {
        updateUser({ user: users[_id], isOnline: false });
        updateMessage({
          user: users[_id] && users[_id].id,
          room: rooms[_id] && rooms[_id]._id,
          isOnline: false,
        });
      }

      console.log("disconnect user" + _id);
    });
  });
};

module.exports = {
  chatSocket,
};
