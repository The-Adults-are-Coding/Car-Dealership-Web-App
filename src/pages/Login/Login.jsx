// src/pages/Login/Login.jsx
import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import "./Login.css";

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
    // مسح الخطأ عند الكتابة
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
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Login data:", formData);
      // هنا هترسل البيانات للـ API
      alert("تم تسجيل الدخول بنجاح!");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Car Dealership</h1>
          <p>مرحباً بعودتك! يرجى تسجيل الدخول</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <InputField
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            icon="📧"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}

          <InputField
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            icon="🔒"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> تذكرني
            </label>
            <a href="#" className="forgot-password">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>

          <div className="register-link">
            ليس لديك حساب؟ <a href="#">سجل الآن</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
