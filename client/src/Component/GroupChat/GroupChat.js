import React, { useState, useEffect, Fragment } from "react";
import { Avatar } from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import "./Chat.css";
import { BASE_URL } from "../../config/urls";
import { handletime, handleDate } from "../../config/utils";

let socket;
function Chat({ user }) {
  const State = useSelector((state) => state.user);

  const [seed, setSeed] = useState("");

  const { roomId } = useParams();

  const [room, setroom] = useState("");

  //https://chatlearnifiibypraveen.herokuapp.com/
  const [input, setinput] = useState("");

  let index = State.groupmessages.findIndex((mess) => mess._id === roomId);
  let length =
    State.groupmessages[index].messages.length &&
    State.groupmessages[index].messages.length;

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    if (State.groupmessages) {
      let findRoom = State.groupmessages.find(
        (message) => message._id === roomId
      );

      setroom(findRoom);
    }
  }, [roomId, room, State.groupmessages, length, user]);

  useEffect(() => {
    socket = io(BASE_URL);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [user]);

  // useEffect(() => {
  //   socket.on("groupmessage", (message) =>
  //     dispatch(updategroupmessage(message))
  //   );
  // }, [dispatch, room]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    input &&
      socket.emit(
        "groupsendMessage",
        { message: input, grouproom: room, user },
        () => setinput("")
      );
  };
  var messageBody = document.querySelector("#chat_body");

  useEffect(() => {
    if (messageBody && messageBody.scrollHeight && messageBody.clientHeight)
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
  }, [messageBody, length]);
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

      <div className="chat_body" id="chat_body">
        {room.messages &&
          room.messages.map((message, i) => (
            //message.roomId === room._id && (
            <Fragment key={i}>
              <p className="message_date">{handleDate(message.time)}</p>
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
                <span className="chat_timeStamp">
                  {handletime(message.time)}
                </span>
              </p>
            </Fragment>
          ))}
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
