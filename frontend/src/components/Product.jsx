import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useCart } from "../context/cart";

export default function Product({ data }) {
  const { product_id, product_image, product_price, product_title } = data;

  const { cart, addToCart, deleteFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const checkIsAdded = () => {
    for (let i = 0; i < cart.length; i++) {
      if (Number(cart[i].product_id) === Number(product_id)) {
        setIsAdded(true);
        break;
      }
    }
  };

  useEffect(() => {
    checkIsAdded();
  }, []);
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
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
        <CardActions>
          {!isAdded ? (
            <Button
              variant="contained"
              onClick={() => {
                addToCart(product_id);
                setIsAdded(true);
              }}
            >
              Add To Cart &nbsp; <ShoppingCartOutlinedIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                deleteFromCart(product_id);
                setIsAdded(false);
              }}
            >
              Remove From The Cart &nbsp; <RemoveShoppingCartIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}
