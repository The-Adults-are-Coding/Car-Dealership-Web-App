import React from "react";
import Table from "../../components/Table/Table";
import { mockCars } from "../../data/mockData";
import "./Cars.css";

const Cars = () => {
  const columns = [
    { key: "carId", label: "Car ID" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "modelName", label: "Model" },
    { key: "carYear", label: "Year" },
    { key: "registrationYear", label: "Reg. Year" },
    { key: "color", label: "Color" },
    { key: "carCondition", label: "Condition" },
    {
      key: "price",
      label: "Price",
      render: (item) => `$${item.price?.toLocaleString() || "N/A"}`,
    },
    {
      key: "isSold",
      label: "Status",
      render: (item) => (
        <span
          className={`status-badge ${
            item.isSold === "Y" ? "status-sold" : "status-available"
          }`}
        >
          {item.isSold === "Y" ? "Sold" : "Available"}
        </span>
      ),
    },
    {
      key: "soldDate",
      label: "Sold Date",
      render: (item) =>
        item.soldDate ? new Date(item.soldDate).toLocaleDateString() : "-",
    },
    {
      key: "mileage",
      label: "Mileage",
      render: (item) => `${item.mileage?.toLocaleString() || 0} km`,
    },
  ];

  const handleAddCar = () => {
    alert("Add new car - Will open modal/form");
  };

  return (
    <div className="page-container">
      <Table
        data={mockCars}
        columns={columns}
        onAdd={handleAddCar}
        title="Cars Management"
      />
    </div>
  );
};

export default Cars;
