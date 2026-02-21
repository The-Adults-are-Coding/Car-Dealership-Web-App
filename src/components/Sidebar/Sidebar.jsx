import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { path: "/cars", icon: "🚗", label: "Cars" },
    { path: "/customers", icon: "👤", label: "Customers" },
    { path: "/contracts", icon: "📄", label: "Contracts" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Car Dealership</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
