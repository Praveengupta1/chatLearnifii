import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";

import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";

import ListIcon from "@material-ui/icons/List";

function Sidebar() {
  const State = useSelector((state) => state.user);
  const [messages, setmessages] = useState([]);
  const [groupmessages, setgroupmessages] = useState([]);
  const [user, setuser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setuser(State.user);
    setmessages(State.messages);
    setgroupmessages(State.groupmessages);
  }, [dispatch, State.loading]);

  return (
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
            />
          ))}
        {groupmessages &&
          groupmessages.map((message) => (
            <SidebarChat
              key={message._id}
              id={message._id}
              name={message.name}
              isGroup
            />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
