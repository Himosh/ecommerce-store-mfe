import axios from 'axios';

const API_BASE_URL = 'http://localhost:8086/api/users'; // Replace with your backend URL

export const registerUser = async (userCreateDTO, adminUsername = null) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-user`,
      userCreateDTO,
      {
        params: adminUsername ? { adminUsername } : {},
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error during user registration.');
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sign-in`,
      null,
      {
        params: { username, password },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error during user login.');
  }
};

