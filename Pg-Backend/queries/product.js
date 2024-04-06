const getAllProduct =
  "SELECT p.product_id, p.product_title, p.product_price, pi.product_image FROM product AS p JOIN product_image AS pi ON p.product_id = pi.product_id WHERE product_seller_id <> $1 LIMIT 10";
const viewProduct =
  "SELECT p.product_id, p.product_seller_id, p.product_title, p.product_price, p.product_quantity, p.product_watch_count, p.product_description, p.product_rating, pi.product_image FROM product AS p JOIN product_image AS pi ON p.product_id = pi.product_id WHERE p.product_id = $1";
const findProductView =
  "SELECT * FROM watches WHERE product_id = $1 AND user_id = $2";
const addViewOfProduct =
  "INSERT INTO watches (product_id, user_id) VALUES ($1, $2)";
const increaseViewCount =
  "UPDATE product SET product_watch_count = product_watch_count + 1 WHERE product_id = $1";

module.exports = {
  getAllProduct,
  viewProduct,
  findProductView,
  addViewOfProduct,
  increaseViewCount,
};
