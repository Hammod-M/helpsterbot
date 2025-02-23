// ChatInput.tsx
import { Textarea, Button, Group, Text, Progress } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/app/store/store";

interface ChatInputProps {
   onSend: (message: string) => void;
   isSending: boolean;
}

export const ChatInput = ({ onSend, isSending }: ChatInputProps) => {
   const { user } = useSelector((state: RootState) => state.profile);
   const [message, setMessage] = useState("");
   const maxLength = user?.max_length_sym || 1200;
   const remainingChars = maxLength - message.length;
   const isLimitExceeded = remainingChars < 0;

   const handleSendClick = () => {
      if (message.trim() && !isLimitExceeded) {
         onSend(message);
         setMessage("");
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !isLimitExceeded) {
         e.preventDefault();
         handleSendClick();
      }
   };

   return (
      <div className="chat-input">
         <Group
            justify="space-between"
            align="flex-end"
            gap="sm"
            wrap="nowrap"
            style={{ flexGrow: 1, minWidth: "100%", width: "100%" }}
         >
            <Textarea
               value={message}
               onChange={(e) => setMessage(e.currentTarget.value)}
               onKeyDown={handleKeyDown}
               placeholder="Введите сообщение..."
               disabled={isSending}
               minRows={1}
               maxRows={7}
               autosize
               style={{ flexGrow: 1, minWidth: "85%", width: "85%" }}
               error={isLimitExceeded ? "Превышен лимит символов" : undefined}
            />

            <Group justify="space-between" align="center" gap="lg">
               <Button
                  variant="filled"
                  color="blue"
                  onClick={handleSendClick}
                  disabled={isSending || !message.trim() || isLimitExceeded}
                  px="sm"
                  h={36}
               >
                  <IconSend size="1.2rem" />
               </Button>
               <Text size="xs" c={isLimitExceeded ? "red" : "dimmed"}>
                  {Math.max(remainingChars, 0)}/{maxLength}
               </Text>
            </Group>
         </Group>
      </div>
   );
};
