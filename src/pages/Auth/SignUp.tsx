import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "@/features/auth/model/api";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
   email: yup
      .string()
      .email("Некорректный email")
      .required("Обязательное поле"),
   password: yup
      .string()
      .min(8, "Минимум 8 символов")
      .matches(/[A-Z]/, "Должна быть заглавная буква")
      .required("Обязательное поле"),
});

export const SignUp = () => {
   const [registerUser, { isLoading, error }] = useRegisterMutation();
   const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(schema),
   });
   const navigate = useNavigate();

   const onSubmit = async ({
      email,
      password,
   }: {
      email: string;
      password: string;
   }) => {
      try {
         await registerUser({ login: email, password }).unwrap();
         navigate("/auth/signin");
      } catch (err) {
         console.error("Ошибка регистрации:", err);
      }
   };

   return (
      <div className="auth-container">
         <h2>Создать аккаунт</h2>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
               <label>Email</label>
               <input
                  {...register("email")}
                  type="email"
                  placeholder="example@mail.com"
               />
               {formState.errors.email && (
                  <span className="error">
                     {formState.errors.email.message}
                  </span>
               )}
            </div>

            <div className="form-group">
               <label>Пароль</label>
               <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
               />
               {formState.errors.password && (
                  <span className="error">
                     {formState.errors.password.message}
                  </span>
               )}
            </div>

            {error && (
               <div className="server-error">
                  Ошибка регистрации: {error.data?.detail}
               </div>
            )}

            <button type="submit" disabled={isLoading}>
               {isLoading ? "Регистрация..." : "Создать аккаунт"}
            </button>
         </form>

         <div className="auth-footer">
            Уже есть аккаунт? <Link to="/auth/signIn">Войти</Link>
         </div>
      </div>
   );
};
