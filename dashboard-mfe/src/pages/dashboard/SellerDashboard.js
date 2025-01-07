import React, { useState } from "react";
import Sidebar from "../../components/Siderbar";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import OrdersTable from "../../components/OrdersTable ";
import ProductsTable from "../../components/ProductTable ";
import ProductForm from "../../components/products-form/ProductForm ";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  
  // Dummy orders data
  const [orders, setOrders] = useState([
    { id: "ORD001", customerName: "John Doe", product: "Gaming Laptop", status: "Pending", total: 1299.99 },
    { id: "ORD002", customerName: "Jane Smith", product: "Wireless Headphones", status: "Completed", total: 199.99 },
    { id: "ORD003", customerName: "Mike Ross", product: "Smartphone", status: "Pending", total: 999.99 },
    { id: "ORD004", customerName: "Rachel Zane", product: "Bluetooth Speaker", status: "Completed", total: 49.99 },
  ]);

  // Dummy products data
  const [products, setProducts] = useState([
    { id: "PRD001", name: "Gaming Laptop", description: "High-performance gaming laptop", price: 1299.99, stock: 10, image: "https://via.placeholder.com/150" },
    { id: "PRD002", name: "Wireless Headphones", description: "Premium wireless headphones", price: 199.99, stock: 25, image: "https://via.placeholder.com/150" },
    { id: "PRD003", name: "Smartphone", description: "Latest 5G smartphone", price: 999.99, stock: 15, image: "https://via.placeholder.com/150" },
    { id: "PRD004", name: "Bluetooth Speaker", description: "Portable and powerful speaker", price: 49.99, stock: 50, image: "https://via.placeholder.com/150" },
  ]);

  const [editProduct, setEditProduct] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleEditProduct = (product) => setEditProduct(product);

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
  };

  return (
    <div className="container">
      <Sidebar className="sidebar" activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {activeTab === "orders" ? (
              <><DashboardHeader title="Orders"></DashboardHeader><OrdersTable
            orders={orders}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus} /></>
        ) : (
          <>
            <DashboardHeader title="Products">
              <button
                className="add-product-btn"
                onClick={() =>
                  setEditProduct({ id: "", name: "", description: "", price: 0, stock: 0 })
                }
              >
                Add Product
              </button>
            </DashboardHeader>
            {editProduct ? (
              <ProductForm
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                handleUpdateProduct={handleUpdateProduct}
              />
            ) : (
              <ProductsTable 
                products={products}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
