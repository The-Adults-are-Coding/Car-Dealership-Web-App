// src/pages/Customers/AddCustomer.jsx
import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import FormInput from "../../components/FormInput/FormInput";
import "./AddCustomer.css";

const AddCustomer = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    nationalId: "",
    phoneNumber: "",
    address: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName)
      newErrors.customerName = "Customer name is required";
    if (!formData.nationalId) newErrors.nationalId = "National ID is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.occupation) newErrors.occupation = "Occupation is required";

    // Validate phone number format (simple check)
    if (
      formData.phoneNumber &&
      !/^[\d\+\-\(\)\s]+$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
      setFormData({
        customerName: "",
        nationalId: "",
        phoneNumber: "",
        address: "",
        occupation: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Customer">
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-row">
          <FormInput
            type="text"
            label="Full Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Enter customer full name"
          />
          {errors.customerName && (
            <span className="error-text">{errors.customerName}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="text"
            label="National ID"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
            placeholder="Enter national ID"
          />
          {errors.nationalId && (
            <span className="error-text">{errors.nationalId}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="+1234567890"
          />
          {errors.phoneNumber && (
            <span className="error-text">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="textarea"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter full address"
          />
          {errors.address && (
            <span className="error-text">{errors.address}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="text"
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            placeholder="e.g., Engineer, Doctor, Teacher"
          />
          {errors.occupation && (
            <span className="error-text">{errors.occupation}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Customer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCustomer;
