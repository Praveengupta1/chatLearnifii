const express = require("express");
const app = express();
const http = require("http").createServer(app);
const bodyParser = require("body-parser");
const io = require("socket.io")(http);
const cors = require("cors");
const colors = require("./src/colors/colors");
//initalization of dotenv file
require("dotenv").config();

// apply middleware
app.use(bodyParser.json());
app.use(cors());

// scoket connection
const { chatSocket } = require("./src/controller/socket/socket");
chatSocket(io);

// api
const Route = require("./src/Routes/router");

app.use("/api", Route);

// server started
const PORT = process.env.PORT;
http.listen(PORT, () =>
  console.log(colors.info(`server is started at ${PORT}`))
);
