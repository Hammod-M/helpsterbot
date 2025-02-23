import { useGetBlogPostsQuery } from "../api/blogApi";
import { Pagination } from "@/shared/ui/Pagination";
import { PostCard } from "./PostCard";

export const PostList = () => {
   const [page, setPage] = useState(1);
   // const { data, isLoading } = useGetBlogPostsQuery({
   //    offset: (page - 1) * 10,
   //    limit: 10,
   // });
   const { data, isLoading } = useGetBlogPostsQuery();

   return (
      <div className="blog-container">
         <div className="posts-grid">
            {data?.results.map((post) => (
               <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  publishedAt={post.published_at}
               />
            ))}
         </div>

         {/* <Pagination
            currentPage={page}
            totalPages={Math.ceil((data?.count || 0) / 10)}
            onPageChange={setPage}
         /> */}
      </div>
   );
};
