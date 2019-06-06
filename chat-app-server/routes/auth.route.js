const authController = require("../controller/auth.controller");

module.exports = (app) => {
    app.post("/api/login", authController.login);
}