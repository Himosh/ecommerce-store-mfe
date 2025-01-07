import axios from "axios";

const BASE_URL = "http://localhost:8084/api/v1/order";

export const OrderService = {
  getAllOrders: async (page, size) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders", error);
      throw new Error("Failed to fetch orders");
    }
  }
};
