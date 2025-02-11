import React from "react";
import { Message } from "../model/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const AuthorizedMessageItem = React.memo(
   ({ message, isError }: { message: Message; isError?: boolean }) => {
      const time = format(new Date(message.timestamp || 0), "HH:mm", {
         locale: ru,
      });
      const displayName =
         message.role === "assistant" ? "Chat AI" : message.username;

      return (
         <div
            className={`message-container ${
               message.role === "assistant" ? "bot" : "user"
            }`}
         >
            <div className="message-content">
               <div className="message-bubble">
                  <strong>{displayName}</strong>
                  <p>{message.content}</p>
                  <div className="message-time">{time}</div>
               </div>
            </div>
            {isError && (
               <div className="error-status">
                  <span>⚠️ Не удалось отправить</span>
               </div>
            )}
         </div>
      );
   }
);
