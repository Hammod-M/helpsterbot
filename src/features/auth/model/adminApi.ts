import { AuthRequest, AuthResponse, TelegramAuthData } from "./types"; // Импортируем типы

import { adminApi } from "@/shared/api/adminApi";

export const adminAuthApi = adminApi.injectEndpoints({
   endpoints: (builder) => ({
      adminLogin: builder.mutation<AuthResponse, AuthRequest>({
         query: (body) => ({
            url: "admin/auth/",
            method: "POST",
            body,
         }),
      }),

      checkAdminAuth: builder.query<AuthResponse["user"], void>({
         // Используем AuthResponse для получения данных пользователя
         query: () => ({
            url: "/admin/protected/",
            method: "GET",
         }),
      }),
   }),
});

export const { useAdminLoginMutation, useCheckAdminAuthQuery } = adminAuthApi;
