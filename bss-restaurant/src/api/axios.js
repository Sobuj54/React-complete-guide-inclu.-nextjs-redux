import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
