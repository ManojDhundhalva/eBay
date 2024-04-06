const getAllCartByUserId =
  "SELECT p.product_id, p.product_title, p.product_price, pi.product_image FROM (product AS p JOIN product_image AS pi ON p.product_id = pi.product_id) JOIN cart AS c ON c.product_id = p.product_id WHERE c.user_id = $1";

const addToCartByUserId = "INSERT INTO cart (product_id, user_id) VALUES ($1, $2)";
const deleteFromCartByUserIdAndProductID = "DELETE FROM cart WHERE product_id = $1 AND user_id = $2";

module.exports = {
  getAllCartByUserId,
  addToCartByUserId,
  deleteFromCartByUserIdAndProductID,
};
