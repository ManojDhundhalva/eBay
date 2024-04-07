const getAllProduct = `
SELECT 
    p.product_id,
    p.product_unique_id,
    p.product_title,
    p.product_price,
    ARRAY_AGG(pi.product_image) AS product_images 
FROM 
    product AS p 
LEFT JOIN 
    product_image AS pi ON p.product_id = pi.product_id 
WHERE 
    p.product_seller_id <> $1 
GROUP BY 
    p.product_id,
    p.product_unique_id,
    p.product_title, 
    p.product_price
LIMIT 10
`;

const viewProduct = `
SELECT 
    u.username,
    p.product_id, 
    p.product_unique_id, 
    p.product_seller_id,
    p.product_title, 
    p.product_price, 
    p.product_quantity,
    p.product_watch_count,
    p.product_description, 
    p.product_rating,
    ARRAY_AGG(pi.product_image) AS product_images 
FROM 
    product AS p 
LEFT JOIN 
    product_image AS pi ON p.product_id = pi.product_id 
JOIN 
    users AS u ON u.id = p.product_seller_id
WHERE 
    p.product_id = $1 
GROUP BY 
    u.username,
    p.product_id, 
    p.product_unique_id, 
    p.product_title, 
    p.product_price
`;

const findProductView = `
SELECT 
    *
FROM 
    watches 
WHERE 
    product_id = $1 
    AND user_id = $2;
`;

const addViewOfProduct = `
INSERT INTO watches (product_id, user_id)
VALUES ($1, $2);
`;

const increaseViewCount = `
UPDATE product 
SET product_watch_count = product_watch_count + 1 
WHERE product_id = $1;
`;

const listProductIntoProductTable = `
INSERT INTO product (product_unique_id, product_seller_id, product_title, product_price, product_quantity, product_description) 
VALUES ($1, $2, $3, $4, $5, $6);
`;

const getProductIdByUniqueId = `
SELECT product_id 
FROM product 
WHERE product_unique_id = $1;
`;

const listImageIntoImageTableByUniqueId = `
INSERT INTO product_image (product_id, product_image) 
VALUES ($1, $2);
`;

const getAllListedProductBySellerId = `
SELECT 
    p.*, 
    ARRAY_AGG(pi.product_image) AS product_images 
FROM 
    product AS p 
LEFT JOIN 
    product_image AS pi ON p.product_id = pi.product_id 
WHERE 
    p.product_seller_id = $1 
GROUP BY 
    p.product_id;
`;

module.exports = {
  getAllProduct,
  viewProduct,
  findProductView,
  addViewOfProduct,
  increaseViewCount,
  listProductIntoProductTable,
  getProductIdByUniqueId,
  listImageIntoImageTableByUniqueId,
  getAllListedProductBySellerId,
};
