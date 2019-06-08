const { executePgQuery } = require("../dbconnection/postgres");
const { handleError } = require("../utils/helper.util");

const getRecentChat = async (req, res) => {
    try {
        let result = await executePgQuery(`select * from chat_history where user_socket_id = $1 
                                                order by created_on limit 50;`, [req.query.userSocketId]);
        res.send(result.rows);
    } catch (err) {
        handleError(req, res, err.toString());
    }
}

const addChatMessage = async ({ message, user_socket_id, sender_socket_id }) => {
    try {
        await executePgQuery(`insert into chat_history(message, user_socket_id, sent_by) values($1,$2,$3)`, [message, user_socket_id, sender_socket_id]);
    } catch (err) {
        throw new Error(err.toString());
    }
}

exports.getRecentChat = getRecentChat;
exports.addChatMessage = addChatMessage;