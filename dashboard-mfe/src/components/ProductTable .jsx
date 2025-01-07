import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ModalForm from "./AddCatalogModal";
import { DashboardService } from "../services/dashboardService";
import './Table.css'
import AddCatalogModal from "./AddCatalogModal";
import UpdateCatalogModal from "./UpdateCatalogModal";


const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0); 
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await DashboardService.getAllProductsDashboard(page, size);
      
        const { content, totalElements } = response.data; // Destructure data
        setProducts(content); // Set content as products
        setTotalElements(totalElements); // Set the total number of products
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, size]);

  return (
    <div className="table-container">
      <div className="table-header">
      <h1>Product Catalog</h1>
      <div className="header-button">
      <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
        Add New Catalog
      </Button>
      <AddCatalogModal open={addModalOpen} onClose={() => setAddModalOpen(false)}/>
      <Button variant="contained" color="primary" onClick={() => setUpdateModalOpen(true)}>
        Update Catalog
      </Button>
      <UpdateCatalogModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} />
      </div>
      </div>
      <DataGrid
        rows={products}
        columns={[
          { field: "productId", headerName: "ID", width: 100 },
          { field: "supplierId", headerName: "Supplier ID", width: 150 },
          { field: "name", headerName: "Name", width: 150 },
          { field: "categoryName", headerName: "Category", width: 150 },
          { field: "price", headerName: "Price", width: 150 },
          { field: "stock", headerName: "Stock", width: 150 },
        ]}
        pageSize={size}
        rowsPerPageOptions={[10, 20, 30]}
        loading={loading}
        pagination
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setSize(newPageSize)}
        page={page} // Ensure the page number is set
        rowCount={totalElements} // Set the total count for pagination
        getRowId={(row) => row.productId}
      />
    </div>
  );
};

export default ProductTable;
