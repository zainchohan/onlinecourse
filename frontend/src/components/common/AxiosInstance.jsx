import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://onlinecourse-phv8.onrender.com', 
});

export default axiosInstance;