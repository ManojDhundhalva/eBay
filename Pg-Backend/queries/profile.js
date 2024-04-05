const getProfileByUserId = "SELECT u.id, u.username, u.emailid, u.role, up.firstname, up.lastname FROM users AS u JOIN user_profile AS up ON u.id = $1";
const updateProfileByUserId = "";

module.exports = {
  getProfileByUserId,
  updateProfileByUserId,
};
