import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";

import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
import { getRoom } from "../redux/Action/Action";
import ListIcon from "@material-ui/icons/List";

function Sidebar() {
  const loading = useSelector((state) => state.rooms.loading);

  const rooms = useSelector((state) => state.rooms.rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoom());
  }, [dispatch, loading]);

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
        {rooms.map((room, i) => (
          <SidebarChat key={i} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
