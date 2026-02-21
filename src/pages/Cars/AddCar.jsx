// src/pages/Cars/AddCar.jsx
import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import FormInput from "../../components/FormInput/FormInput";
import "./AddCar.css";

const AddCar = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    manufacturer: "",
    modelName: "",
    carYear: new Date().getFullYear(),
    registrationYear: new Date().getFullYear(),
    color: "",
    carCondition: "",
    price: "",
    isSold: "N",
    soldDate: "",
    mileage: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.manufacturer)
      newErrors.manufacturer = "Manufacturer is required";
    if (!formData.modelName) newErrors.modelName = "Model name is required";
    if (!formData.carYear) newErrors.carYear = "Year is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.carCondition)
      newErrors.carCondition = "Condition is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.isSold === "Y" && !formData.soldDate) {
      newErrors.soldDate = "Sold date is required when car is sold";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
      // Reset form
      setFormData({
        manufacturer: "",
        modelName: "",
        carYear: new Date().getFullYear(),
        registrationYear: new Date().getFullYear(),
        color: "",
        carCondition: "",
        price: "",
        isSold: "N",
        soldDate: "",
        mileage: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  const conditionOptions = [
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
    { value: "Certified", label: "Certified Pre-Owned" },
  ];

  const yearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 30; i++) {
      const year = currentYear - i;
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Car">
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-row">
          <FormInput
            type="text"
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
            placeholder="e.g., Toyota, Honda, BMW"
          />
          {errors.manufacturer && (
            <span className="error-text">{errors.manufacturer}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="text"
            label="Model Name"
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
            required
            placeholder="e.g., Camry, Civic, X5"
          />
          {errors.modelName && (
            <span className="error-text">{errors.modelName}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Car Year"
            name="carYear"
            value={formData.carYear}
            onChange={handleChange}
            options={yearOptions()}
            required
          />
          {errors.carYear && (
            <span className="error-text">{errors.carYear}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Registration Year"
            name="registrationYear"
            value={formData.registrationYear}
            onChange={handleChange}
            options={yearOptions()}
          />
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            options={[
              { value: "Black", label: "Black" },
              { value: "White", label: "White" },
              { value: "Silver", label: "Silver" },
              { value: "Gray", label: "Gray" },
              { value: "Red", label: "Red" },
              { value: "Blue", label: "Blue" },
              { value: "Green", label: "Green" },
              { value: "Brown", label: "Brown" },
              { value: "Yellow", label: "Yellow" },
              { value: "Orange", label: "Orange" },
            ]}
            required
          />
          {errors.color && <span className="error-text">{errors.color}</span>}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Condition"
            name="carCondition"
            value={formData.carCondition}
            onChange={handleChange}
            options={conditionOptions}
            required
          />
          {errors.carCondition && (
            <span className="error-text">{errors.carCondition}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="currency"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="0.00"
            min="0"
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Status"
            name="isSold"
            value={formData.isSold}
            onChange={handleChange}
            options={[
              { value: "N", label: "Available" },
              { value: "Y", label: "Sold" },
            ]}
          />
        </div>

        {formData.isSold === "Y" && (
          <div className="form-row">
            <FormInput
              type="date"
              label="Sold Date"
              name="soldDate"
              value={formData.soldDate}
              onChange={handleChange}
              required
            />
            {errors.soldDate && (
              <span className="error-text">{errors.soldDate}</span>
            )}
          </div>
        )}

        <div className="form-row">
          <FormInput
            type="number"
            label="Mileage (km)"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Car
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCar;
