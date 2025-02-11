import { rootApi } from "@/shared/api/rootApi";

export const imageApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      generateImage: build.mutation<{ url: string }, { prompt: string }>({
         query: (body) => ({
            url: "/ai_dalle/",
            method: "POST",
            body,
         }),
      }),
      getMyImages: build.query<string[], void>({
         query: () => "/dalle/history/",
      }),
   }),
});

export const { useGenerateImageMutation, useGetMyImagesQuery } = imageApi;
