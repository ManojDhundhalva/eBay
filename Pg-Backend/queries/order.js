const addPayment = `
INSERT INTO payment (
    payment_transaction_unique_id, 
    payment_amount
) 
VALUES ($1, $2);
`;

const getPaymentTransactionId = `
SELECT payment_transaction_id 
WHERE payment_transaction_unique_id = $1;
`;

const addOrder = `
INSERT INTO order_details (
    order_unique_id,
    order_buyer_id, 
    order_transaction_id, 
    order_total_cost, 
    order_shipping_cost, 
    order_shipping_address_apartment, 
    order_shipping_address_street, 
    order_shipping_address_country, 
    order_shipping_address_city, 
    order_shipping_address_state, 
    order_shipping_address_pincode, 
    order_shipping_address_mobile_number
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
`;

const findOrderId = `
SELECT order_id 
FROM order_details 
WHERE order_unique_id = $1;
`;

const addTableOfHasOrder = `
INSERT INTO has_order (
    has_order_id, 
    has_order_unique_id,
    has_order_product_id
) 
VALUES ($1, $2, $3);
`;

module.exports = {
  addPayment,
  getPaymentTransactionId,
  addOrder,
  findOrderId,
  addTableOfHasOrder,
};
