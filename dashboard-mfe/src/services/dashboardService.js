import axios from "axios";

// export const dashboardAxios = axios.create({
//   baseURL: "http://localhost:8083/api/v1/products/",
//   timeout: 5000,
// });

const BASE_URL = "http://localhost:8083/api/v1/products";

export const DashboardService = {
  
  getAllProductsDashboard: async (page, size) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: { page, size },
      });
      return response;
    } catch (error) {
      console.error("Error fetching products", error);
      throw new Error("Failed to fetch products");
    }
  },

  getProductCatalogRequests: async (page, size) => {
    try {
      const response = await axios.get(`${BASE_URL}/catalog-requests`, {
        params: { page, size },
      });
      return response;
    } catch (error) {
      console.error("Error fetching product catalog requests", error);
      throw new Error("Failed to fetch product catalog requests");
    }
  },

  updateProductRequestStatus: async (updateRequestStatusDTO) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-product-status`, updateRequestStatusDTO);
      return response.data;
    } catch (error) {
      console.error("Error updating request status", error);
      throw new Error("Failed to update request status");
    }
  },

  createCatalogRequest: async (catalogRequestDTO) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-catalog-request`, catalogRequestDTO);
      return response.data;
    } catch (error) {
      console.error("Error creating catalog request", error);
      throw new Error("Failed to create catalog request");
    }
  },
};
