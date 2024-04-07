const pool = require("../db");
const queries = require("../queries/seller");

const getBankAccount = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.getBankAccountByUserId, [
        req.user.id,
      ]);

      let isBankAccount = false;
      if (results.rows.length !== 0) {
        isBankAccount = true;
      }
      resp.status(200).json({ isBankAccount });
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

const addBankAccount = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const result1 = await pool.query(queries.addBankAccountByUserId, [
        req.body.bankAccountNumber,
      ]);

      const result2 = await pool.query(queries.addSeller, [
        req.user.id,
        req.body.bankAccountNumber,
      ]);
      
      resp.status(200).json({ message: "Bank Account Added" });
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
  addBankAccount,
};
