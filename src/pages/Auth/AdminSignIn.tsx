import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { TelegramAuthButton } from "@/shared/ui/components/TelegramAuthButton";
import { useAdminLoginMutation } from "@/features/auth/model/adminApi";

export const AdminSignIn = () => {
   const [adminLogin, { isLoading, error }] = useAdminLoginMutation();

   const { register, handleSubmit } = useForm();
   const navigate = useNavigate();

   const onSubmit = async ({
      login,
      password,
   }: {
      login: string;
      password: string;
   }) => {
      try {
         const { access_token } = await adminLogin({
            login,
            password,
         }).unwrap();
         localStorage.setItem("access_token", access_token);
         console.log("navigate1");
         navigate("/admin");
         console.log("navigate2");
      } catch (err) {
         console.error("Ошибка входа:", err);
      }
   };

   return (
      <div className="auth-container">
         <h2>Войти в аккаунт</h2>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
               <label>Email</label>
               <input
                  {...register("login")}
                  type="text"
                  placeholder="example@mail.com"
               />
            </div>

            <div className="form-group">
               <label>Пароль</label>
               <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
               />
            </div>

            {error && (
               <div className="server-error">Неверные учетные данные</div>
            )}

            <button type="submit" disabled={isLoading}>
               {isLoading ? "Вход..." : "Войти"}
            </button>
            <TelegramAuthButton />
         </form>

         <div className="auth-footer">
            Нет аккаунта? <Link to="/auth/signup">Зарегистрироваться</Link>
         </div>
      </div>
   );
};
