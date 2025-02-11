import { useState } from "react";
import { useCreateArticleMutation } from "@/features/admin-panel/model/api";

export const ContentEditor = () => {
   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const [createArticle] = useCreateArticleMutation();

   const handleSave = async () => {
      await createArticle({ title, content, is_published: false });
   };

   return (
      <div>
         <h2>Редактор контента</h2>
         <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
         />
         <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            cols={50}
         />
         <button onClick={handleSave}>Сохранить</button>
      </div>
   );
};
