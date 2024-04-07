import React from "react";
import { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";

function ProductDetails({ data }) {
  const [productDetails, setProductDetails] = useState({});
  const { cart, addToCart, deleteFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const checkIsAdded = () => {
    for (let i = 0; i < cart.length; i++) {
      if (
        Number(cart[i].product_id) ===
        Number(window.localStorage.getItem("product-id"))
      ) {
        setIsAdded(true);
        break;
      }
    }
  };

  const getFullDetailsOfProduct = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/product/view-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem(
          "role"
        )}&product_id=${window.localStorage.getItem("product-id")}`,
        {
          headers,
        }
      );
      setProductDetails(results.data[0]);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("product-id") === null) {
      navigate("/");
    }
    getFullDetailsOfProduct();
    checkIsAdded();
  }, []);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={productDetails.product_image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productDetails.product_title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.product_price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions> hello</CardActions>
      </Card>
      <h2>ProductDetails</h2>
      <div>username : {productDetails.username}</div>
      <div>product_id : {productDetails.product_id}</div>
      <div>product_seller_id :{productDetails.product_seller_id}</div>
      <div>product_title: {productDetails.product_title}</div>
      <div>product_price: {productDetails.product_price}</div>
      <div>product_quantity :{productDetails.product_quantity}</div>
      <div>product_watch_count : {productDetails.product_watch_count}</div>
      <div>product_description :{productDetails.product_description}</div>
      <div>product_rating: {productDetails.product_rating}</div>
      {!isAdded ? (
        <Button
          variant="contained"
          onClick={() => {
            addToCart(window.localStorage.getItem("product-id"));
            setIsAdded(true);
          }}
        >
          Add To Cart &nbsp; <ShoppingCartOutlinedIcon />
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            deleteFromCart(window.localStorage.getItem("product-id"));
            setIsAdded(false);
          }}
        >
          Remove From The Cart &nbsp; <RemoveShoppingCartIcon />
        </Button>
      )}
    </>
  );
}

export default ProductDetails;
