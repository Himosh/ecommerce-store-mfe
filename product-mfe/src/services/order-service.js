import axios from "axios";

// const BASE_URL = "http://localhost:8084/api/v1/order";

// export const createOrderFromCart = async (cartId) => {
//   const response = await axios.post(`${BASE_URL}/create-order-from-cart/${cartId}`);
//   return response.data; // Assuming your API returns the created order
// };

const BASE_URL = "http://localhost:3000/bff/order";

export const createOrderFromCart = async (cartId) => {
  const response = await axios.post(`${BASE_URL}/create-order-from-cart/${cartId}`);
  return response.data; // Assuming your API returns the created order
};
