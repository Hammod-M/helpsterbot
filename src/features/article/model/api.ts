import { rootApi } from "@/shared/api/rootApi";
import type { ArticlePost } from "../model/types";

export const articleApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      getArticlePosts: build.query({
         query: () => "/article/",
         providesTags: ["Blog"],
      }),
      getArticleById: build.query<ArticlePost, string>({
         query: (id) => `/article/${id}/`,
      }),
      createArticle: build.mutation<ArticlePost, Partial<ArticlePost>>({
         query: (body) => ({
            url: "/article/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Blog"],
      }),
      updateArticle: build.mutation<ArticlePost, Partial<ArticlePost>>({
         query: ({ id, ...body }) => ({
            url: `/article/${id}/`,
            method: "PUT",
            body,
         }),
         invalidatesTags: ["Blog"],
      }),
      deleteArticle: build.mutation<void, string>({
         query: (id) => ({
            url: `/article/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["Blog"],
      }),
   }),
});

export const {
   useGetArticlePostsQuery,
   useGetArticleByIdQuery,
   useCreateArticleMutation,
   useUpdateArticleMutation,
   useDeleteArticleMutation,
} = articleApi;
