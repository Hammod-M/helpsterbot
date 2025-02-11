import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth/model/api";
import { Link, useNavigate } from "react-router-dom";
import { TelegramAuthButton } from "@/shared/ui/components/TelegramAuthButton";
import { setCredentials } from "@/features/auth/model/slice";
import { useDispatch } from "react-redux";

export const SignIn = () => {
   const dispatch = useDispatch();
   const [loginUser, { isLoading, error }] = useLoginMutation();

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
         const { access_token, user_id } = await loginUser({
            login,
            password,
         }).unwrap();
         console.log("access_token1", access_token);
         localStorage.setItem("access_token", access_token);
         console.log("user_id setCredentials1", user_id);
         dispatch(setCredentials(user_id));
         navigate("/profile");
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
                  type="email"
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
