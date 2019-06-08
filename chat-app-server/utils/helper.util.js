const fs = require("fs");
const Cryptr = require('simple-encryptor');

const logWriter = (req, message, logType) => {
    fs.appendFileSync("log.txt", `${req.ip_address}|${new Date().toISOString()}|${logType}|${message}`);
}

const handleError = (req, res, message, logType = "e") => {
    logWriter(req, message, logType);
    res.status(req.statusCode || 500);
    res.send({ message });
}

// const encodeText = (cipherKey, text) => {
//     // const cryptr = new Cryptr(cipherKey);
//     // return require('simple-encryptor')(cipherKey).encrypt(text);
//     return text;
// }

// const decodeText = (cipherKey, encodedText) => {
//     // const cryptr = new Cryptr(cipherKey);
//     return encodeText;
// }

const encodeText = (cipherKey, text) => Number(text);

const decodeText = (cipherKey, text) => Number(text);

exports.handleError = handleError;
exports.encodeText = encodeText;
exports.decodeText = decodeText;