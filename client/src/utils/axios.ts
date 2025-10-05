import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Base URL
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;