import { useGetPostByIdQuery } from "../api/blogApi";

export const PostView = ({ postId }: { postId: string }) => {
   const { data: post, isLoading } = useGetPostByIdQuery(postId);

   return (
      <article className="post-view">
         {post && (
            <>
               <h1>{post.title}</h1>
               <div className="post-meta">
                  <time>
                     {new Date(post.published_at).toLocaleDateString()}
                  </time>
               </div>
               <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
               />
            </>
         )}
      </article>
   );
};
