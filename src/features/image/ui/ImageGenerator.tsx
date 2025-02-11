import { useState } from "react";
import { useGenerateImageMutation } from "../api/imageApi";

export const ImageGenerator = () => {
   const [prompt, setPrompt] = useState("");
   const [generateImage, { isLoading }] = useGenerateImageMutation();

   const handleGenerate = async () => {
      if (!prompt.trim()) return;
      try {
         const { url } = await generateImage({ prompt }).unwrap();
         // Сохранение в историю через Redux
      } catch (error) {
         console.error("Generation failed:", error);
      }
   };

   return (
      <div className="image-generator">
         <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите изображение..."
         />
         <button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? "Генерация..." : "Создать"}
         </button>
      </div>
   );
};
