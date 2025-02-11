import { AuthRequest, AuthResponse, TelegramAuthData } from "./types"; // Импортируем типы
import { rootApi } from "@/shared/api/rootApi";

export const authApi = rootApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<AuthResponse, AuthRequest>({
         // Используем AuthResponse и AuthRequest
         query: (body) => ({
            url: "user_sait/",
            method: "POST",
            body,
         }),
      }),
      login: builder.mutation<AuthResponse, AuthRequest>({
         // Используем AuthResponse и AuthRequest
         query: (body) => ({
            url: "user/auth/",
            method: "POST",
            body,
         }),
      }),

      telegramAuth: builder.mutation<AuthResponse, { telegram_id: string }>({
         query: ({ telegram_id }) => ({
            url: `user/telegram/${telegram_id}`,
            method: "POST",
         }),
      }),
      checkAuth: builder.query<AuthResponse["user"], void>({
         // Используем AuthResponse для получения данных пользователя
         query: () => ({
            url: "/user/protected/",
            method: "GET",
         }),
      }),
   }),
});

export const {
   useRegisterMutation,
   useLoginMutation,
   useTelegramAuthMutation,
   useCheckAuthQuery,
} = authApi;
