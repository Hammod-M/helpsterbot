import { useEffect } from "react";
import { useLoginMutation } from "../model/api";
import { setCredentials } from "../model/slice";
import { useDispatch } from "react-redux";

declare global {
   interface Window {
      TelegramLoginWidget: {
         data: any;
         auth: (user: any) => void;
      };
   }
}

export const TelegramAuthButton = () => {
   const [login] = useLoginMutation();
   const dispatch = useDispatch();

   useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", "your_bot_name");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-request-access", "write");
      script.setAttribute(
         "data-onauth",
         "window.TelegramLoginWidget.auth(user)"
      );

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
         const response = await login({ telegramData: userData }).unwrap();
         localStorage.setItem("access_token", response.access_token);
         dispatch(setCredentials(response));
      } catch (err) {
         console.error("Telegram auth failed:", err);
      }
   };

   return <div id="telegram-auth-container"></div>;
};
