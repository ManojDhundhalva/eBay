const getAllListedInventoryProduct = `
(SELECT p.*
FROM product AS p
JOIN seller AS s ON p.product_seller_id = s.seller_user_id
WHERE s.seller_city = $1)

EXCEPT

(SELECT p.*
  FROM product AS p
  JOIN has_order AS h ON h.has_order_product_id = p.product_id)
`;

const getCityOfInventoryByManagerId = `
SELECT inventory_house_city FROM inventory_house WHERE manager_id = $1
`;

const getQueueOfInventoryByCity = `
SELECT jsonb_build_object(
  'has_order_id', h.has_order_id,
  'has_order_unique_id', h.has_order_unique_id,
  'products', jsonb_agg(
                 jsonb_build_object(
                     'product_id', p.product_id,
                     'product_unique_id', p.product_unique_id,
                     'product_seller_id', p.product_seller_id,
                     'product_title', p.product_title,
                     'product_price', p.product_price,
                     'product_available_quantity', p.product_available_quantity,
                     'product_watch_count', p.product_watch_count,
                     'product_description', p.product_description,
                     'product_rating', p.product_rating,
                     'product_timestamp', p.product_timestamp,
                     'has_order_quantity', h.has_order_quantity,
                     'images', pi.product_images
                 )
             )
) AS order_details
FROM has_order AS h
JOIN product AS p ON h.has_order_product_id = p.product_id
JOIN seller AS s ON p.product_seller_id = s.seller_user_id
JOIN shipping_status AS ss ON ss.order_id = h.has_order_id
LEFT JOIN (
SELECT product_id, ARRAY_AGG(product_image) AS product_images
FROM product_image
GROUP BY product_id
) AS pi ON p.product_id = pi.product_id
WHERE s.seller_city = $1 AND ss.shipping_status_two IS NULL
GROUP BY h.has_order_id, h.has_order_unique_id, h.has_order_product_id, h.has_order_quantity;
`;

const receivedOrder = `
SELECT json_build_object(
  'total_products_in_order', COUNT(*) OVER (PARTITION BY h.has_order_id),
  'order_id', h.has_order_id,
  'order_unique_id', h.has_order_unique_id,
  'product', jsonb_agg(
     jsonb_build_object(
                   'product_id', p.product_id,
                   'product_unique_id', p.product_unique_id,
                   'product_seller_id', p.product_seller_id,
                   'product_title', p.product_title,
                   'product_price', p.product_price,
                   'product_available_quantity', p.product_available_quantity,
                   'product_watch_count', p.product_watch_count,
                   'product_description', p.product_description,
                   'product_rating', p.product_rating,
                   'product_timestamp', p.product_timestamp,
                   'images', pi.product_images
                  )
    )
) AS received_order
FROM shipping_status AS ss
JOIN has_order AS h ON ss.order_id = h.has_order_id
JOIN order_details AS o ON o.order_id = h.has_order_id
JOIN product AS p ON p.product_id = h.has_order_product_id
LEFT JOIN (
SELECT product_id, ARRAY_AGG(product_image) AS product_images
FROM product_image
GROUP BY product_id
) AS pi ON p.product_id = pi.product_id
WHERE ss.shipping_status_two IS NOT NULL
AND ss.shipping_status_four IS NULL
AND LOWER(o.order_shipping_address_city) = 'gujarat'
GROUP BY h.has_order_id, h.has_order_unique_id
`;

module.exports = {
  getAllListedInventoryProduct,
  getCityOfInventoryByManagerId,
  getQueueOfInventoryByCity,
  receivedOrder,
};
