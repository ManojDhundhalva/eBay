const getAllProduct =
  "SELECT p.product_id, p.product_title, p.product_price, pi.product_image FROM product AS p JOIN product_image AS pi ON p.product_id = pi.product_id WHERE product_seller_id <> 5 LIMIT 10";

module.exports = {
  getAllProduct,
};
