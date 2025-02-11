import { useEffect } from "react";
import { useTelegramAuthMutation } from "@/features/auth/model/api";

declare global {
   interface Window {
      TelegramLoginWidget: {
         data: any;
         auth: (user: any) => void;
      };
   }
}

export const TelegramAuthButton = () => {
   const [telegramAuth] = useTelegramAuthMutation();

   useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?21";
      script.async = true;
      script.setAttribute("data-telegram-login", "your_bot_name");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");

      window.TelegramLoginWidget = {
         data: null,
         auth: (user) => handleTelegramAuth(user),
      };

      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
      };
   }, []);

   const handleTelegramAuth = async (userData: any) => {
      try {
         const { access_token } = await telegramAuth({
            telegram_id: userData.id,
         }).unwrap();

         localStorage.setItem("access_token", access_token);
         window.location.href = "/";
      } catch (error) {
         console.error("Telegram auth failed:", error);
      }
   };

   return <div id="telegram-auth-container"></div>;
};
