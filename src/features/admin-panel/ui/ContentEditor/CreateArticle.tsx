import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreatePostMutation } from "../../../blog/model/api";
import { BlogPost } from "../../../blog/model/types";

import { TextInput, Button, Group, Paper, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { СontentTextEditor } from "@/shared/ui/components/СontentTextEditor";

const schema = yup
   .object({
      title: yup.string().required("Заголовок обязателен"),
      link: yup.string().required("Ссылка обязательна"),
      text: yup.string().required("Текст обязателен"),
      img: yup.string().required("Изображение обязательно"),
   })
   .required();

export const CreateArticle = () => {
   const [createPost] = useCreatePostMutation();

   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<Partial<BlogPost>>({
      resolver: yupResolver(schema),
      defaultValues: {
         title: "",
         link: "",
         text: "",
         img: "",
      },
   });

   const onSubmit = async (data: Partial<BlogPost>) => {
      try {
         await createPost(data).unwrap();
         showNotification({
            title: "Успех",
            message: "Пост успешно создан!",
            color: "green",
         });
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
         <Title align="center" order={1} mb="xl">
            Статья
         </Title>
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
                        {...field}
                        controls={[
                           ["bold", "italic", "underline"],
                           ["h1", "h2", "h3"],
                        ]}
                        placeholder="Введите текст поста"
                        error={errors.text?.message}
                        mb="md"
                     />
                  )}
               />

               <TextInput
                  label="Изображение"
                  placeholder="Введите URL изображения"
                  {...register("img")}
                  error={errors.img?.message}
                  mb="md"
               />

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
