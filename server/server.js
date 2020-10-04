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

//app.set('view engine', 'ejs')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static('public'));

//api routes
app.use("/", apiRoutes);

//this routes is only for test

//socket
chatSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
