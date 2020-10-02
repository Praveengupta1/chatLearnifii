const chatSocket = function (io) {
  io.on("connection", (socket) => {
    console.log(" user now connect ");

    socket.on("user-and-room", (data, callback) => {
      // const { user } = addUser({
      //   id: socket.id,
      //   name: data.user.name,
      //   room: data.room.name,
      // });
      // const welcomeMessage = {
      //   user: user.room,
      //   text: `talk to ${user.room}`,
      //   room: user.room,
      // };
      // socket.emit("message", welcomeMessage);

      // socket.broadcast.to(user.room).emit("message", {
      //   user: user.room,
      //   text: `talk to ${user.room}`,
      //   room: user.room,
      // });

      socket.join(data.room.name);
      callback();
    });
    socket.on("sendMessage", ({ message, id, roomid }, callback) => {
      //console.log(name, room, message);
      //console.log(users);
      //const user = getUser({ name, room });
      //console.log(users, name.trim().toLowerCase(), room.trim().toLowerCase());

      const pushMessage = pushMessage({ id, roomid, message });

      io.to(roomid).emit("message", {
        text: message,
      });
      callback();
    });
    socket.on("disconnect", () => {
      console.log("disconnect user");
    });
  });
};

module.exports = {
  chatSocket,
};
