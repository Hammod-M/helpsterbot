import { rootApi } from "@/shared/api/rootApi";
import { Article, PricingPlan } from "./types";

export const adminApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      createArticle: build.mutation<Article, Partial<Article>>({
         query: (body) => ({
            url: "/articles/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Content"],
      }),
      getArticles: build.query<Article[], void>({
         query: () => "/articles/",
         providesTags: ["Content"],
      }),
      updateArticle: build.mutation<Article, Partial<Article>>({
         query: ({ id, ...body }) => ({
            url: `/articles/${id}/`,
            method: "PUT",
            body,
         }),
         invalidatesTags: ["Content"],
      }),
      createPricingPlan: build.mutation<PricingPlan, Partial<PricingPlan>>({
         query: (body) => ({
            url: "/pricing/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Pricing"],
      }),
      getPricingPlans: build.query<PricingPlan[], void>({
         query: () => "/pricing/",
         providesTags: ["Pricing"],
      }),
      updatePricingPlan: build.mutation<PricingPlan, Partial<PricingPlan>>({
         query: ({ id, ...body }) => ({
            url: `/pricing/${id}/`,
            method: "PUT",
            body,
         }),
         invalidatesTags: ["Pricing"],
      }),
   }),
   overrideExisting: false,
});

export const {
   useGetArticlesQuery,
   useUpdateArticleMutation,
   useCreateArticleMutation,
   useCreatePricingPlanMutation,
   useGetPricingPlansQuery,
   useUpdatePricingPlanMutation,
} = adminApi;
