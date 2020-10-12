const {
  oneChat,
  groupChat,
  getUser,
  getMessagebyId,
} = require("../controller/client/index");

const Route = require("express").Router();

Route.post("/create", oneChat);
Route.post("/groupcreate", groupChat);
Route.post("/user", getUser);
Route.get("/message/:id", getMessagebyId);
module.exports = Route;
