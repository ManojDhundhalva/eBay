import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Product from "../components/Product";
import axios from "axios";

function User() {
  const [allProduct, setAllProduct] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${window.localStorage.getItem("token")}`,
  };

  const getAllProducts = async () => {
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          headers,
        }
      );
      setAllProduct(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  const addToCart = () => {
    console.log("addToCart");
  };
  const removeFromTheCart = () => {
    console.log("removeFromTheCart");
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {allProduct.map((data, index) => (
          <Grid key={index} xs={3} item>
           <Product
            data={data}
            addToCart={addToCart}
            removeFromTheCart={removeFromTheCart}
          />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default User;
