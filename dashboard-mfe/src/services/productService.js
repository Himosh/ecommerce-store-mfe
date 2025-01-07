import axios from "axios";

// export const dashboardAxios = axios.create({
//   baseURL: "http://localhost:8083/api/v1/products/",
//   timeout: 5000,
// });

// const BASE_URL = "http://localhost:8083/api/v1/products";

const BASE_URL = `http://localhost:3000/bff`

export const ProductService = {

    //  getAllCategories : async () => {
    //     const response = await axios.get('http://localhost:8083/api/v1/products/categories');
    //     return response.data;
    //   },
      
    //    getProductsByCategory : async (categoryId, page = 0, size = 10) => {
    //     const response = await axios.get('http://localhost:8083/api/v1/products/search-by-category-id', { params: { categoryId, page, size } });
    //     return response.data;
    //   },

    getAllCategories : async () => {
      const response = await axios.get(`${BASE_URL}/product-category/categories`);
      return response.data;
    },

    getProductsByCategory : async (categoryId, page = 0, size = 10) => {
      const response = await axios.get(`${BASE_URL}/products/search-by-category-id`, { params: { categoryId, page, size } });
      return response.data;
    }
  
};
