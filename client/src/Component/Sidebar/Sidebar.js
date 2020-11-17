import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import io from "socket.io-client";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import {
  updatemessage,
  updategroupmessage,
} from "../../redux/Action/userAction";
import "./Sidebar.css";
import { BASE_URL } from "../../config/urls";
import ListIcon from "@material-ui/icons/List";
import Chat from "../Chat/Chat";
let socket;
function Sidebar() {
  const State = useSelector((state) => state.chatUser);
  const [messages, setmessages] = useState(State.messages);
  const [groupmessages, setgroupmessages] = useState(State.groupmessages);
  const [user, setuser] = useState(State.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setuser(State.user);
    setmessages(State.messages);
    setgroupmessages(State.groupmessages);
  }, [
    dispatch,
    State.groupmessages,
    State.messages,
    State.user,
    State.loading,
  ]);

  useEffect(() => {
    socket = io(BASE_URL);
  }, [user]);
  useEffect(() => {
    socket.emit(
      "make_connections",
      { user, messages, groupmessages },
      (error) => console.log(error)
    );
    return () => {
      socket.emit("leave", { user });
      socket.emit("disconnect");
      socket.off();
    };
  }, [user, groupmessages, messages]);
  useEffect(() => {
    socket.on("message", (message) => dispatch(updatemessage(message)));
    socket.on("groupmessage", (message) =>
      dispatch(updategroupmessage(message))
    );
  }, [dispatch]);
  const [isChat, setIsChat] = useState(null);

  const handleChat = (id) => setIsChat(id);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <SearchOutlined />
          <input type="text" placeholder="Search Massage or Name" />
          <IconButton>
            <ListIcon />
          </IconButton>
        </div>

        <div className="sidebar_chat">
          {messages &&
            messages.map((message) => (
              <SidebarChat
                key={message._id}
                id={message._id}
                name={
                  message.sender.id === user.id
                    ? message.reciver.name
                    : message.sender.name
                }
                handleChat={handleChat}
              />
            ))}
          {groupmessages &&
            groupmessages.map((message) => (
              <SidebarChat
                key={message._id}
                id={message._id}
                name={message.name}
                handleChat={handleChat}
                isGroup
              />
            ))}
        </div>
      </div>
      {isChat && <Chat roomId={isChat} user={user} socket={socket} />}
    </>
  );
}

export default Sidebar;
