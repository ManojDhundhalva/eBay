const pool = require("../db");
const queries = require("../queries/order");
const { v4: uuidv4 } = require("uuid");

const putOrder = async (req, resp) => {
  if (req.user.role === "user") {
    const {
      order_total_cost,
      order_shipping_cost,
      order_shipping_address_apartment,
      order_shipping_address_street,
      order_shipping_address_country,
      order_shipping_address_state,
      order_shipping_address_city,
      order_shipping_address_pincode,
      order_shipping_address_mobile_number,
      productIds,
    } = req.body;

    const payment_transaction_unique_id = uuidv4();
    const payment_amount =
      Number(order_total_cost) + Number(order_shipping_cost);
    const result1 = await pool.query(queries.addPayment, [
      payment_transaction_unique_id,
      payment_amount,
    ]);

    //finding PaymentTransactionId
    const result2 = await pool.query(queries.getPaymentTransactionId, [
      payment_transaction_unique_id,
    ]);

    if (result2.rows.length !== 1) {
      return resp
        .status(404)
        .json({ message: "Payment_Transaction_Id Not Found" });
    }

    const { payment_transaction_id } = result2.rows[0];
    const order_unique_id = uuidv4();
    const result3 = await pool.query(queries.addOrder, [
      order_unique_id,
      req.user.id,
      payment_transaction_id,
      order_total_cost,
      order_shipping_cost,
      order_shipping_address_apartment,
      order_shipping_address_street,
      order_shipping_address_country,
      order_shipping_address_state,
      order_shipping_address_city,
      order_shipping_address_pincode,
      order_shipping_address_mobile_number,
    ]);

    //finding order_id
    const result4 = await pool.query(queries.findOrderId, [order_unique_id]);
    if (result4.rows.length !== 1) {
      return resp.status(404).json({ message: "Order_Id Not Found" });
    }

    const { order_id } = result4.rows[0];
    const has_order_unique_id = uuidv4();
    for (product_id of productIds) {
      const result5 = await pool.query(queries.addTableOfHasOrder, [
        order_id,
        has_order_unique_id,
        product_id,
      ]);
    }

    const result6 = await pool.query(queries.emptyCart, [req.user.id]);

    resp.status(200).json({ message: "Ordered Succesfully" });
  } else {
    resp
      .status(404)
      .json({ message: "You are not a user, therefore you can't order" });
  }
};

module.exports = {
  putOrder,
};
