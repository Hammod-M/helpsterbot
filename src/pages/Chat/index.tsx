import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Message } from "@/features/chat/model/types";
import { v4 as uuidv4 } from "uuid";
import { CustiomLoader } from "@/shared/ui/elements/Loader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { AuthorizedMessageItem } from "@/features/chat/ui/AuthorizedMessageItem";
import {
   useSendMessageMutation,
   useAddMessageMutation,
   useGetAllMessagesQuery,
} from "@/features/chat/model/api";
import { AI_MODELS } from "@/shared/lib/constants";
import { Select } from "@mantine/core";
import ModelSelector from "@/shared/ui/elements/ModelSelector";
// import { useCombinedMessages } from "@/features/chat/hooks/useCombinedMessages";

// const models = ["gpt-3.5-turbo", "chatgpt-4o-latest", "gpt-4o-mini", "gpt-4o"];

export const Chat = () => {
   const { userID } = useSelector((state: RootState) => state.auth);
   const { user } = useSelector((state: RootState) => state.profile);
   console.log("user", user);
   const initialModel = user?.model_using || AI_MODELS[0].value;
   const [selectedModel, setSelectedModel] = useState(initialModel);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const [localMessages, setLocalMessages] = useState<Message[]>([]);

   // Получаем объединённые сообщения из хука
   // const combinedMessages = useCombinedMessages(userID || "", localMessages);
   const { data: messages = [], isLoading: isLoadingUser } =
      useGetAllMessagesQuery(userID || "");

   const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
   const [addMessage] = useAddMessageMutation();

   // Прокрутка вниз при изменении длины списка сообщений
   // useEffect(() => {
   //    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   // }, [messages.length]);

   // Обновляем выбранную модель, если в профиле изменилась модель пользователя
   useEffect(() => {
      console.log("user1", user);
      if (user?.model_using && user.model_using !== selectedModel) {
         setSelectedModel(user.model_using);
      }
   }, [user, selectedModel]);

   const handleSend = useCallback(
      async (content: string) => {
         if (!content.trim() || !userID) return;

         const tempId = uuidv4();
         const newMessage: Message = {
            id: tempId,
            content,
            role: "user",
            timestamp: Date.now(),
            status: "pending",
            username: userID,
         };

         // Оптимистичное обновление локального состояния
         setLocalMessages((prev) => [...prev, newMessage]);

         try {
            // Сохраняем сообщение пользователя на бекенде
            await addMessage({
               id: userID,
               content,
               role: "user",
            }).unwrap();

            // Формируем историю для отправки, включая новое сообщение
            // Если messages уже содержит историю, добавляем к ней текущее сообщение newMessage.
            // Используем slice(-10), чтобы получить последние 10 сообщений.
            const currentHistory = [...messages, newMessage];
            const limitedHistory = currentHistory
               .slice(-10)
               .map(({ role, content }) => ({ role, content }));

            // Отправляем запрос к ChatGPT с ограниченной историей
            const response = await sendMessage({
               model: selectedModel,
               content,
               history: limitedHistory,
               userId: userID,
            }).unwrap();

            // Формируем сообщение от ChatGPT
            const botMessage: Message = {
               id: uuidv4(),
               content: response?.response || "Не удалось получить ответ",
               role: "assistant",
               timestamp: Date.now(),
               status: "sent",
               username: "Chat AI",
            };

            // Обновляем локальное состояние: меняем статус сообщения пользователя и добавляем ответ
            setLocalMessages((prev) =>
               prev
                  .map((msg) =>
                     msg.id === tempId ? { ...msg, status: "sent" } : msg
                  )
                  .concat(botMessage)
            );

            // Сохраняем сообщение ассистента на бекенде
            await addMessage({
               id: userID,
               content: botMessage.content,
               role: "assistant",
            }).unwrap();
         } catch (error) {
            // Обработка ошибки: обновляем статус и/или уведомляем пользователя
            setLocalMessages((prev) =>
               prev.map((msg) =>
                  msg.id === tempId ? { ...msg, status: "error" } : msg
               )
            );
         }
      },
      [userID, selectedModel, sendMessage, addMessage, messages]
   );

   // Проверяем, загружены ли данные
   // const { isLoading: isLoadingUser } = useCombinedMessages(userID || "", []);
   // Здесь можно отдельно отслеживать состояние загрузки для каждого запроса,
   // но если оба запроса объединены в одном хуке, то достаточно одного флага

   if (!userID) return null;
   if (isLoadingUser) {
      return <CustiomLoader />;
   }

   return (
      <section
         className="chat-container"
         style={{ height: "calc(100vh - 200px)" }}
      >
         <div className="chat-header">
            <h2>Чат с AI</h2>
            <ModelSelector />
         </div>

         <div className="chat-messages">
            <div className="chat-messages">
               {[...messages]
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((message) => (
                     <AuthorizedMessageItem
                        key={`${message.id}-${message.timestamp}`}
                        message={message}
                        isError={message.status === "error"}
                     />
                  ))}
               {isSending && <div className="loading">GPT печатает...</div>}
               <div ref={messagesEndRef} />
            </div>
            {isSending && <div className="loading">GPT печатает...</div>}
            <div ref={messagesEndRef} />
         </div>

         <div className="chat-input-wrapper">
            <ChatInput onSend={handleSend} isSending={isSending} />
         </div>
      </section>
   );
};
