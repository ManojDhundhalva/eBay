import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function Product({ data }) {
  const { product_image, product_price, product_title } = data;

  return (
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
            {"description"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>{product_price}</CardActions>
    </Card>
  );
}
