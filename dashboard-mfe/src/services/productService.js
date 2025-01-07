import axios from "axios";

const BASE_URL = `http://localhost:3000/bff`

export const ProductService = {

    getAllCategories : async () => {
      const response = await axios.get(`${BASE_URL}/product-category/categories`);
      return response.data;
    },

    getProductsByCategory : async (categoryId, page = 0, size = 10) => {
      const response = await axios.get(`${BASE_URL}/products/search-by-category-id`, { params: { categoryId, page, size } });
      return response.data;
    }
  
};
