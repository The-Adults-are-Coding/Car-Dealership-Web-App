// src/pages/Customers/Customers.jsx
import React from "react";
import Table from "../../components/Table/Table";
import { mockCustomers } from "../../data/mockData";
import "./Customers.css";

const Customers = () => {
  const columns = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Full Name" },
    { key: "nationalId", label: "National ID" },
    { key: "phoneNumber", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "occupation", label: "Occupation" },
  ];

  const handleAddCustomer = () => {
    alert("Add new customer - Will open modal/form");
  };

  return (
    <div className="page-container">
      <Table
        data={mockCustomers}
        columns={columns}
        onAdd={handleAddCustomer}
        title="Customers Management"
      />
    </div>
  );
};

export default Customers;
