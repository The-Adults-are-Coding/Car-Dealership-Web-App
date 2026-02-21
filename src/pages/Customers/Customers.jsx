// src/pages/Customers/Customers.jsx
import React, { useState } from "react";
import AddCustomer from "./AddCustomer";
import Table from "../../components/Table/Table";
import { mockCustomers } from "../../data/mockData";
import "./Customers.css";

const Customers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customersData, setCustomersData] = useState(mockCustomers);
  const columns = [
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Full Name" },
    { key: "nationalId", label: "National ID" },
    { key: "phoneNumber", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "occupation", label: "Occupation" },
  ];

  const handleAddCustomer = (newCustomer) => {
    const newId = (
      Math.max(...customersData.map((c) => parseInt(c.id))) + 1
    ).toString();
    const customerWithId = {
      ...newCustomer,
      id: newId,
      customerId: `CUST${String(newId).padStart(3, "0")}`,
    };

    setCustomersData([...customersData, customerWithId]);
    setIsAddModalOpen(false);
    alert("Customer added successfully!");
  };

  return (
    <div className="page-container">
      <Table
        data={customersData}
        columns={columns}
        onAdd={() => setIsAddModalOpen(true)}
        title="Customers Management"
      />

      <AddCustomer
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCustomer}
      />
    </div>
  );
};

export default Customers;
