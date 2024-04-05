const getProfileByUserIdOfUser =
  "SELECT u.id, u.username, u.emailid, u.role, up.firstname, up.lastname FROM users AS u LEFT JOIN user_profile AS up ON u.id = up.user_profile_id WHERE u.id = $1";
const getProfileByUserIdOfManager =
  "SELECT u.id, u.username, u.emailid, u.role, up.firstname, up.lastname FROM users AS u JOIN manager_profile AS up ON u.id = up.manager_profile_id WHERE u.id = $1";
const getProfileByUserIdOfShipper =
  "SELECT u.id, u.username, u.emailid, u.role, up.firstname, up.lastname FROM users AS u JOIN shipper_profile AS up ON u.id = up.shipper_profile_id WHERE u.id = $1";

const ifExistUserIdOfUser =
  "SELECT user_profile_id from user_profile WHERE user_profile_id = $1";
const ifExistUserIdOfManager =
  "SELECT manager_profile_id from manager_profile WHERE manager_profile_id = $1";
const ifExistUserIdOfShipper =
  "SELECT shipper_profile_id from shipper_profile WHERE shipper_profile_id = $1";

const insertProfileDataOfUser =
  "INSERT INTO user_profile (user_profile_id, firstname, lastname) VALUES ($1, $2, $3)";
const insertProfileDataOfManager =
  "INSERT INTO manager_profile (manager_profile_id, firstname, lastname) VALUES ($1, $2, $3)";
const insertProfileDataOfShipper =
  "INSERT INTO shipper_profile (shipper_profile_id, firstname, lastname) VALUES ($1, $2, $3)";

const updateProfileByUserIdOfUser =
  "UPDATE user_profile SET firstname = $1, lastname = $2 WHERE user_profile_id = $3";
const updateProfileByUserIdOfManager =
  "UPDATE manager_profile SET firstname = $1, lastname = $2 WHERE manager_profile_id = $3";
const updateProfileByUserIdOfShipper =
  "UPDATE shipper_profile SET firstname = $1, lastname = $2 WHERE shipper_profile_id = $3";

module.exports = {
  getProfileByUserIdOfUser,
  getProfileByUserIdOfManager,
  getProfileByUserIdOfShipper,

  ifExistUserIdOfUser,
  ifExistUserIdOfManager,
  ifExistUserIdOfShipper,

  insertProfileDataOfUser,
  insertProfileDataOfManager,
  insertProfileDataOfShipper,

  updateProfileByUserIdOfUser,
  updateProfileByUserIdOfManager,
  updateProfileByUserIdOfShipper,
};
