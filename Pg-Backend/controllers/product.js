const pool = require("../db");
const queries = require("../queries/product");

const getAllProducts = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.getAllProduct, [req.user.id]);
      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(404).json({
      message: "You are not a user, therefore you cant't see this products",
    });
  }
};

const viewProduct = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.viewProduct, [
        req.query.product_id,
      ]);

      if (results.rows.length !== 1) {
        return resp.status(404).json({ message: "Product Not Found" });
      }

      resp.status(200).json(results.rows);
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(404).json({
      message: "You are not a user, therefore you can't view this products",
    });
  }
};

const increaseViewCount = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const result1 = await pool.query(queries.findProductView, [
        req.body.product_id,
        req.user.id,
      ]);

      if (result1.rows.length === 0) {
        const results = await pool.query(queries.addViewOfProduct, [
          req.body.product_id,
          req.user.id,
        ]);

        const result2 = await pool.query(queries.increaseViewCount, [
          req.body.product_id,
        ]);

        resp.status(200).json({ message: "Succesfull view count incremented" });
      } else {
        resp.status(200).json({ message: "Already, view count incremented" });
      }
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(404).json({
      message: "You are not a user, therefore you can't increase view count",
    });
  }
};

module.exports = {
  getAllProducts,
  viewProduct,
  increaseViewCount,
};
