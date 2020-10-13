import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import "./Chat.css";
import { updatemessage } from "../../redux/Action/userAction";
import { handletime , handleDate} from "../../config/utils";
let socket;
function Chat({ user }) {
  const dispatch = useDispatch();
  const [seed, setSeed] = useState("");

  const { roomId } = useParams();

  const [room, setroom] = useState("");

  const ENDPOINT = "http://localhost:4000/";
  //https://chatlearnifiibypraveen.herokuapp.com/
  const [input, setinput] = useState("");

  const [Messages, setMessages] = useState([]);
  const State = useSelector((state) => state.user);

  let index = State.messages.findIndex((mess) => mess._id === roomId);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    console.log(State.messages);

    if (State.messages) {
      let findRoom = State.messages.find((message) => message._id === roomId);
      console.log(findRoom);
      setroom(findRoom);
    }
  }, [roomId, user, State.messages[index].messages.length]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [user]);

  useEffect(() => {
    socket.on("message", (message) => dispatch(updatemessage(message)));
  }, [Messages, room]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    input &&
      socket.emit("sendMessage", { message: input, room, user }, () =>
        setinput("")
      );
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://picsum.photos/200/${seed}`} />

        <div className="chat_headerInfo">
          <h3>
            {user.id === (room.sender && room.sender.id)
              ? room.reciver && room.reciver.name
              : room.sender && room.sender.name}
          </h3>
          <p>
            {user.id === (room.sender && room.sender.id)
              ? room.reciver && room.reciver.isOnline
                ? "Online"
                : "Offline"
              : room.sender && room.sender.isOnline
              ? "Online"
              : "Offline"}
          </p>
        </div>

        <div className="chat_headerRight">Dance class</div>
      </div>

      <div className="chat_body">
        {room.messages &&
          room.messages.map(
            (message, i) => (
              //message.roomId === room._id && (
            <>
              <p className="message_date">{handleDate(message.time) }</p>
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
            </>
            )
            //)
          )}

        {Messages.map(
          (message, i) =>
            message.roomId === room._id && (
              <p
                key={i}
                className={`chat_massage ${
                  message.userId === user.id && "chat_receiver"
                }`}
              >
                <span className="chat_name">
                  {message.user ? message.user : null}
                </span>
                {message.text ? message.text : null}
                <span className="chat_timeStamp">
                  {handletime(message.time)}
                </span>
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
