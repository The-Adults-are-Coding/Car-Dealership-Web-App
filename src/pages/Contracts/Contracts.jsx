// src/pages/Contracts/Contracts.jsx
import React from "react";
import Table from "../../components/Table/Table";
import { mockContracts } from "../../data/mockData";
import "./Contracts.css";

const Contracts = () => {
  const columns = [
    { key: "contractId", label: "Contract ID" },
    { key: "contractNumber", label: "Contract #" },
    { key: "customerId", label: "Customer ID" },
    { key: "customerName", label: "Customer Name" },
    { key: "carId", label: "Car ID" },
    { key: "carModel", label: "Car Model" },
    {
      key: "saleDate",
      label: "Sale Date",
      render: (item) => new Date(item.saleDate).toLocaleDateString(),
    },
    { key: "paymentType", label: "Payment Type" },
    {
      key: "originalPrice",
      label: "Original Price",
      render: (item) => `$${item.originalPrice?.toLocaleString()}`,
    },
    {
      key: "finalPrice",
      label: "Final Price",
      render: (item) => `$${item.finalPrice?.toLocaleString()}`,
    },
    {
      key: "downPayment",
      label: "Down Payment",
      render: (item) =>
        item.downPayment ? `$${item.downPayment.toLocaleString()}` : "-",
    },
    {
      key: "remainingAmount",
      label: "Remaining",
      render: (item) =>
        item.remainingAmount
          ? `$${item.remainingAmount.toLocaleString()}`
          : "-",
    },
    {
      key: "installmentMonths",
      label: "Installment Months",
      render: (item) => item.installmentMonths || "-",
    },
    {
      key: "monthlyPayment",
      label: "Monthly Payment",
      render: (item) =>
        item.monthlyPayment ? `$${item.monthlyPayment.toLocaleString()}` : "-",
    },
    {
      key: "totalAmountIncrease",
      label: "Total Increase",
      render: (item) =>
        item.totalAmountIncrease
          ? `$${item.totalAmountIncrease.toLocaleString()}`
          : "-",
    },
    {
      key: "paymentDueDay",
      label: "Payment Due Day",
      render: (item) => item.paymentDueDay || "-",
    },
    {
      key: "firstPaymentDate",
      label: "First Payment",
      render: (item) =>
        item.firstPaymentDate
          ? new Date(item.firstPaymentDate).toLocaleDateString()
          : "-",
    },
    {
      key: "lastPaymentDate",
      label: "Last Payment",
      render: (item) =>
        item.lastPaymentDate
          ? new Date(item.lastPaymentDate).toLocaleDateString()
          : "-",
    },
    {
      key: "contractStatus",
      label: "Status",
      render: (item) => (
        <span
          className={`status-badge ${
            item.contractStatus === "Completed"
              ? "status-sold"
              : item.contractStatus === "Active"
              ? "status-active"
              : item.contractStatus === "Pending"
              ? "status-pending"
              : ""
          }`}
        >
          {item.contractStatus}
        </span>
      ),
    },
    {
      key: "completionDate",
      label: "Completion Date",
      render: (item) =>
        item.completionDate
          ? new Date(item.completionDate).toLocaleDateString()
          : "-",
    },
  ];

  const handleAddContract = () => {
    alert("Add new contract - Will open modal/form");
  };

  return (
    <div className="page-container">
      <Table
        data={mockContracts}
        columns={columns}
        onAdd={handleAddContract}
        title="Contracts Management"
      />
    </div>
  );
};

export default Contracts;
