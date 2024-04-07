import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function AddressInfo() {
  const { cart, hasOrdered, calculateTotalCost } = useCart();
  const navigate = useNavigate();

  const [totalCost, setTotalCost] = useState("");
  const [apartment, setApartment] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  const handlePayment = async () => {
    const order_shipping_cost =
      50 + Number(getRandomNumber(-10, 10).toFixed(2));

    const productIds = cart.map((item) => item.product_id);
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/order?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          order_total_cost: totalCost,
          order_shipping_cost,
          order_shipping_address_apartment: apartment,
          order_shipping_address_street: street,
          order_shipping_address_country: country,
          order_shipping_address_state: state,
          order_shipping_address_city: city,
          order_shipping_address_pincode: pincode,
          order_shipping_address_mobile_number: phoneNumber,
          productIds,
        },
        {
          headers,
        }
      );
      console.log(results);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    if (!hasOrdered) {
      navigate("/cart");
    } else {
      setTotalCost(String(calculateTotalCost()));
    }
  }, []);
  return (
    <>
      <h1>AddressInfo</h1>
      <TextField
        id="outlined-basic-1"
        label="Apartment"
        variant="outlined"
        autoComplete="on"
        value={apartment}
        onChange={(e) => {
          setApartment(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-2"
        label="Street"
        variant="outlined"
        autoComplete="on"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-3"
        label="Country"
        variant="outlined"
        autoComplete="on"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-4"
        label="State"
        variant="outlined"
        autoComplete="on"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-5"
        label="City"
        variant="outlined"
        autoComplete="on"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-6"
        label="Pincode"
        variant="outlined"
        autoComplete="on"
        value={pincode}
        onChange={(e) => {
          setPincode(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic-7"
        label="PhoneNumber"
        variant="outlined"
        autoComplete="on"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <div>{totalCost}</div>
      {/* create seperate payment page */}
      <Button variant="contained" onClick={handlePayment}>
        Pay Now
      </Button>
    </>
  );
}

export default AddressInfo;
