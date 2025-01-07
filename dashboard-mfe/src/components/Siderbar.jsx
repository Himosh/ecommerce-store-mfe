import { useEffect } from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("requests")) {
      setActiveTab("requests");
    } else if (location.pathname.includes("products")) {
      setActiveTab("products");
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
        <div
          className={`tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("requests");
            navigate("/requests");
          }}
        >
          <FiShoppingBag className="icon" />
          Requests
        </div>
        <div
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("products");
            navigate("/products");
          }}
        >
          <FiPackage className="icon" />
          Products
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
