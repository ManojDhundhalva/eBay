import React from "react";
import { useCart } from "../context/cart";
import Grid from "@mui/material/Grid";
import Product from "../components/Product";

function Cart() {
  const { cart } = useCart();

  return (
    <>
      <h2>Cart</h2>
      <Grid container spacing={2}>
        {cart.map((data, index) => (
          <Grid key={index} xs={3} item>
            <Product data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Cart;
