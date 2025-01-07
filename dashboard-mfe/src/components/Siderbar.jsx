import React, { useEffect } from "react";
import { FiPackage, FiShoppingBag, FiList } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "ADMIN";
  const isDataSteward = user?.role === "DATA_STEWARD";

  useEffect(() => {
    if (location.pathname.includes("dashboard/requests")) {
      setActiveTab("requests");
    } else if (location.pathname.includes("dashboard/products")) {
      setActiveTab("products");
    } else if (location.pathname.includes("dashboard/orders")) {
      setActiveTab("orders");
    }
  }, [location.pathname, setActiveTab]);

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img
          src="https://companieslogo.com/img/orig/SYY_BIG-3ab23a28.png?t=1720244494"
          alt="Company Logo"
          className="logo"
        />
      </div>
      <h2>Seller Portal</h2>
      <nav>
        {(isAdmin || isDataSteward) && (
          <div
            className={`tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("products");
              navigate("/dashboard/products");
            }}
          >
            <FiPackage className="icon" />
            Products
          </div>
        )}
        {isAdmin && (
          <div
            className={`tab ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("requests");
              navigate("/dashboard/requests");
            }}
          >
            <FiShoppingBag className="icon" />
            Requests
          </div>
        )}
        {isAdmin && (
          <div
            className={`tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("orders");
              navigate("/dashboard/orders");
            }}
          >
            <FiList className="icon" />
            Orders
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
