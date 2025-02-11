import { useGetBlogPostsQuery } from "../model/api";

import { Link } from "react-router-dom";

export const BlogList = () => {
   const { data: posts, isLoading, isError } = useGetBlogPostsQuery();

   if (isLoading) return <div>Loading...</div>;

   if (isError) return <div>Error loading posts</div>;

   return (
      <div className="blog-list">
         {posts?.map((post) => (
            <article key={post.id} className="blog-post-card">
               <h2>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
               </h2>

               <p className="meta">
                  By {post.author} •{" "}
                  {new Date(post.created_at).toLocaleDateString()}
               </p>

               <div className="excerpt">{post.content.slice(0, 200)}...</div>
            </article>
         ))}
      </div>
   );
};
