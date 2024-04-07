import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

function BankDetails() {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const { setHasBankAccount } = useCart();
  const navigate = useNavigate();

  const handleBankAccount = () => {
    setHasBankAccount(true);
    navigate("/history-product");
  };

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
