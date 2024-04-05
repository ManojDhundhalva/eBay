import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function Product({ data, addToCart, removeFromTheCart }) {
  const { product_image, product_price, product_title } = data;

  const [isAdded, setIsAdded] = useState(false);

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
          <Button variant="contained" onClick={addToCart}>
            Add To Cart &nbsp; <ShoppingCartOutlinedIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
