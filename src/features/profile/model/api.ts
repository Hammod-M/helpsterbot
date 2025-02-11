import { rootApi } from "@/shared/api/rootApi";
import { UserProfile, PromoResponse, UpdateProfileDto } from "./types";

export const profileApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      getCurrentUser: build.query<UserProfile, number>({
         query: (userId) => `/user/${userId}`,
         providesTags: ["Profile"],
      }),
      checkPromo: build.query<PromoResponse, string>({
         query: (code) => `/promo/?code=${code}`,
      }),
      updateProfile: build.mutation<
         UserProfile,
         { userId: number; data: UpdateProfileDto }
      >({
         query: ({ userId, data }) => ({
            url: `/user/${userId}`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["Profile"],
      }),
   }),
});

export const {
   useGetCurrentUserQuery,
   useLazyCheckPromoQuery,
   useUpdateProfileMutation,
} = profileApi;
