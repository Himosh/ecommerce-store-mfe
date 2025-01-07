import React, { useState, useEffect } from "react";
import { OrderService } from "../services/OrderService"; 
import { DataGrid } from "@mui/x-data-grid";
import './Table.css';

const OrderTable = ({ activeTab }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await OrderService.getAllOrders(page, size);
          const { content, totalElements } = response;

          const transformedOrders = content.map((item) => ({
            ...item,
            id: item.id,
            orderDate: new Date(item.orderDate).toLocaleString() // Format date
          }));

          setOrders(transformedOrders);
          setTotalElements(totalElements);
        } catch (error) {
          console.error("Error fetching orders:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
  }, [page, size, activeTab]);

  return (
    <div className="table-container">
      <h1>Orders</h1>
      <DataGrid
        rows={orders}
        columns={[
          { field: "id", headerName: "Order ID", width: 150 },
          { field: "userId", headerName: "User ID", width: 200 },
          { field: "orderStatus", headerName: "Status", width: 150 },
          { field: "totalAmount", headerName: "Total Amount", width: 150 },
          { field: "orderDate", headerName: "Order Date", width: 250 }
        ]}
        pageSize={size}
        rowsPerPageOptions={[10, 20, 30]}
        loading={loading}
        pagination
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setSize(newPageSize)}
        rowCount={totalElements}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default OrderTable;
