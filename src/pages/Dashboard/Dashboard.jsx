import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Cars from "../Cars/Cars";
import Customers from "../Customers/Customers";
import Contracts from "../Contracts/Contracts";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/cars" replace />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/contracts" element={<Contracts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
