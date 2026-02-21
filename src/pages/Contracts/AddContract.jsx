// src/pages/Contracts/AddContract.jsx
import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import FormInput from "../../components/FormInput/FormInput";
import "./AddContract.css";

const AddContract = ({
  isOpen,
  onClose,
  onSave,
  cars = [],
  customers = [],
}) => {
  const [formData, setFormData] = useState({
    contractNumber: "",
    customerId: "",
    carId: "",
    saleDate: new Date().toISOString().split("T")[0],
    paymentType: "",
    originalPrice: "",
    finalPrice: "",
    downPayment: "",
    remainingAmount: "",
    installmentMonths: "",
    monthlyPayment: "",
    totalAmountIncrease: "",
    paymentDueDay: "",
    firstPaymentDate: "",
    lastPaymentDate: "",
    contractStatus: "Pending",
    completionDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-calculate some fields
    if (
      name === "originalPrice" ||
      name === "downPayment" ||
      name === "installmentMonths"
    ) {
      calculatePayments();
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const calculatePayments = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const down = parseFloat(formData.downPayment) || 0;
    const months = parseInt(formData.installmentMonths) || 0;

    if (original > 0) {
      const remaining = original - down;
      const monthly = months > 0 ? remaining / months : 0;

      setFormData((prev) => ({
        ...prev,
        remainingAmount: remaining > 0 ? remaining.toFixed(2) : "",
        monthlyPayment: monthly > 0 ? monthly.toFixed(2) : "",
        finalPrice: original.toFixed(2),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.contractNumber)
      newErrors.contractNumber = "Contract number is required";
    if (!formData.customerId) newErrors.customerId = "Customer is required";
    if (!formData.carId) newErrors.carId = "Car is required";
    if (!formData.saleDate) newErrors.saleDate = "Sale date is required";
    if (!formData.paymentType)
      newErrors.paymentType = "Payment type is required";
    if (!formData.originalPrice)
      newErrors.originalPrice = "Original price is required";
    if (!formData.finalPrice) newErrors.finalPrice = "Final price is required";
    if (!formData.contractStatus)
      newErrors.contractStatus = "Status is required";

    // Validate payment type specific fields
    if (
      formData.paymentType === "Installment" ||
      formData.paymentType === "Financing"
    ) {
      if (!formData.downPayment)
        newErrors.downPayment = "Down payment is required";
      if (!formData.installmentMonths)
        newErrors.installmentMonths = "Installment months is required";
      if (!formData.paymentDueDay)
        newErrors.paymentDueDay = "Payment due day is required";
      if (!formData.firstPaymentDate)
        newErrors.firstPaymentDate = "First payment date is required";
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
        contractNumber: "",
        customerId: "",
        carId: "",
        saleDate: new Date().toISOString().split("T")[0],
        paymentType: "",
        originalPrice: "",
        finalPrice: "",
        downPayment: "",
        remainingAmount: "",
        installmentMonths: "",
        monthlyPayment: "",
        totalAmountIncrease: "",
        paymentDueDay: "",
        firstPaymentDate: "",
        lastPaymentDate: "",
        contractStatus: "Pending",
        completionDate: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  const paymentTypeOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Installment", label: "Installment" },
    { value: "Financing", label: "Financing" },
    { value: "Lease", label: "Lease" },
  ];

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Active", label: "Active" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const dueDayOptions = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ value: i, label: i.toString() });
    }
    return days;
  };

  const monthOptions = () => {
    const months = [];
    for (let i = 1; i <= 60; i++) {
      months.push({ value: i, label: `${i} months` });
    }
    return months;
  };

  const isInstallment =
    formData.paymentType === "Installment" ||
    formData.paymentType === "Financing";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Contract">
      <form onSubmit={handleSubmit} className="add-form contract-form">
        <div className="form-row">
          <FormInput
            type="text"
            label="Contract Number"
            name="contractNumber"
            value={formData.contractNumber}
            onChange={handleChange}
            required
            placeholder="CTR-2024-XXX"
          />
          {errors.contractNumber && (
            <span className="error-text">{errors.contractNumber}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Customer"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            options={customers.map((c) => ({
              value: c.customerId,
              label: c.customerName,
            }))}
            required
          />
          {errors.customerId && (
            <span className="error-text">{errors.customerId}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Car"
            name="carId"
            value={formData.carId}
            onChange={handleChange}
            options={cars
              .filter((car) => car.isSold === "N")
              .map((car) => ({
                value: car.carId,
                label: `${car.manufacturer} ${car.modelName} ${car.carYear} - $${car.price}`,
              }))}
            required
          />
          {errors.carId && <span className="error-text">{errors.carId}</span>}
        </div>

        <div className="form-row">
          <FormInput
            type="date"
            label="Sale Date"
            name="saleDate"
            value={formData.saleDate}
            onChange={handleChange}
            required
          />
          {errors.saleDate && (
            <span className="error-text">{errors.saleDate}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="select"
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            options={paymentTypeOptions}
            required
          />
          {errors.paymentType && (
            <span className="error-text">{errors.paymentType}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="currency"
            label="Original Price"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            required
            min="0"
          />
          {errors.originalPrice && (
            <span className="error-text">{errors.originalPrice}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="currency"
            label="Final Price"
            name="finalPrice"
            value={formData.finalPrice}
            onChange={handleChange}
            required
            min="0"
          />
          {errors.finalPrice && (
            <span className="error-text">{errors.finalPrice}</span>
          )}
        </div>

        {isInstallment && (
          <>
            <div className="form-row">
              <FormInput
                type="currency"
                label="Down Payment"
                name="downPayment"
                value={formData.downPayment}
                onChange={handleChange}
                required
                min="0"
              />
              {errors.downPayment && (
                <span className="error-text">{errors.downPayment}</span>
              )}
            </div>

            <div className="form-row">
              <FormInput
                type="currency"
                label="Remaining Amount"
                name="remainingAmount"
                value={formData.remainingAmount}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-row">
              <FormInput
                type="select"
                label="Installment Months"
                name="installmentMonths"
                value={formData.installmentMonths}
                onChange={handleChange}
                options={monthOptions()}
                required
              />
              {errors.installmentMonths && (
                <span className="error-text">{errors.installmentMonths}</span>
              )}
            </div>

            <div className="form-row">
              <FormInput
                type="currency"
                label="Monthly Payment"
                name="monthlyPayment"
                value={formData.monthlyPayment}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-row">
              <FormInput
                type="currency"
                label="Total Amount Increase"
                name="totalAmountIncrease"
                value={formData.totalAmountIncrease}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-row">
              <FormInput
                type="select"
                label="Payment Due Day"
                name="paymentDueDay"
                value={formData.paymentDueDay}
                onChange={handleChange}
                options={dueDayOptions()}
                required
              />
              {errors.paymentDueDay && (
                <span className="error-text">{errors.paymentDueDay}</span>
              )}
            </div>

            <div className="form-row">
              <FormInput
                type="date"
                label="First Payment Date"
                name="firstPaymentDate"
                value={formData.firstPaymentDate}
                onChange={handleChange}
                required
              />
              {errors.firstPaymentDate && (
                <span className="error-text">{errors.firstPaymentDate}</span>
              )}
            </div>

            <div className="form-row">
              <FormInput
                type="date"
                label="Last Payment Date"
                name="lastPaymentDate"
                value={formData.lastPaymentDate}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-row">
          <FormInput
            type="select"
            label="Contract Status"
            name="contractStatus"
            value={formData.contractStatus}
            onChange={handleChange}
            options={statusOptions}
            required
          />
          {errors.contractStatus && (
            <span className="error-text">{errors.contractStatus}</span>
          )}
        </div>

        <div className="form-row">
          <FormInput
            type="date"
            label="Completion Date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Contract
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddContract;
