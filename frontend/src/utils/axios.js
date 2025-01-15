import axios from "axios";
import { BASE_URL } from "./constants";

const apiInstance = axios.create({
  baseURL: BASE_URL, // "http://127.0.0.1:8080"
  timeout: 380000,
  withCredentials: false, // CORS ile kimlik doğrulama gerekmediği için false
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiInstance;
