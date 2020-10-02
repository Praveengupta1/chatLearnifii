const { oneChat, groupChat, getUser } = require("../controller/client/index");

const Route = require("express").Router();

Route.post("/create", oneChat);
Route.post("/groupcreate", groupChat);
Route.get("/user", getUser);

module.exports = Route;
