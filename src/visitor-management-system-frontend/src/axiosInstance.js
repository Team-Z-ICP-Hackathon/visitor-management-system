
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://be2us-64aaa-aaaaa-qaabq-cai.ic0.app', // Your frontend canister ID
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
