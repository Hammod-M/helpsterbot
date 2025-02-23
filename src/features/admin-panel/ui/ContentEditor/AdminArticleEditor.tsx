// EditPost.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
   TextInput,
   Button,
   Group,
   Paper,
   Title,
   Loader,
   Center,
   Image,
   FileInput,
   Radio,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { СontentTextEditor } from "@/shared/ui/components/СontentTextEditor";
import { ArticlePost } from "@/features/article/model/types";
import {
   useGetArticleByIdQuery,
   useUpdateArticleMutation,
} from "@/features/article/model/api";

const schema = yup.object({
   title: yup.string().required("Заголовок обязателен"),
   link: yup.string().required("Ссылка обязательна"),
   text: yup.string().required("Текст обязателен"),
   img: yup.string().required("Изображение обязательно"),
});

export const AdminArticleEditor: React.FC = () => {
   const { postId } = useParams<{ postId: string }>();
   const navigate = useNavigate();
   const { data: post, isLoading } = useGetArticleByIdQuery(postId ?? "");
   const [updatePost] = useUpdateArticleMutation();

   const [radioValue, setRadioValue] = useState("url");
   const [preview, setPreview] = useState("");

   const {
      register,
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<Partial<ArticlePost>>({
      resolver: yupResolver(schema),
      defaultValues: {
         title: "",
         link: "",
         text: "",
         img: "",
      },
   });

   useEffect(() => {
      if (post) {
         // Определяем тип загрузки изображения
         const isDataURL = post.img?.startsWith("data:image");
         setRadioValue(isDataURL ? "file" : "url");

         reset({
            title: post.title,
            link: post.link,
            text: post.text,
            img: post.img,
         });
      }
   }, [post, setValue, reset]);

   const onSubmit = async (data: Partial<ArticlePost>) => {
      try {
         if (!postId) return;
         await updatePost({ id: postId, ...data }).unwrap();
         showNotification({
            title: "Успех",
            message: "Пост успешно обновлен!",
            color: "green",
         });
         navigate("/admin/articles");
      } catch (error: any) {
         showNotification({
            title: "Ошибка",
            message: error?.data?.message || "Ошибка при обновлении поста",
            color: "red",
         });
      }
   };

   if (isLoading)
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );

   return (
      <Paper
         shadow="sm"
         padding="md"
         style={{ maxWidth: 600, margin: "20px auto" }}
      >
         <Title order={2} mb="md" align="center">
            Редактирование статьи
         </Title>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
               label="Заголовок"
               placeholder="Введите заголовок"
               {...register("title")}
               error={errors.title?.message}
               mb="md"
            />

            <TextInput
               label="Ссылка"
               placeholder="Введите ссылку"
               {...register("link")}
               error={errors.link?.message}
               mb="md"
            />

            <Controller
               name="text"
               control={control}
               render={({ field }) => (
                  <СontentTextEditor
                     value={field.value}
                     onChange={(value: string) => setValue("text", value)}
                  />
               )}
            />

            <Controller
               name="img"
               control={control}
               render={({ field }) => {
                  const handleFileChange = (file: File | null) => {
                     if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                           field.onChange(reader.result);
                           setPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                     } else {
                        field.onChange("");
                        setPreview("");
                     }
                  };

                  return (
                     <div>
                        <Radio.Group
                           value={radioValue}
                           onChange={setRadioValue}
                           mb="md"
                        >
                           <Radio value="url" label="URL" />
                           <Radio value="file" label="Загрузить файл" />
                        </Radio.Group>

                        {radioValue === "url" ? (
                           <TextInput
                              label="URL изображения"
                              value={field.value}
                              onChange={(e) => {
                                 field.onChange(e.currentTarget.value);
                                 setPreview(e.currentTarget.value);
                              }}
                              error={errors.img?.message}
                              mb="md"
                           />
                        ) : (
                           <FileInput
                              accept="image/*"
                              label="Загрузить изображение"
                              onChange={handleFileChange}
                              mb="md"
                           />
                        )}

                        {preview && (
                           <Image
                              src={preview}
                              height={200}
                              alt="Preview"
                              fit="contain"
                              mb="md"
                           />
                        )}
                     </div>
                  );
               }}
            />

            <Group position="right" mt="md">
               <Button type="submit" color="green">
                  Сохранить изменения
               </Button>
            </Group>
         </form>
      </Paper>
   );
};
