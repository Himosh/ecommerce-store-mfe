import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Siderbar";
import ProductTable from "./components/ProductTable ";
import ProductRequestTable from "./components/ProductRequestTable";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <Router basename="/dashboard">
      <div className="app">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">
          <Routes>
            <Route
              path="/products"
              element={<ProductTable activeTab={activeTab} />}
            />
            <Route
              path="/requests"
              element={<ProductRequestTable activeTab={activeTab} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
