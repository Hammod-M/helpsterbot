import React from "react";
import { Select } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { useUpdateProfileMutation } from "@/features/profile/model/api";
import { setUserProfile } from "@/features/profile/model/slice";
import { AI_MODELS } from "@/shared/lib/constants";

export const ModelSelector = () => {
   const { userID } = useSelector((state: RootState) => state.auth);
   const { user } = useSelector((state: RootState) => state.profile);
   const currentModel = user?.model_using || AI_MODELS[0].value;
   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
   const dispatch = useDispatch();

   const handleChange = async (value: string) => {
      const updatedProfile = { ...user, model_using: value };
      // Оптимистичное обновление глобального стейта
      dispatch(setUserProfile(updatedProfile));

      // Отправляем запрос на обновление профиля
      if (userID) {
         try {
            await updateProfile({
               userId: Number(userID),
               data: { model_using: value },
            }).unwrap();
         } catch (err) {
            console.error("Ошибка при обновлении модели", err);
         }
      }
   };

   return (
      <Select
         data={AI_MODELS}
         value={currentModel}
         onChange={(value) => value && handleChange(value)}
         disabled={isLoading}
      />
   );
};

export default ModelSelector;
