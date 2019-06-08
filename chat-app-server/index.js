const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getIp = require("./middleware/ip.middleware").ipMiddleware;
const { authenticateForWs } = require("./middleware/auth.middleware");

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use((req, res, next) => getIp(req, res, next));

//routes
require("./routes/auth.route")(app);


let connectedUsers = [];
let userSocketId = {};
const nns = io.of("/chat");

nns.on("connection", (socket) => {
    socket.on("status_change", async ({ token, socketListenId, type }) => {
        if (type == "join") {
            await authenticateForWs(token, (data) => {
                if (!data) { console.log("login failed"); }
                else {
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
        io.of('chat').emit('users_list_changed', connectedUsers);
    });
    socket.on("message", (data) => {
        if (userSocketId[data.socketListenId]) socket.broadcast.emit(data.socketListenId, data);
    })
});

http.listen(3501);