import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { ProductService } from "../services/productService";
import { DashboardService } from "../services/dashboardService";
import "./ModalForm.css";

const UpdateCatalogModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    productId: "",
    categoryId: "",
    supplierId: "SUPPLIER_123",
    requestType: "",
    newProductName: "",
    newDescription: "",
    stock: 0,
    price: 0,
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await ProductService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [open]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, categoryId });
    setLoading(true);
    try {
      const response = await ProductService.getProductsByCategory(categoryId);
      setProducts(response.content || []); // Safeguard
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await DashboardService.createCatalogRequest([formData]);
      onClose();
    } catch (error) {
      console.error("Failed to submit catalog request:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="modal-container">
      <Box sx={{ padding: 4, background: "white", borderRadius: 4 }}>
        <h2>Update or Delete Catalog Request</h2>
        <form>
          <div className="form-row">
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId || ""} // Safeguard
              onChange={handleCategoryChange}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Product</InputLabel>
            <Select
              name="productId"
              value={formData.productId || ""} // Safeguard
              onChange={handleChange}
              fullWidth
            >
              {products.length ? (
                products.map((product) => (
                  <MenuItem key={product.productId} value={product.productId}>
                    {product.name || "Unnamed Product"}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No Products Available
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Request Type</InputLabel>
            <Select
              name="requestType"
              value={formData.requestType || ""} // Safeguard
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="UPDATE">Update</MenuItem>
              <MenuItem value="DELETE">Delete</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div className="form-row">

          <TextField
            label="Product Name"
            name="newProductName"
            value={formData.newProductName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          </div>
          <TextField
            label="Description"
            name="newDescription"
            value={formData.newDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <div className="form-row">
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>

          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateCatalogModal;
