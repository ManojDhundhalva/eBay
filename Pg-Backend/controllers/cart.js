const pool = require("../db");
const queries = require("../queries/cart");

const getAllCart = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.getAllCartByUserId, [
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

const addToCart = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(queries.addToCartByUserId, [
        req.body.product_id,
        req.user.id,
      ]);
      resp.status(200).json({ message: "Added Into Cart" });
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message: "You are not a user, therefore you can't add product into cart.",
    });
  }
};

const deleteFromCart = async (req, resp) => {
  if (req.user.role === "user") {
    try {
      const results = await pool.query(
        queries.deleteFromCartByUserIdAndProductID,
        [req.query.product_id, req.user.id]
      );
      resp.status(200).json({ message: "Deleted From Cart" });
    } catch (err) {
      console.log("Error -> ", err);
      resp.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    resp.status(401).json({
      message: "You are not a user, therefore you can't delete from cart.",
    });
  }
};

module.exports = {
  getAllCart,
  addToCart,
  deleteFromCart,
};
