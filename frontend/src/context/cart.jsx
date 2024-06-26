import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./auth";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function calculateTotalCost() {
    let totalCost = 0;

    for (let i = 0; i < cart.length; i++) {
      let itemPrice = Number(cart[i].product_price);
      let itemQuantity = Number(cart[i].product_quantity);
      totalCost += itemPrice * itemQuantity;
    }

    return Number(totalCost);
  }

  const getAllCart = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/cart?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          headers,
        }
      );
      setCart(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  const addToCart = async (product_id) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/cart?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { product_id },
        {
          headers,
        }
      );
      getAllCart();
    } catch (err) {
      console.log("Error -> ", err);
    }
  };
  const deleteFromCart = async (product_id) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.delete(
        `http://localhost:8000/api/v1/cart?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem(
          "role"
        )}&product_id=${product_id}`,
        {
          headers,
        }
      );
      getAllCart();
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  const getBankAccount = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/seller?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          headers,
        }
      );
      setHasAccount(results.data.isBankAccount);
      // window.localStorage.setItem("isAccount", results.data.isBankAccount);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllCart();
      getBankAccount();
    }
  }, [isLoggedIn]);

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        hasOrdered,
        setHasOrdered,
        calculateTotalCost,
        getBankAccount,
        hasAccount,
        setHasAccount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
