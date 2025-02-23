import { rootApi } from "@/shared/api/rootApi";
import type { PricingPlan } from "../model/types";

export const pricingApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      getPricingPlans: build.query<PricingPlan[], void>({
         query: () => "/subscriptions/",
         providesTags: ["Pricing"],
      }),
      createPricingPlan: build.mutation<PricingPlan, Partial<PricingPlan>>({
         query: (body) => ({
            url: "/subscriptions/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Pricing"],
      }),
      updatePricingPlan: build.mutation<PricingPlan, Partial<PricingPlan>>({
         query: (body) => ({
            url: "/subscriptions/",
            method: "PATCH",
            body,
         }),
         invalidatesTags: ["Pricing"],
      }),
      deletePricingPlan: build.mutation<void, string>({
         query: (id) => ({
            url: `/subscriptions/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["Pricing"],
      }),

      createPayment: build.mutation<PricingPlan, Partial<PricingPlan>>({
         query: (body) => ({
            url: "/tinkoff/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Pricing"],
      }),
      getPayment: build.query<PricingPlan[], void>({
         query: (id) => `/tinkoff/${id}/`,
         providesTags: ["Pricing"],
      }),
   }),
});

export const {
   useGetPricingPlansQuery,
   useCreatePricingPlanMutation,
   useUpdatePricingPlanMutation,
   useDeletePricingPlanMutation,
   useCreatePaymentMutation,
   useGetPaymentQuery,
} = pricingApi;
