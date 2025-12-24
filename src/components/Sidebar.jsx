import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "220px",
        background: "#f5f5f5",
        padding: "20px",
        height: "100vh",
        boxSizing: "border-box"
      }}
    >
      <h3>Admin Panel</h3>

      <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/folders">Folders</Link></li>
        <li><Link to="/vendors">Vendors</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/subcategories">Subcategories</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li> {/* Added Orders */}
      </ul>
    </div>
  );
};

export default Sidebar;
