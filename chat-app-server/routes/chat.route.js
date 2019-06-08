const chatController = require("../controller/chat.controller");

module.exports = (app) => {
    app.get("/api/getRecentChat", chatController.getRecentChat);
}