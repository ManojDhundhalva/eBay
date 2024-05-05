import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useInventory } from "../context/inventory";

function InventoryManager() {
  const { city } = useInventory();
  const [allProduct, setAllProduct] = useState([]);

  const getAllListedInventoryProduct = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/inventory?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { city },
        {
          headers,
        }
      );
      console.log(results.data);
      setAllProduct(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    getAllListedInventoryProduct();
  }, [city]);

  return (
    <>
      <div>InventoryManager</div>
      <div>city : {city}</div>
      <Grid container spacing={2}>
        {allProduct.map((data, index) =>
          Object.entries(data).map(([key, value]) => (
            <Grid key={key} xs={3} item>
              <div>
                {index + 1} : {key} : {value}
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default InventoryManager;
