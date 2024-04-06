import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Product({ data }) {
  const { product_id, product_image, product_price, product_title } = data;
  const navigate = useNavigate();

  const handleProductDetails = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/product/increase-view-count?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { product_id },
        {
          headers,
        }
      );
      window.localStorage.setItem("product-id", product_id);
      navigate("/product-details");
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} onClick={handleProductDetails}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product_image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product_title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product_price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>hello</CardActions>
      </Card>
    </>
  );
}
