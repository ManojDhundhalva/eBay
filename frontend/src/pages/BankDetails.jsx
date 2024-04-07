import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";

function BankDetails() {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const { hasAccount } = useCart();
  const navigate = useNavigate();

  const handleBankAccount = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/seller?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { bankAccountNumber },
        {
          headers,
        }
      );
    } catch (err) {
      console.log("Error -> ", err);
    }
    navigate("/history-product");
  };

  useEffect(() => {
    if (hasAccount) {
      navigate("/history-product");
    }
  }, [hasAccount]);

  return (
    <>
      <div>BankDetails</div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => {
          setBankAccountNumber(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleBankAccount}>
        SAVE
      </Button>
    </>
  );
}

export default BankDetails;
