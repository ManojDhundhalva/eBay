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

const getAllPurchasedProductByUserId = `
SELECT
    o.*,
    h.*,
    p.*,
    ARRAY_AGG(pi.product_image) AS product_images
FROM
    product AS p
LEFT JOIN
    product_image AS pi ON p.product_id = pi.product_id
JOIN
    has_order AS h ON h.has_order_product_id = p.product_id
JOIN
    order_details AS o ON h.has_order_id = o.order_id
WHERE
    p.product_seller_id = $1
GROUP BY
    h.has_order_id,
    p.product_id,
    h.has_order_unique_id,
    h.has_order_product_id,
	o.order_id
`;

const checkIfExistProductIdAndUserId = `
SELECT product_id, user_id 
FROM product_review 
WHERE
    product_id = $1 AND user_id = $2
`;

const updateReview = `
UPDATE product_review 
SET product_review_rating = $1 
WHERE 
    product_id = $2 AND user_id = $3
`;

const makeReview = `
INSERT INTO product_review (
    product_id,
    user_id,
    product_review_rating
) 
VALUES ($1, $2, $3)
`;

const Trigger_updateProductRatingInProductTable = `
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE product
    SET product_rating = (
        SELECT AVG(product_review_rating)
        FROM product_review
        WHERE product_review.product_id = NEW.product_id
            AND product_review_rating IS NOT NULL
        GROUP BY product_review.product_id
    )
    WHERE product_id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER avg_rating_trigger
AFTER INSERT OR UPDATE OF product_review_rating ON product_review
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

`;

const updateComment = `
UPDATE product_review 
SET product_review_comment = $1 
WHERE 
    product_id = $2 AND user_id = $3
`;

const makeComment = `
INSERT INTO product_review (
    product_id,
    user_id,
    product_review_comment
) 
VALUES ($1, $2, $3)
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
  getAllPurchasedProductByUserId,
  updateReview,
  checkIfExistProductIdAndUserId,
  makeReview,
  updateComment,
  makeComment,
};
