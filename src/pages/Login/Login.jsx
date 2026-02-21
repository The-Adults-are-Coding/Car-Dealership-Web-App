// src/pages/Login/Login.jsx
import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import "./Login.css";
import carImage from "../../assets/images/car-showroom.avif";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Login data:", formData);
      alert("Login successful!");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Image */}
        <div className="login-image-side">
          <div className="image-overlay">
            <h1>Welcome Back!</h1>
            <p>Your journey to find the perfect car starts here</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-side">
          <div className="form-content">
            <h2>Sign In</h2>
            <p className="subtitle">Access your account</p>

            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                icon="✉️"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}

              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                icon="🔒"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}

              <button type="submit" className="login-button">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
