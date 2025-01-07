import React from "react";
import "./ProductForm.css";


const ProductForm = ({ editProduct, setEditProduct, handleUpdateProduct }) => {
  return (
    <div className="form-container">
      <h3>{editProduct.id ? "Edit" : "Add"} Product</h3>
      <form onSubmit={handleUpdateProduct}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            required
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            required
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            required
            min="0"
            value={editProduct.stock}
            onChange={(e) => setEditProduct({ ...editProduct, stock: parseInt(e.target.value) })}
          />
        </div>
        <div className="buttons-container">
          <button type="button" className="cancel-btn" onClick={() => setEditProduct(null)}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
