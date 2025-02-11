import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "./types";

interface ChatState {
   messages: Message[];
}

const initialState: ChatState = {
   messages: [],
};

const chatSlice = createSlice({
   name: "chat",
   initialState,
   reducers: {
      addMessage: (state, action: PayloadAction<Message>) => {
         state.messages.push(action.payload);
      },
      updateMessageStatus: (
         state,
         action: PayloadAction<{ id: string; status: "sent" | "error" }>
      ) => {
         const message = state.messages.find(
            (msg) => msg.id === action.payload.id
         );
         if (message) {
            message.status = action.payload.status;
         }
      },
   },
});

export const { addMessage, updateMessageStatus } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
