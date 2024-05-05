import React, { useEffect, useState } from "react";
import axios from "axios";

function ReceivedProduct() {
  const [receivedProduct, setReceivedProduct] = useState([]);

  const getAllReceivedProduct = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    try {
      const results = await axios.post(
        `http://localhost:8000/api/v1/inventory/received-product?username=${window.localStorage.getItem(
          "username"
        )}&role=${window.localStorage.getItem("role")}`,
        {
          city: "gujarat",
        },
        {
          headers,
        }
      );
      console.log(results.data);
    } catch (err) {
      console.log("Error -> ", err);
    }
  };
  useEffect(() => {
    getAllReceivedProduct();
  }, []);

  return (
    <>
      <h1>ReceivedProduct</h1>
    </>
  );
}

export default ReceivedProduct;
