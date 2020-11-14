const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const apiRoutes = require("./src/Routes/router");
const { chatSocket } = require("./src/controller/socket/socket");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// apply app middleware
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api routes
app.use("/", apiRoutes);

//socket
chatSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
