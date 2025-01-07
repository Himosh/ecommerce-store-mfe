import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Siderbar";
import ProductTable from "./components/ProductTable ";
import ProductRequestTable from "./components/ProductRequestTable";
import './App.css';
import OrderTable from "./components/OrderTable";

const App = () => {
  const [activeTab, setActiveTab] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/" />;
  }

  const isAdmin = user.role === "ADMIN";
  const isDataSteward = user.role === "DATA_STEWARD";

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
    <Router>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        <Routes>
          {(isAdmin || isDataSteward) && (
            <Route path="/dashboard/products" element={<ProductTable />} />
          )}
          {isAdmin && <Route path="/dashboard/requests" element={<ProductRequestTable />} />}
          {isAdmin && <Route path="/dashboard/orders" element={<OrderTable />} />}
         
          {/* <Route path="*" element={<Navigate to={isAdmin ? "/dashboard/requests" : "/dashboard/products"} />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
