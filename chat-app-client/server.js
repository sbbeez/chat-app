const express = require('express');
const path = require('path');
const compression = require("compression");
const app = express();
app.use(compression());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(3502);