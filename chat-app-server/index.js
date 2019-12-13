const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getIp = require("./middleware/ip.middleware").ipMiddleware;
const { authenticateForWs } = require("./middleware/auth.middleware");
const { addChatMessage } = require("./controller/chat.controller");
const { executePgQuery } = require("./dbconnection/postgres");

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use((req, res, next) => getIp(req, res, next));

//routes
require("./routes/auth.route")(app);
require("./routes/chat.route")(app);
app.get("/health-check", (req, res) => {
  res.send("app-started-and-working");
});
app.get("/db-health-check", async (req, res) => {
  try {
    let dbRes = await executePgQuery("select 1");
    res.send(dbRes);
  } catch (err) {
    res.send(err.toString());
  }
});

let connectedUsers = [];
let userSocketId = {};
const nns = io.of("/chat");

nns.on("connection", socket => {
  socket.on("status_change", async ({ token, socketListenId, type }) => {
    if (type == "join") {
      await authenticateForWs(token, data => {
        if (!data) {
          console.log("login failed");
        } else {
          if (!userSocketId[socketListenId]) {
            data.socketListenId = socketListenId;
            connectedUsers.push(data);
          }
          userSocketId[socketListenId] = socketListenId;
        }
      });
    } else if (type == "leave") {
      let removeUserIndex;
      connectedUsers.forEach((s, i) => {
        if (s.socketListenId == socketListenId) {
          removeUserIndex = i;
          delete userSocketId[s.socketListenId];
        }
      });
      connectedUsers.splice(removeUserIndex, 1);
    }
    io.of("chat").emit("users_list_changed", connectedUsers);
  });
  socket.on("message", async data => {
    if (userSocketId[data.socketListenId])
      socket.broadcast.emit(data.socketListenId, data);
    await addChatMessage({
      message: data.message,
      user_socket_id: `user_${[
        data.socketListenId.split("_")[1],
        data.senderSocketId.split("_")[1]
      ]
        .sort()
        .join("_user_")}`,
      sender_socket_id: data.socketListenId
    });
  });
});

http.listen(3502);
