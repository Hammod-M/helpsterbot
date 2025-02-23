import React from "react";
import { Message } from "../model/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Text } from "@mantine/core";

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
                  <Text
                     component="div"
                     size="sm"
                     style={{
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                     }}
                  >
                     <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                           code: ({ node, ...props }) => (
                              <code
                                 style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                 }}
                                 {...props}
                              />
                           ),
                        }}
                     >
                        {message.content}
                     </ReactMarkdown>
                  </Text>
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
