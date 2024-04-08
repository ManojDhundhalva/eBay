import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const inventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [city, getCity] = useState("");

  const getCityOfInventory = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.get(
        `http://localhost:8000/api/v1/inventory?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          headers,
        }
      );
      getCity(results.data.inventory_house_city);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    getCityOfInventory();
  }, []);

  return (
    <inventoryContext.Provider
      value={{
        city,
      }}
    >
      {children}
    </inventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(inventoryContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
