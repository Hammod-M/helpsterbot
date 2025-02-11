import { useEffect } from "react";
import { useCheckAuthQuery } from "@/features/auth/model/api";
import { useGetCurrentUserQuery } from "@/features/profile/model/api";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/model/slice";
import { setUserProfile } from "@/features/profile/model/slice";
import { Center, Loader } from "@mantine/core";

export const AppRouterProvider = () => {
   const dispatch = useDispatch();

   // Сначала проверяем аутентификацию
   const {
      data: authData,
      isLoading: authLoading,
      isError: authError,
   } = useCheckAuthQuery();

   // После получения auth данных, по user_id отправляем запрос на получение профиля. Используем skip для ожидания auth.
   const {
      data: userData,
      isLoading: profileLoading,
      isError: profileError,
   } = useGetCurrentUserQuery(authData?.user?.user_id || 0, {
      skip: !authData || !authData.user?.user_id,
   });

   // Когда auth и профиль получены, диспатчим данные в стор
   useEffect(() => {
      if (authData?.user && userData) {
         dispatch(setCredentials(authData.user.user_id));
         dispatch(setUserProfile(userData));
      }
   }, [authData, userData, dispatch]);

   if (authLoading || profileLoading) {
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );
   }

   return <RouterProvider router={router} />;
};
