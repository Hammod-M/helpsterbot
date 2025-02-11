import { useSendMessageMutation } from "@/features/chat/model/api";
import { MessageItem } from "@/features/chat/ui/MessageItem";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/features/chat/model/types";
import { v4 as uuidv4 } from "uuid";
import { Select } from "@mantine/core";
import { AI_MODELS } from "@/shared/lib/constants";

export const ChatSection = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [sendMessage, { isLoading }] = useSendMessageMutation();
   const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].value);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   // useEffect(() => {
   //    scrollToBottom();
   // }, [messages]);

   const handleSend = async (content: string) => {
      if (!content.trim()) return;

      const newMessage: Message = {
         id: uuidv4(),
         content,
         role: "user",
         timestamp: Date.now(),
         status: "pending",
         username: "Аноним",
      };

      setMessages((prev) => [...prev, newMessage]);

      try {
         // Формируем историю для отправки, включая новое сообщение
         // Если messages уже содержит историю, добавляем к ней текущее сообщение newMessage.
         // Используем slice(-10), чтобы получить последние 10 сообщений.
         const currentHistory = [...messages, newMessage];
         const limitedHistory = currentHistory
            .slice(-10)
            .map(({ role, content }) => ({ role, content }));

         const response = await sendMessage({
            model: selectedModel,
            content,
            history: limitedHistory,
         }).unwrap();

         const botMessage: Message = {
            id: uuidv4(),
            content: response?.response,
            role: "assistant",
            timestamp: Date.now(),
            status: "sent",
            username: "Chat AI",
         };

         setMessages((prev) =>
            prev
               .map((msg) =>
                  msg.id === newMessage.id
                     ? { ...newMessage, status: "sent" }
                     : msg
               )
               .concat(botMessage)
         );
      } catch (error) {
         setMessages((prev) =>
            prev.map((msg) =>
               msg.id === newMessage.id ? { ...msg, status: "error" } : msg
            )
         );
      }
   };

   return (
      <section className="chat-container">
         <div className="chat-header">
            <h2>Чат с AI</h2>
            <Select
               data={AI_MODELS}
               value={selectedModel}
               onChange={(value) =>
                  setSelectedModel(value || AI_MODELS[0].value)
               }
               className="chat-model-select"
            />
         </div>

         <div className="chat-messages">
            {messages.map((message) => (
               <MessageItem
                  key={message.id}
                  message={message}
                  isError={message.status === "error"}
               />
            ))}
            {isLoading && <div className="loading">GPT печатает...</div>}
            <div ref={messagesEndRef} />
         </div>

         <div className="chat-input-wrapper">
            <ChatInput onSend={handleSend} isSending={isLoading} />
         </div>
      </section>
   );
};
