import { useMemo } from "react";
import {
   useGetUserMessagesQuery,
   useGetAssistantMessagesQuery,
} from "@/features/chat/model/api";
import { Message } from "@/features/chat/model/types";

export const useCombinedMessages = (
   userID: string,
   localMessages: Message[]
): Message[] => {
   const { data: userMessages = [] } = useGetUserMessagesQuery(userID);
   const { data: assistantMessages = [] } =
      useGetAssistantMessagesQuery(userID);

   // Если сервер возвращает role – используйте его, иначе задавайте значение по умолчанию
   const combinedMessages = useMemo(() => {
      const backendMessages = [...userMessages, ...assistantMessages]
         .sort((a, b) => a.timestamp - b.timestamp)
         .map((msg) => ({
            ...msg,
            status: msg.status || "sent",
            username: msg.role === "user" ? userID : "Chat AI",
         }));
      return [...backendMessages, ...localMessages].sort(
         (a, b) => a.timestamp - b.timestamp
      );
   }, [userMessages, assistantMessages, localMessages, userID]);

   return combinedMessages;
};
