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
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import axios from "axios";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ProductDetails({ data }) {
  const [productDetails, setProductDetails] = useState({});
  const { cart, addToCart, deleteFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

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

  const handleRating = async (product_id) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/product/review-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { product_id, rating: value },
        {
          headers,
        }
      );
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  const handleComment = async (product_id) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/product/comment-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { product_id, comment },
        {
          headers,
        }
      );
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
      <Button
        variant="contained"
        onClick={() => {
          handleRating(productDetails.product_id);
        }}
      >
        Add rating
      </Button>
      <>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.2}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            icon={<StarIcon style={{ color: "gold" }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </>

      <Button
        variant="contained"
        onClick={() => {
          handleComment(productDetails.product_id);
        }}
      >
        add comment
      </Button>
      <TextField
        id="outlined-basic"
        label="Comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        variant="outlined"
      />
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
