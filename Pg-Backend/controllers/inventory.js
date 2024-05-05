const pool = require("../db");
const queries = require("../queries/inventory");

const getAllListedInventoryProduct = async (req, resp) => {
  if (req.user.role === "manager") {
    try {
      const results = await pool.query(queries.getAllListedInventoryProduct, [
        req.body.city,
      ]);
      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message: "You are not a manager, therefore you can get any products",
    });
  }
};

const getCityOfInventory = async (req, resp) => {
  if (req.user.role === "manager") {
    try {
      const results = await pool.query(queries.getCityOfInventoryByManagerId, [
        req.user.id,
      ]);

      resp.status(200).json(results.rows[0]);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message: "You are not a manager, therefore you can get city",
    });
  }
};

const getQueueOfInventory = async (req, resp) => {
  if (req.user.role === "manager") {
    try {
      const results = await pool.query(queries.getQueueOfInventoryByCity, [
        req.body.city,
      ]);

      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message:
        "You are not a manager, therefore you can get any products Queue",
    });
  }
};

const getAllReceivedProduct = async (req, resp) => {
  if (req.user.role === "manager") {
    try {
      const results = await pool.query(queries.receivedOrder, [req.body.city]);

      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message:
        "You are not a manager, therefore you can get any products Queue",
    });
  }
};

module.exports = {
  getAllListedInventoryProduct,
  getCityOfInventory,
  getQueueOfInventory,
  getAllReceivedProduct,
};
