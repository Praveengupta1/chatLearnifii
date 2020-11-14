import React from "react";
import Sidebar from "../Component/Sidebar/Sidebar";
import Chat from "../Component/Chat/Chat";
import GroupChat from "../Component/GroupChat/GroupChat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Component/Login/Login";
import { useSelector } from "react-redux";

import "./App.css";

const App = () => {
  const user = useSelector((state) => state.chatUser.user);

  return user ? (
    <div className="app">
      <div className="app_body">
        <Router>
          <Sidebar />

          <Switch>
            <Route path="/rooms/:roomId">
              <Chat user={user} />
            </Route>
            <Route path="/grouprooms/:roomId">
              <GroupChat user={user} />
            </Route>
            <Route path="/">
              <h1>create room</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default App;
