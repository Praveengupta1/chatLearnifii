import React, { useState } from "react";
import { loginUser } from "../../redux/Action/userAction";

import { useDispatch } from "react-redux";

import "./Login.css";

function Login() {
  const [input, setinput] = useState("");
  const [name, setname] = useState("Login");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setname("Plz.. wait ");
    const user = {
      id: input,
    };
    dispatch(loginUser(user));
  };
  return (
    <div className="login">
      <div className="login_container">
        <h1>Login Plz</h1>
        <form onSubmit={handleSubmit}>
          <div className="login_form">
            <label htmlFor="name">ID</label>
            <input
              placeholder="Enter your id "
              type="text"
              name="name"
              required
              onChange={(e) => setinput(e.target.value)}
            />
          </div>
          <button type="submit">{name}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
