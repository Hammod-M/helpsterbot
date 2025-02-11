export interface Message {
   id: string;
   content: string;
   role: "user" | "assistant";
   timestamp: number;
   status?: "pending" | "sent" | "error";
   username?: string;
}

export interface SendMessageRequest {
   model?: string;
   content: string;
   history: Array<{ role: string; content: string }>;
}
