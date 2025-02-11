import axios from "axios";
import setupInterceptors from "./interceptors";

// Жестко задаем URL без использования переменных окружения
export const API_URL = "https://api.helpsterbot.ru";

const axiosInstance = axios.create({
   baseURL: API_URL, // Используем прямой URL
   headers: {
      "Content-Type": "application/json",
   },
});

setupInterceptors(axiosInstance);

export default axiosInstance;
