const requestIp = require('request-ip');

exports.ipMiddleware = function (req, res, next) {
    const ip_address = requestIp.getClientIp(req);
    req.ip_address = ip_address;
    next();
};