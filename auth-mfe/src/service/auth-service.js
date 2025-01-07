import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/users/signin`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error.response ? error.response.data : error;
  }
};
