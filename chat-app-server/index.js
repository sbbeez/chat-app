const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getIp = require("./middleware/ip.middleware").ipMiddleware;

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use((req, res, next) => getIp(req, res, next));

//routes
require("./routes/auth.route")(app);

app.listen(9090);