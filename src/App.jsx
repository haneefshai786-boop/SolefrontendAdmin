import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./pages/Categories.jsx";
import Vendors from "./pages/Vendors.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Folders from "./pages/Folders.jsx";
import Subcategories from "./pages/Subcategories.jsx";
import Orders from "./pages/Orders.jsx"; // import Orders page

const App = () => {
  const token = localStorage.getItem("adminToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {token ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/folders" element={<Folders />} />
            <Route path="/subcategories" element={<Subcategories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} /> {/* Orders route */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
