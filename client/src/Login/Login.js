import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { setUser } from "../redux/Action/Action";
import { useDispatch } from "react-redux";

import "./Login.css";

function Login() {
  const [input, setinput] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: uuid(),
      name: input,
    };
    dispatch(setUser(user));
  };
  return (
    <div className="login">
      <div className="login_container">
        <h1>Login Plz</h1>
        <form onSubmit={handleSubmit}>
          <div className="login_form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setinput(e.target.value)}
            />
          </div>
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
