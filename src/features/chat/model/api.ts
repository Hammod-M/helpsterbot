import { rootApi } from "@/shared/api/rootApi";
import { Message, SendMessageRequest } from "./types";

export const chatApi = rootApi.injectEndpoints({
   endpoints: (build) => ({
      sendMessage: build.mutation<Message, SendMessageRequest>({
         query: ({
            model = "gpt-3.5-turbo",
            content,
            history,
            userId = "",
         }) => ({
            url: "/ai_gpt/",
            method: "POST",
            body: {
               model,
               prompt: content,
               history: history.filter((h) => h.content), // Фильтруем пустые сообщения
               user_id: userId,
            }, // Добавляем ID пользователя
         }),

         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            const userMessage: Message = {
               id: `temp-${Date.now()}`,
               content: arg.content,
               role: "user",
               timestamp: Date.now(),
               status: "pending",
            };

            // Обновляем локальное состояние (добавляем сообщение пользователя)
            dispatch(
               chatApi.util.updateQueryData(
                  "sendMessage",
                  undefined,
                  (messages = []) => [...messages, userMessage]
               )
            );

            try {
               const { data: botMessage } = await queryFulfilled;
               botMessage.role = "assistant";

               dispatch(
                  chatApi.util.updateQueryData(
                     "sendMessage",
                     undefined,
                     (messages = []) =>
                        messages.map((msg) =>
                           msg.id === userMessage.id
                              ? { ...botMessage, status: "sent" }
                              : msg
                        )
                  )
               );
            } catch (error) {
               dispatch(
                  chatApi.util.updateQueryData(
                     "sendMessage",
                     undefined,
                     (messages = []) =>
                        messages.map((msg) =>
                           msg.id === userMessage.id
                              ? { ...msg, status: "error" }
                              : msg
                        )
                  )
               );
            }
         },
      }),
      // Новые эндпоинты
      addMessage: build.mutation<
         Message,
         { id: string; content: string; role: "user" | "assistant" }
      >({
         query: ({ id, content, role }) => ({
            url: `/messages/${id}`,
            method: "POST",
            body: { content, role },
         }),
         invalidatesTags: ["Messages"],
      }),

      getUserMessages: build.query<Message[], string>({
         query: (identifier) => `/messages/${identifier}`,
         transformResponse: (
            response: Array<{
               id: number;
               message: { content: string };
               created_at: string;
            }>
         ) => {
            return response.map((msg) => ({
               id: msg.id.toString(),
               content: msg.message.content,
               role: msg.message.role || "user",
               timestamp: new Date(msg.created_at).getTime(),
               status: "sent",
               username: msg.message.role === "assistant" ? "Chat AI" : "User",
            }));
         },
         providesTags: ["Messages"],
      }),

      getAssistantMessages: build.query<Message[], string>({
         query: (identifier) => `/messages/${identifier}/assistant`,
         transformResponse: (response: any[]) =>
            response.map((msg) => ({
               id: msg.id.toString(),
               content: msg.message.content,
               role: "assistant",
               timestamp: new Date(msg.created_at).getTime(),
               status: "sent",
            })),
         providesTags: ["Messages"],
      }),

      getAllMessages: build.query<Message[], string>({
         query: (identifier) => `/messages/${identifier}`,
         transformResponse: (
            response: Array<{
               id: number;
               message: { content: string; role: string };
               created_at: string;
            }>
         ) =>
            response.map((msg) => ({
               id: msg.id.toString(),
               content: msg.message.content,
               role: msg.message.role, // берём роль из ответа
               timestamp: new Date(msg.created_at).getTime(),
               status: "sent",
               username: msg.message.role === "assistant" ? "Chat AI" : "User",
            })),
         providesTags: ["Messages"],
      }),
   }),
});

export const {
   useSendMessageMutation,
   useAddMessageMutation,
   useGetUserMessagesQuery,
   useGetAssistantMessagesQuery,
   useGetAllMessagesQuery,
} = chatApi;
