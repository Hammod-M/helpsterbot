import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ArticlePost } from "@/features/article/model/types";
import { useCreateArticleMutation } from "@/features/article/model/api";

import {
   TextInput,
   Button,
   Group,
   Paper,
   Radio,
   FileInput,
   Image,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { СontentTextEditor } from "@/shared/ui/components/СontentTextEditor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup
   .object({
      title: yup.string().required("Заголовок обязателен"),
      link: yup.string().required("Ссылка обязательна"),
      text: yup.string().required("Текст обязателен"),
      img: yup.string().required("Изображение обязательно"),
   })
   .required();

export const CreateArticle = () => {
   const navigate = useNavigate();
   const [createPost] = useCreateArticleMutation();

   const [radioValue, setRadioValue] = useState("url");
   const [preview, setPreview] = useState("");

   const {
      register,
      control,
      handleSubmit,
      setValue,
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

   // Обработчик отправки формы
   const onSubmit = async (data: Partial<ArticlePost>) => {
      try {
         await createPost(data).unwrap();
         showNotification({
            title: "Успех",
            message: "Пост успешно создан!",
            color: "green",
         });
         navigate("/admin/articles");
      } catch (error: any) {
         showNotification({
            title: "Ошибка",
            message: error?.data?.message || "Ошибка при создании поста",
            color: "red",
         });
      }
   };

   return (
      <>
         <Paper
            shadow="sm"
            padding="md"
            style={{ maxWidth: 600, margin: "20px auto" }}
         >
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
                        onChange={(value: string) => setValue("text", value)} // Передаем текст в форму
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

               {/* <TextInput
                  label="Изображение"
                  placeholder="Введите URL изображения"
                  {...register("img")}
                  error={errors.img?.message}
                  mb="md"
               /> */}

               <Group position="right" mt="md">
                  <Button type="submit" color="blue">
                     Создать
                  </Button>
               </Group>
            </form>
         </Paper>
      </>
   );
};
