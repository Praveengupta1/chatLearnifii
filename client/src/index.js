import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App/App";
import dotenv from "dotenv";

//initalize .env file
dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
