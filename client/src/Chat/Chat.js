import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import "./Chat.css";

let socket;
function Chat({ user }) {
  const rooms = useSelector((state) => state.rooms.rooms);

  const [seed, setSeed] = useState("");

  const { roomId } = useParams();
  const [room, setroom] = useState("");

  const ENDPOINT = "https://chatlearnifiibypraveen.herokuapp.com/";

  const [input, setinput] = useState("");

  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    const roomInfo = rooms.filter((room) => room.id == roomId);
    setroom(roomInfo[0]);
    console.log(room);
  }, [roomId, user, room]);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (user && room)
      socket.emit("user-and-room", { user, room }, (error) =>
        console.log(error)
      );
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [user, room]);

  useEffect(() => {
    socket.on("message", (message) => setMessages([...Messages, message]));
    console.log(Messages);
  }, [Messages, room]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    input &&
      socket.emit(
        "sendMessage",
        { message: input, room: room.name, name: user.name },
        () => setinput("")
      );
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://picsum.photos/200/${seed}`} />

        <div className="chat_headerInfo">
          <h3>{room ? room.name : ""}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">Dance class</div>
      </div>

      <div className="chat_body">
        {Messages.map(
          (message, i) =>
            message.room === room.name.trim().toLowerCase() && (
              <p
                key={i}
                className={`chat_massage ${
                  message.user === user.name.trim().toLowerCase() &&
                  "chat_receiver"
                }`}
              >
                <span className="chat_name">
                  {message.user ? message.user : null}
                </span>
                {message.text ? message.text : null}
                <span className="chat_timeStamp">3:53pm</span>
              </p>
              //    <p className={`chat_massage ${message.user !== user.name.trim().toLowerCase() && "chat_receiver"}`}>
              //   <span className="chat_name">Praveeb</span>
              //   Left
              //   <span className="chat_timeStamp">3:53pm</span>
              // </p>
            )
        )}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(event) => setinput(event.target.value)}
            placeholder="Type a massage"
            type="text"
          />
          <button type="submit" onClick={handleSendMessage}>
            Send Massage
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
