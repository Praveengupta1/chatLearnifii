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
  const State = useSelector((state) => state.user);

  const [seed, setSeed] = useState("");

  const { roomId } = useParams();

  const [room, setroom] = useState("");

  const ENDPOINT = "http://localhost:4000/";
  //https://chatlearnifiibypraveen.herokuapp.com/
  const [input, setinput] = useState("");

  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    if (State.groupmessages) {
      let findRoom = State.groupmessages.find(
        (message) => message._id === roomId
      );
      console.log(findRoom);
      setroom(findRoom);
    }
  }, [roomId, room]);

  useEffect(() => {
    socket = io(ENDPOINT);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [user]);
  useEffect(() => {
    if (user && room)
      socket.emit("group-and-room", { user, group: room }, (error) =>
        console.log(error)
      );
  }, [room]);
  useEffect(() => {
    socket.on("groupmessage", (message) => setMessages([...Messages, message]));
    console.log(Messages);
  }, [Messages, room]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    input &&
      socket.emit(
        "groupsendMessage",
        { message: input, grouproom: room, user },
        () => setinput("")
      );
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://picsum.photos/200/${seed}`} />

        <div className="chat_headerInfo">
          <h3>{room && room.name}</h3>
          <p>
            {room.users && room.users.map((user, i) => user.name + " ")}
            {/* {room.users
              ? room.users[0].name && room.users[0].name
              : room.users[1].name && room.users[1].name} */}
          </p>
        </div>

        <div className="chat_headerRight">Dance class</div>
      </div>

      <div className="chat_body">
        {room.messages &&
          room.messages.map(
            (message, i) => (
              //message.roomId === room._id && (
              <p
                key={i}
                className={`chat_massage ${
                  message.id === user.id && "chat_receiver"
                }`}
              >
                <span className="chat_name">
                  {message.name ? message.name : null}
                </span>
                {message.message ? message.message : null}
                <span className="chat_timeStamp">3:53pm</span>
              </p>
            )
            //)
          )}

        {Messages.map(
          (message, i) =>
            message.roomId === room._id && (
              <p
                key={i}
                className={`chat_massage ${
                  message.user.id === user.id && "chat_receiver"
                }`}
              >
                <span className="chat_name">
                  {message.user ? message.user.name : null}
                </span>
                {message.text ? message.text : null}
                <span className="chat_timeStamp">3:53pm</span>
              </p>
            )
          //    <p className={`chat_massage ${message.user !== user.name.trim().toLowerCase() && "chat_receiver"}`}>
          //   <span className="chat_name">Praveeb</span>
          //   Left
          //   <span className="chat_timeStamp">3:53pm</span>
          // </p>
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
