const getAllListedInventoryProduct = `
SELECT *
FROM product AS p
JOIN seller AS s ON p.product_seller_id = s.seller_user_id
JOIN inventory_house AS i ON i.inventory_house_city = s.seller_city
WHERE s.seller_city = $1;
`;

const getCityOfInventoryByManagerId = `
SELECT inventory_house_city FROM inventory_house WHERE manager_id = $1
`;

const getQueueOfInventoryByCity = `
SELECT p.*, s.*, h.*
FROM shipping_status AS s
JOIN has_order AS h ON h.has_order_id = s.order_id
JOIN product AS p ON p.product_id = h.has_order_product_id
JOIN seller AS se ON se.seller_user_id = p.product_seller_id
WHERE s.delivered_date IS NULL
AND se.seller_city = $1
`;

module.exports = {
  getAllListedInventoryProduct,
  getCityOfInventoryByManagerId,
  getQueueOfInventoryByCity,
};
