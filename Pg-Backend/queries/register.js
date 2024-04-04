const createAccount =
  "INSERT INTO users (username, emailid, password, role) VALUES ($1, $2, $3, $4)";
const getUserName = "SELECT username FROM users WHERE username = $1";
const getEmailId = "SELECT emailid FROM users WHERE emailid = $1";

module.exports = {
  createAccount,
  getUserName,
  getEmailId,
};
