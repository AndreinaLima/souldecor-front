// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://souldecor-back.onrender.com/api",
})

const getToken = () => sessionStorage.getItem('token');

api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
