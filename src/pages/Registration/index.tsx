import { AuthForm } from "@/features/auth/ui/AuthForm";

export const RegisterPage = () => {
   return (
      <div>
         <h2>Регистрация</h2>
         <AuthForm isLogin={false} />
      </div>
   );
};
