import axios, { AxiosInstance } from "axios";
import { API_URL } from "./client"; // Импортируем URL из client.ts

export default function setupInterceptors(instance: AxiosInstance) {
   instance.interceptors.response.use(
      (response) => response,
      async (error) => {
         const originalRequest = error.config;
         console.log("inseterceptors", error.response?.status);
         if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("inseterceptors 401", originalRequest);
            try {
               // const refreshToken = localStorage.getItem("refresh_token");
               const response = await axios.get(
                  `${API_URL}/user/protected` // Используем наш фиксированный URL
               );

               localStorage.setItem("access_token", response.data.access_token);
               originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
               return instance(originalRequest);
            } catch (refreshError) {
               // localStorage.removeItem("access_token");
               // localStorage.removeItem("refresh_token");
               // window.location.href = "/auth/signin";
               console.error("Ошибка обновления токена", refreshError);
               return Promise.reject(refreshError);
            }
         }
         return Promise.reject(error);
      }
   );
}

// 1. Обновляем interceptors.ts (убираем логику с refresh token)
// import { AxiosInstance } from "axios";
// import { API_URL } from "./client";

// export default function setupInterceptors(instance: AxiosInstance) {
//    instance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//          if (error.response?.status === 401) {
//             // localStorage.removeItem("access_token");
//             // window.location.href = "/auth/signin";

//          }
//          return Promise.reject(error);
//       }
//    );
// }
