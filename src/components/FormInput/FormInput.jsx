import React from "react";
import "./FormInput.css";

const FormInput = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  placeholder = "",
  disabled = false,
  min,
  max,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="form-select"
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="form-input"
          />
        );

      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            rows="3"
            className="form-textarea"
          />
        );

      case "currency":
        return (
          <div className="currency-input">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step="0.01"
              className="form-input"
            />
          </div>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            className="form-input"
          />
        );
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormInput;
