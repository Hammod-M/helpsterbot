import React, { useState } from "react";
import {
   Title,
   Container,
   Select,
   TextInput,
   Button,
   Group,
   Paper,
   Image,
   LoadingOverlay,
} from "@mantine/core";
import { useGenerateImageMutation } from "@/features/image/modal/api";

const imageModels = ["Dalle"];

export const Images = () => {
   const [selectedModel, setSelectedModel] = useState<string>(imageModels[0]);
   const [prompt, setPrompt] = useState<string>("");
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [generateImage, { isLoading }] = useGenerateImageMutation();

   const handleSubmit = async () => {
      if (!prompt.trim()) return;
      try {
         const response = await generateImage({
            prompt,
            // model: selectedModel,
            n: 1,
         } as any).unwrap();
         // Извлекаем URL первого изображения из ответа
         const url = response.response.data[0].url;
         setImageUrl(url);
      } catch (error) {
         console.error("Ошибка при генерации изображения", error);
      }
   };

   return (
      <Container py="xl" size="md" style={{ position: "relative" }}>
         <LoadingOverlay visible={isLoading} overlayOpacity={0.3} />
         <Title order={2} align="center" mb="md">
            Генерация изображений
         </Title>
         <Paper shadow="sm" p="md" radius="md" withBorder mb="md">
            <Group direction="column" grow>
               <Select
                  label="Выберите модель"
                  data={imageModels}
                  value={selectedModel}
                  onChange={(value) =>
                     setSelectedModel(value || imageModels[0])
                  }
               />
               <TextInput
                  label="Описание изображения"
                  placeholder="Введите описание изображения..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.currentTarget.value)}
               />
               <Button onClick={handleSubmit} loading={isLoading} color="blue">
                  Создать
               </Button>
            </Group>
         </Paper>
         {imageUrl && (
            <Paper shadow="sm" p="md" radius="md" withBorder>
               <Image
                  src={imageUrl}
                  alt="Сгенерированное изображение"
                  caption="Сгенерированное изображение по вашему запросу"
                  withPlaceholder
                  radius="md"
               />
            </Paper>
         )}
      </Container>
   );
};

export default Images;
