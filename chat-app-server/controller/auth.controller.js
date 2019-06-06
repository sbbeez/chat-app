const { executePgQuery } = require("../dbconnection/postgres");
const { handleError, encodeText } = require("../utils/helper.util");
const { tokenCipherString } = require("../config/keys");

const login = async (req, res) => {
    try {
        let result = await executePgQuery(`select * from users where email_id = $1`, [req.body.email_id]);
        if (result.rows.length == 0) {
            req.statusCode = 404;
            handleError(req, res, "User not Found", "w");
            return;
        }
        if (result.rows[0].password != req.body.password) {
            req.statusCode = 401;
            handleError(req, res, "Incorrect username/password", "w");
            return;
        }
        let token = encodeText(tokenCipherString, result.rows[0].user_id.toString());
        res.send({ token });
    } catch (err) {
        handleError(req, res, err.toString());
    }
}

const signUp = (req, res) => { }


exports.login = login;
exports.signUp = signUp;