const { Client } = require("pg");
const { pgConnectionString } = require("../config/keys");
let connection;

const getPgconnection = () => {
    if (!connection) {
        connection = new Client({ connectionString: pgConnectionString });
        connection.connect();
    }
    return connection;
}

const executePgQuery = async (query, params) => {
    let client = getPgconnection();
    let result = await client.query(query, params);
    return result;
}

exports.getPgconnection = getPgconnection;
exports.executePgQuery = executePgQuery;