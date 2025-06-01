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
    console.log('Request Config:', config); // Log the request configuration
    return config;
  },
  (error) => {
    console.error('Request Error:', error); // Log any request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Data:', response.data); // Log the response data
    return response;
  },
  (error) => {
    console.error('Response Error:', error); // Log any response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;