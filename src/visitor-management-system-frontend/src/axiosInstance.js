
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Update with your backend URL
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
