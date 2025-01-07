import axios from "axios";

const BASE_URL = "http://localhost:3000/bff/cart";

export async function getCartByUserId(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
}

export async function createCart(userId) {
  try {
    const response = await axios.post(`${BASE_URL}/create-cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create cart");
  }
}

export async function addOrUpdateProduct(cartId, productId, quantity) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/add-or-update/${cartId}`,
      null,
      {
        params: { productId, quantity },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update cart");
  }
}

export async function removeProductFromCart(cartId, productId) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${cartId}/remove`,
      null,
      {
        params: { productId },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove product from cart");
  }
}
