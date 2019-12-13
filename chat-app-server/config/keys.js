module.exports = {
  pgConnectionString: `postgresql://postgres:1234567890@${process.env.DB_HOST || "localhost"}:5432/chatapp`,
  tokenCipherString: "Chat App Server JWT-SAMPLE using node.js crypto module"
};
