const { handleError, encodeText, decodeText } = require("../utils/helper.util");
const { tokenCipherString } = require("../config/keys");
const { executePgQuery } = require("../dbconnection/postgres");

const authenticate = (req, res, next) => {
    try {
        let userId = decodeText(tokenCipherString, req.get("authorization"));
        if (isNaN(userId)) {
            req.statusCode = 401;
            handleError(req, res, "unauthorized", "i");
            return;
        }
        let result = await executePgQuery(`select * from users where user_id = $1`, [userId]);
        if (result.rows.length == 0) {
            req.statusCode = 401;
            handleError(req, res, "unauthorized", "i");
            return;
        }
        req.user = result.rows[0];
        next();
    } catch (err) {
        handleError(req, res, err.toString());
    }
}

exports.authenticate = authenticate;