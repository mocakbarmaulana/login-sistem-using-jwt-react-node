import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 1000,
});
