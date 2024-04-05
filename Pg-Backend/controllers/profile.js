const pool = require("../db");
const queries = require("../queries/profile");

const getProfile = async (req, resp) => {
  try {
    const results = await pool.query(queries.getProfileByUserId, [req.user.id]);

    if (results.rows.length !== 1) {
      return resp.status(401).json({ message: "User not found" });
    }

    const data = results.rows[0];
    delete data.id;
    resp.status(200).json(data);
  } catch (err) {
    console.log("Error -> ", err);
    resp.status(500).json({ message: "Internal Server Error" });
  }
};
const updateProfile = async (req, resp) => {
  const { firstname, lastname } = req.body;

  const results = await pool.query(queries.updateProfileByUserId, [
    req.user.id,
    firstname,
    lastname,
  ]);

  if (results.rows.length !== 1) {
    return resp.status(401).json({ message: "User not found" });
  }
  resp.status(200).json({ message: "Profile Updated Succesfully" });
};

module.exports = {
  getProfile,
  updateProfile,
};
