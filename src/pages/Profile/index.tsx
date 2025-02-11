// pages/profile/index.tsx
import { RootState } from "@/app/store/store";
import {
   useGetCurrentUserQuery,
   useLazyCheckPromoQuery,
   useUpdateProfileMutation,
} from "@/features/profile/model/api";
import { AI_MODELS } from "@/shared/lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Center, Loader, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object({
   // email: yup.string().email("Некорректный email"),
   // username: yup.string().required("Обязательное поле"),
   model_using: yup.string().required("Выберите модель"),
   voice_model: yup.string().required("Выберите голосовую модель"),
});

export const ProfilePage = () => {
   // Состояние для хранения загруженных данных
   const [userData, setUserData] = useState<any>(null);

   const { userID: currentUser } = useSelector(
      (state: RootState) => state.auth
   );
   console.log("currentUser", currentUser);
   // useEffect(() => {
   //    if (!currentUser) {
   //       console.log("redirect to signin");
   //    }
   // }, [currentUser]);
   const { data: user, isLoading } = useGetCurrentUserQuery(currentUser);
   // const [checkPromo, { data: promo }] = useLazyCheckPromoQuery();
   const [updateProfile] = useUpdateProfileMutation();

   useEffect(() => {
      if (user) {
         setUserData(user); // Когда данные получены, обновляем состояние
      }
   }, [user]);

   const { register, handleSubmit, formState, control, setError, reset } =
      useForm({
         resolver: yupResolver(schema),
         defaultValues: user,
      });

   useEffect(() => {
      if (userData) {
         // Обновляем значения формы, когда данные пользователя загружены
         reset(userData);
      }
   }, [userData, reset]);

   const handleCheckPromo = async (code: string) => {
      if (code.length >= 6) {
         try {
            await checkPromo(code).unwrap();
         } catch (error) {
            console.error("Ошибка проверки промокода:", error);
         }
      }
   };

   const onSubmit = async (data: UpdateProfileDto) => {
      console.log("data", data);
      try {
         await updateProfile({
            userId: currentUser,
            data,
         }).unwrap();
      } catch (error: any) {
         if (error.data?.detail) {
            error.data.detail.forEach((err: any) => {
               setError(err.loc[1], { message: err.msg });
            });
         }
      }
   };

   if (isLoading)
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );
   if (!user) return <div>Пользователь не найден</div>;

   return (
      <div className="profile-container">
         <div className="profile-section">
            <h2>Личные данные</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-group">
                  <label>Telegram ID</label>
                  <input value={user.telegram_id || "Не привязан"} disabled />
               </div>

               {/* <div className="form-group">
                  <label>Имя пользователя</label>
                  <input {...register("username")} />
                  {formState.errors.username && (
                     <span className="error">
                        {formState.errors.username.message}
                     </span>
                  )}
               </div>

               <div className="form-group">
                  <label>Email</label>
                  <input {...register("email")} />
                  {formState.errors.email && (
                     <span className="error">
                        {formState.errors.email.message}
                     </span>
                  )}
               </div> */}

               <div className="form-group">
                  <label>Модель</label>
                  <Controller
                     name="model_using"
                     control={control}
                     render={({ field }) => (
                        <Select
                           data={AI_MODELS}
                           value={field.value}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </div>

               <div className="form-group">
                  <label>Голосовая модель</label>
                  <input {...register("voice_model")} />
               </div>

               <button type="submit" className="save-button">
                  Сохранить изменения
               </button>
            </form>
         </div>

         <div className="profile-section">
            <h2>Подписка</h2>
            <div className="subscription-info">
               <p>Текущий тариф: {user.subscribe}</p>
               <p>
                  Действует до:{" "}
                  {new Date(user.subscribe_time).toLocaleDateString()}
               </p>
               <p>Использовано сообщений: {user.message_count}</p>
            </div>
         </div>

         {/* <div className="profile-section">
            <h2>Промокод</h2>
            <div className="promo-section">
               <input
                  placeholder="Введите промокод"
                  onChange={(e) => handleCheckPromo(e.target.value)}
               />
               {promo && (
                  <div
                     className={`promo-status ${
                        promo.is_valid ? "valid" : "invalid"
                     }`}
                  >
                     {promo.is_valid
                        ? `Активирован промокод: ${promo.code} (${promo.discount}% скидки)`
                        : "Недействительный промокод"}
                  </div>
               )}
            </div>
         </div> */}
      </div>
   );
};
