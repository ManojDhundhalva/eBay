const pool = require("../db");
const queries = require("../queries/login");

const getAllCart = (req, resp) => {
  try {
  } catch (err) {
    console.log("Error -> ", err);
    resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCart,
};
