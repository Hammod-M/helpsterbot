import { AuthForm } from "@/features/auth/ui/AuthForm";

export const LoginPage = () => {
   return (
      <div>
         <h2>Вход</h2>
         <AuthForm isLogin={true} />
      </div>
   );
};
