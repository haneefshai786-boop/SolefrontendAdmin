import axios from "axios";

const API = axios.create({
  baseURL: "https://solebackend.onrender.com/api/admin/auth/login",
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
