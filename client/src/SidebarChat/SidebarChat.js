import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import { Link } from "react-router-dom";

import "./SidebarChat.css";

function SidebarChat({ isGroup, id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link
      className="sidebarChat_Link"
      to={!isGroup ? `/rooms/${id}` : `/grouprooms/${id}`}
    >
      <div className="sidebarChat">
        <Avatar src={`https://picsum.photos/200/${seed}`} />

        <div className="sidebarChat_info">
          <div className="about">
            <div className="name">
              <h2>{name}</h2>
              <span>5 Year old </span>
            </div>

            <div className="time_stamp">35min ago</div>
          </div>

          <div className="last_message">Last Massage...</div>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
