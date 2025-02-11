import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "@/features/auth/model/slice";
import type { RootState } from "@/app/store/store";
import { API_URL } from "./client"; // Импортируем наш URL

const baseQuery = fetchBaseQuery({
   baseUrl: API_URL, // Используем прямой URL
   prepareHeaders: (headers, { getState }) => {
      console.log("access_tokenRoot", localStorage.getItem("access_token"));
      const token =
         (getState() as RootState).auth.user?.access_token ||
         localStorage.getItem("access_token");
      if (token) {
         console.log("token", token);
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
   console.log("baseQueryWithReauth", args, api, extraOptions);
   let result = await baseQuery(args, api, extraOptions);

   if (result.error?.status === 401) {
      try {
         const accessToken = localStorage.getItem("access_token");
         const protectedResponse = await fetchBaseQuery({
            baseUrl: API_URL, // Используем прямой URL
            prepareHeaders: (headers) => {
               if (accessToken) {
                  headers.set("Authorization", `Bearer ${accessToken}`);
               }
               return headers;
            },
         })(
            {
               url: "/user/protected/",
               method: "GET",
            },
            api,
            extraOptions
         );

         if (protectedResponse.data) {
            api.dispatch(setCredentials(protectedResponse.data.user));
         }
         // const refreshToken = localStorage.getItem("refresh_token");
         // if (!refreshToken) throw new Error("No refresh token");

         // const refreshResponse = await fetchBaseQuery({
         //    baseUrl: API_URL, // Используем прямой URL
         // })(
         //    {
         //       url: "/auth/refresh",
         //       method: "POST",
         //       body: { refreshToken },
         //    },
         //    api,
         //    extraOptions
         // );

         // if (refreshResponse.data) {
         //    localStorage.setItem(
         //       "access_token",
         //       refreshResponse.data.access_token
         //    );
         //    api.dispatch(setCredentials(refreshResponse.data));
         //    result = await baseQuery(args, api, extraOptions);
         // } else {
         //    throw new Error("Refresh failed");
         // }
      } catch {
         api.dispatch(logout());
      }
   }

   return result;
};

export const rootApi = createApi({
   reducerPath: "rootApi",
   baseQuery: baseQueryWithReauth,
   tagTypes: ["Chat", "Blog", "Pricing", "User"],
   endpoints: () => ({}),
});
