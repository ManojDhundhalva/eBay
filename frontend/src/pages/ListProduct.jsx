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
import TextField from "@mui/material/TextField";
import { useCart } from "../context/cart";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ListProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [inputs, setInputs] = useState([""]);
  const navigate = useNavigate();
  const { hasAccount } = useCart();

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleListProduct = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/product/list-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          product_title: productTitle,
          product_price: productPrice,
          product_quantity: productQuantity,
          product_description: productDescription,
          product_image: inputs,
        },
        {
          headers,
        }
      );
      navigate("/history-product");
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

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
    if (!hasAccount) {
      navigate("/bank-account");
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      <div>ListProduct</div>
      <TextField
        id="outlined-basic-1"
        label="product_title"
        variant="outlined"
        autoComplete="off"
        onChange={(e) => {
          setProductTitle(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-2"
        label="product_price"
        variant="outlined"
        autoComplete="off"
        onChange={(e) => {
          setProductPrice(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-3"
        label="product_quantity"
        variant="outlined"
        autoComplete="off"
        onChange={(e) => {
          setProductQuantity(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-4"
        label="product_description"
        variant="outlined"
        autoComplete="off"
        onChange={(e) => {
          setProductDescription(e.target.value);
        }}
      />
      {inputs.map((input, index) => (
        <div key={index}>
          <TextField
            label={`Image ${index + 1}`}
            value={input}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <Button variant="contained" onClick={() => handleRemoveInput(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button variant="contained" onClick={handleAddInput}>
        Add
      </Button>
      <Button variant="contained" onClick={handleListProduct}>
        List Product
      </Button>
      <Button variant="contained" onClick={handleListProduct}>
        Update Bank Account
      </Button>
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5">&nbsp;</div>
    </>
  );
};

export default ListProduct;
