import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
// import { useAuth } from "./context/auth";
import AboutUS from "./pages/AboutUs";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import HistoryOfListedProduct from "./pages/HistoryOfListedProduct";
import ListProduct from "./pages/ListProduct";
import AddressInfo from "./pages/AddressInfo";
import BankDetails from "./pages/BankDetails";
import InventoryQueue from "./pages/InventoryQueue";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/aboutus" element={<AboutUS />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/product-details" element={<ProductDetails />} />
        <Route
          exact
          path="/history-product"
          element={<HistoryOfListedProduct />}
        />
        <Route exact path="/list-product" element={<ListProduct />} />
        <Route exact path="/address-info" element={<AddressInfo />} />
        <Route exact path="/bank-account" element={<BankDetails />} />
        <Route exact path="/queue" element={<InventoryQueue />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
