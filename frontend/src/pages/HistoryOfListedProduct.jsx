import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";

import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import { Tune } from "@mui/icons-material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const HistoryOfListedProduct = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const getAllListedProduct = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/product/all-listed-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          headers,
        }
      );
      setHistory(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    getAllListedProduct();
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      body1: {
        fontWeight: "600",
        fontSize: "medium",
      },
    },
  });

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      <h1>History</h1>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/list-product");
        }}
      >
        List Product
      </Button>
      <Grid container spacing={2}>
        {history.map((data, index) => (
          <Grid key={index} xs={3} item>
            <div>product_description : {data.product_description}</div>
            <div>product_id : {data.product_id}</div>
            <div>product_price : {data.product_price}</div>
            <div>product_quantity : {data.product_quantity}</div>
            <div>product_rating : {data.product_rating}</div>
            <div>product_title : {data.product_title}</div>
            <div>product_watch_count : {data.product_watch_count}</div>
            <div>product_unique_id : {data.product_unique_id}</div>
            {data.product_images.map((image, img_index) => (
              <div key={img_index}>
                {img_index + 1} : {image}
              </div>
            ))}
            {/* <div>product_seller_id : "5"</div> */}
          </Grid>
        ))}
      </Grid>
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5">&nbsp;</div>
    </>
  );
};

export default HistoryOfListedProduct;
