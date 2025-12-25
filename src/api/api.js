import axios from "axios";

const adminAPI = axios.create({
  baseURL: "https://solebackend.onrender.com/api",
});

adminAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAPI;
