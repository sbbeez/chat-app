const auth = require("../controller/auth.controller");

module.exports = (app) => {
    app.get("/api/login", auth.login);
}