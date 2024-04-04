const pool = require("../db");
const queries = require("../queries/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util");
require("dotenv").config();

const compareAsync = util.promisify(bcrypt.compare);

const getAccount = async (req, resp) => {
  const { username, password } = req.body;

  try {
    const results = await pool.query(queries.getAccountByUserName, [username]);

    if (results.rows.length !== 1) {
      return resp.status(401).json("User not found");
    }
    const { id, role } = results.rows[0];
    const storedPassword = results.rows[0].password;

    const result = await compareAsync(password, storedPassword);

    if (result) {
      const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      resp.status(200).json({ token, role });
    } else {
      resp.status(401).json("Incorrect Password");
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getAccount,
};
