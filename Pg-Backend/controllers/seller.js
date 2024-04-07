const pool = require("../db");
const queries = require("../queries/seller");

const getBankAccount = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.getBankAccountByUserId, [
        req.user.id,
      ]);
      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message: "You are not a user, therefore you can't get cart details.",
    });
  }
};

module.exports = {
  getBankAccount,
};
