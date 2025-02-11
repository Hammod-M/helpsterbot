import { rootApi } from "@/shared/api/rootApi";
import type { BlogPost } from "../model/types";

export const blogApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      // getBlogPosts: build.query<
      //    { results: BlogPost[]; count: number },
      //    { offset?: number; limit?: number }
      // >({
      //    query: ({ offset = 0, limit = 10 }) =>
      //       `/blog/?offset=${offset}&limit=${limit}`,
      //    providesTags: ["Blog"],
      // }),
      getBlogPosts: build.query({
         query: () => "/blog/",
         providesTags: ["Blog"],
      }),
      getPostById: build.query<BlogPost, string>({
         query: (id) => `/blog/${id}/`,
      }),
      createPost: build.mutation<BlogPost, Partial<BlogPost>>({
         query: (body) => ({
            url: "/blog/",
            method: "POST",
            body,
         }),
         invalidatesTags: ["Blog"],
      }),
      updatePost: build.mutation<BlogPost, Partial<BlogPost>>({
         query: ({ id, ...body }) => ({
            url: `/blog/${id}/`,
            method: "PUT",
            body,
         }),
         invalidatesTags: ["Blog"],
      }),
      deletePost: build.mutation<void, string>({
         query: (id) => ({
            url: `/blog/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["Blog"],
      }),
   }),
});

export const {
   useGetBlogPostsQuery,
   useGetPostByIdQuery,
   useCreatePostMutation,
   useUpdatePostMutation,
   useDeletePostMutation,
} = blogApi;
