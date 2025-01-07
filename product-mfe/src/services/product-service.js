import axios from 'axios';
const apiClient = axios.create({
  baseURL: `http://localhost:3000/bff/products`,
});

export const getAllProducts = async (page = 0, size = 10) => {
  const response = await apiClient.get('', { params: { page, size } });
  return response.data;
};

export const getAllCategories = async () => {
  const response = await axios.get('http://localhost:3000/bff/product-category/categories');
  return response.data;
};

export const getProductsByCategory = async (category, page = 0, size = 10) => {
  const response = await apiClient.get('/', { params: { category, page, size } });
  return response.data;
};

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/${productId}`);
    return response.data; // Axios exposes the data directly
  } catch (error) {
    throw new Error("Error fetching product details.");
  }
};



export const getProductsBySupplierId = async (supplierId, page = 0, size = 10) => {
  const response = await apiClient.get('/', { params: { supplierId, page, size } });
  return response.data;
};

export const searchProductsByCategoryName = async (categoryName, page = 0, size = 10) => {
  const response = await apiClient.get('/', { params: { categoryName, page, size } });
  return response.data;
};

// export const searchProductsByProductName = async (productName, page = 0, size = 10) => {
//   console.log(productName);
//   const response = await apiClient.get('/', { params: { productName, page, size } });
//   return response.data;
// };

export const submitChangeRequests = async (requestList) => {
  const response = await apiClient.patch('/catalog', requestList);
  return response.data;
};

export const downloadPendingProducts = async (supplierId) => {
  const response = await apiClient.get('/download-pending', {
    params: { supplierId },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'pending_products.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const uploadApprovedProducts = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/approve', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const searchProductsByProductName = async (name, page = 0, size = 10) => {
  try {
    const response = await axios.post(
      `http://localhost:8083/api/v1/products/search-product`, 
      null,
      {
        params: { 
          name,
          page,
          size
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to search products: " + error.message);
  }
};
