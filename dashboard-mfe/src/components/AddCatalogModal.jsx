import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { ProductService } from "../services/productService";
import { DashboardService } from "../services/dashboardService";
import "./ModalForm.css";

const AddCatalogModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    newProductName: "",
    newDescription: "",
    stock: 0,
    price: 0,
    requestType: "ADD",
  });
  const [categories, setCategories] = useState([]);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const supplierId = "SUPPLIER_123";
      const payload = { ...formData, supplierId };
      await DashboardService.createCatalogRequest([payload]);
      onClose();
    } catch (error) {
      console.error("Failed to submit catalog request:", error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="modal-container">
      <Box sx={{ padding: 4, background: "white", borderRadius: 4 }}>
        <h2>Create Catalog Request</h2>
        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Product Name"
            name="newProductName"
            value={formData.newProductName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCatalogModal;
