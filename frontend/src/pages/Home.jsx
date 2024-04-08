import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Agency from "../components/Agency";
import Searchnearby from "../components/Searchnearby";
import { useAuth } from "../context/auth";
import User from "./User";
import InventoryManager from "./InventoryManager";
import Shipper from "./Shipper";

export default function Home() {
  const { validateUser } = useAuth();

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <div>Home</div>
      {window.localStorage.getItem("role") === "user" && <User />}
      {window.localStorage.getItem("role") === "manager" && (
        <InventoryManager />
      )}
      {window.localStorage.getItem("role") === "shipper" && <Shipper />}
    </>
  );
}
