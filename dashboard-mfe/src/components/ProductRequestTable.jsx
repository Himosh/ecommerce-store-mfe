import React, { useEffect, useState } from "react";
import { DashboardService } from "../services/dashboardService";
import { DataGrid } from "@mui/x-data-grid";
import './Table.css';

const ProductRequestTable = ({ activeTab }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch requests based on active tab, page, and size
  useEffect(() => {
    if (activeTab === "requests") {
      const fetchRequests = async () => {
        try {
          setLoading(true);
          const response = await DashboardService.getProductCatalogRequests(page, size);
          const { content, totalElements } = response.data;

          // Transform data: ensure `id` is based on `productCatalogRequestId`
          const transformedContent = content.map((item) => ({
            ...item,
            id: item.id, // Map `id` to `productCatalogRequestId`
          }));

          setRequests(transformedContent);
          setTotalElements(totalElements);
        } catch (error) {
          console.error("Error fetching product requests:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();
    }
  }, [page, size, activeTab]);

  // Handle status change via dropdown
  const handleStatusChange = async (id, status) => {
    try {
      await DashboardService.updateProductRequestStatus([
        { productCatalogRequestId: id, status },
      ]);

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error("Failed to update request status:", error.message);
    }
  };

  return (
    <div className="table-container">
      <h1>Product Requests</h1>
      <DataGrid
        rows={requests}
        columns={[
          { field: "id", headerName: "ID", width: 200 },
          { field: "newProductName", headerName: "Product Name", width: 200 },
          { field: "requestType", headerName: "Type", width: 200 },
          {
            field: "status",
            headerName: "Status",
            width: 200,
            renderCell: (params) => (
              <select
                value={params.row.status}
                onChange={(e) =>
                  handleStatusChange(
                    params.row.id,
                    e.target.value
                  )
                }
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            ),
          },
        ]}
        pageSize={size}
        rowsPerPageOptions={[10, 20, 30]}
        loading={loading}
        pagination
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setSize(newPageSize)}
        rowCount={totalElements}
        getRowId={(row) => row.id} // Use the correct ID mapping
      />
    </div>
  );
};

export default ProductRequestTable;
