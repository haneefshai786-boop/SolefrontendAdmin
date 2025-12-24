import React from "react";
import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </div>
    </div>
  );
};

export default Dashboard;
