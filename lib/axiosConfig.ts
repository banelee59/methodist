import axios from 'axios';


// Create an instance of axios with default settings
const axiosInstance = axios.create({
  baseURL: 'https://2e0d-105-245-164-232.ngrok-free.app', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// Optionally, you can add interceptors for requests and responses
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;