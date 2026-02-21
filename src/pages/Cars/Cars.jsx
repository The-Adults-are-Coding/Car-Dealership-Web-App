import Table from "../../components/Table/Table";
import { mockCars } from "../../data/mockData";
import "./Cars.css";
import AddCar from "./AddCar";
import React, { useState } from "react";

const Cars = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [carsData, setCarsData] = useState(mockCars);

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

  const handleAddCar = (newCar) => {
    // Generate new ID
    const newId = Math.max(...carsData.map((c) => c.id)) + 1;
    const carWithId = {
      ...newCar,
      id: newId,
      carId: 1000 + newId,
    };

    setCarsData([...carsData, carWithId]);
    setIsAddModalOpen(false);
    alert("Car added successfully!");
  };

  return (
    <div className="page-container">
      <Table
        data={carsData}
        columns={columns}
        className="page-container-table"
        onAdd={() => setIsAddModalOpen(true)}
        title="Cars Management"
      />

      <AddCar
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCar}
      />
    </div>
  );
};

export default Cars;
