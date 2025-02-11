import { useState } from "react";

interface ChatInputProps {
   onSend: (message: string) => void;
   isSending: boolean;
}

export const ChatInput = ({ onSend, isSending }: ChatInputProps) => {
   const [message, setMessage] = useState("");

   const handleSendClick = () => {
      if (message.trim()) {
         onSend(message);
         setMessage("");
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         if (message.trim()) {
            onSend(message);
            setMessage("");
         }
      }
   };

   return (
      <div className="chat-input">
         <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            disabled={isSending}
         />
         <button
            className="send-button"
            onClick={handleSendClick}
            disabled={isSending || !message.trim()}
         >
            {isSending ? "Отправка..." : "Отправить"}
         </button>
      </div>
   );
};
