import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loginpage from "./pages/Loginpage"
import Navbar from "./pages/Navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import CreateProduct from "./components/CreateProduct";
import SellerProductPage from "./pages/SellerProduct"
import IndividualProduct from "./pages/IndividualProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Order"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Loginpage />}></Route>
        <Route path="/create" element={<CreateProduct />}></Route>
        <Route path="/modify" element={<SellerProductPage/>}></Route>
        <Route path="/pro" element={<IndividualProduct />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/order" element={<Order/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
