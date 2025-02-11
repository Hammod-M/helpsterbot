import { useGetChatHistoryQuery, useSendMessageMutation } from "../model/api";
import { MessageItem } from "./MessageItem";
import { ChatInput } from "./ChatInput";
import { useEffect, useRef } from "react";
import { Loader } from "@/shared/ui/elements/Loader";

export const ChatSection = () => {
   const { data: messages = [], isLoading, isError } = useGetChatHistoryQuery();
   const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
   const messagesEndRef = useRef<HTMLDivElement>(null);

   // Автоматическая прокрутка к новым сообщениям
   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const handleSend = async (content: string) => {
      if (!content.trim()) return;
      try {
         await sendMessage({ content }).unwrap();
      } catch (error) {
         console.error("Ошибка отправки:", error);
      }
   };

   if (isLoading) return <Loader />;
   if (isError) return <div className="error">Ошибка загрузки чата</div>;

   return (
      <div className="chat-container">
         <div className="chat-messages">
            {messages.map((message) => (
               <MessageItem
                  key={message.id}
                  message={message}
                  isError={message.status === "error"}
               />
            ))}
            <div ref={messagesEndRef} />
         </div>

         <div className="chat-input-wrapper">
            <ChatInput onSend={handleSend} isSending={isSending} />
         </div>
      </div>
   );
};
