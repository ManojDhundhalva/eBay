import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInventory } from "../context/inventory";
import Grid from "@mui/material/Grid";

function InventoryQueue() {
  const { city } = useInventory();
  const [allQueue, setAllQueue] = useState([]);

  const getCityOfInventory = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/inventory/queue?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        { city },
        {
          headers,
        }
      );
      setAllQueue(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  useEffect(() => {
    getCityOfInventory();
  }, []);
  return (
    <>
      <h1>InventoryQueue</h1>
      <Grid container spacing={2}>
        {allQueue.map((data, index) =>
          Object.entries(data).map(([key, value]) => (
            <Grid key={`${index}-${key}`} xs={12} sm={6} md={4} lg={3} item>
              <div>
                {index + 1} : {key}: {value === null ? "null" : value}
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default InventoryQueue;
