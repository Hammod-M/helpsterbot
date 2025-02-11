import { useState } from "react";
import { useCreateArticleMutation } from "@/features/admin-panel/model/api";
import { ArticleEditor } from "./ArticleForm";

export const BlogTable = () => {
   const [creating, setCreating] = useState(false);
   const [createArticle] = useCreateArticleMutation();

   return (
      <>
         <button onClick={() => setCreating(true)}>Добавить статью</button>
         {creating && (
            <ArticleEditor
               onSubmit={(data) => {
                  createArticle(data);
                  setCreating(false);
               }}
               onClose={() => setCreating(false)}
            />
         )}
      </>
   );
};
