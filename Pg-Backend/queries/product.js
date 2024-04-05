const getAllProduct =
  "SELECT product_title, product_price, product_image FROM product AS p JOIN product_image AS pi ON p.product_id = pi.product_id";

module.exports = {
  getAllProduct,
};
