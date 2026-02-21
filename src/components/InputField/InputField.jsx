// src/components/InputField/InputField.jsx
import React from "react";
import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, icon }) => {
  return (
    <div className="input-field">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};

export default InputField;
