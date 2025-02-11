import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
   useCreatePostMutation,
   useUpdatePostMutation,
   useDeletePostMutation,
} from "@/features/blog/model/api";

const schema = yup.object({
   title: yup.string().required("Обязательное поле"),
   content: yup.string().required("Обязательное поле"),
   is_published: yup.boolean(),
});

export const ArticleEditor = ({ post }: { post?: BlogPost }) => {
   const [createPost] = useCreatePostMutation();
   const [updatePost] = useUpdatePostMutation();
   const [deletePost] = useDeletePostMutation();

   const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(schema),
      defaultValues: post,
   });

   const onSubmit = async (data: Partial<BlogPost>) => {
      try {
         if (post?.id) {
            await updatePost({ ...data, id: post.id }).unwrap();
         } else {
            await createPost(data).unwrap();
         }
      } catch (error) {
         console.error("Ошибка сохранения:", error);
      }
   };

   return (
      <div className="article-editor">
         <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} placeholder="Заголовок статьи" />
            {formState.errors.title && (
               <span className="error">{formState.errors.title.message}</span>
            )}

            <textarea
               {...register("content")}
               placeholder="Содержание статьи"
               rows={15}
            />
            {formState.errors.content && (
               <span className="error">{formState.errors.content.message}</span>
            )}

            <label>
               <input type="checkbox" {...register("is_published")} />
               Опубликовать
            </label>

            <div className="editor-actions">
               <button type="submit">
                  {post ? "Сохранить изменения" : "Создать статью"}
               </button>

               {post && (
                  <button
                     type="button"
                     onClick={() => deletePost(post.id)}
                     className="danger"
                  >
                     Удалить статью
                  </button>
               )}
            </div>
         </form>
      </div>
   );
};
