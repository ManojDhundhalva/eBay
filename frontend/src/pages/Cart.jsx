import React from "react";
import { useCart } from "../context/cart";
import Grid from "@mui/material/Grid";
import Product from "../components/Product";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setHasOrdered } = useCart();
  const navigate = useNavigate();

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
      <Button
        variant="contained"
        onClick={() => {
          navigate("/address-info");
          setHasOrdered(true);
        }}
      >
        Place Order
      </Button>
    </>
  );
}

export default Cart;
