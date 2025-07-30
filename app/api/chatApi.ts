import type { ChatResponse } from "~/lib/types";
import { CHAT_URL } from "~/lib/urls";

export const postTextMessage = async (message: string, conversationId: string | null): Promise<ChatResponse> => {
  const postBody = {
    message: message,
    conversation_id: conversationId,
  };
  const url = `${CHAT_URL}text`;
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ChatResponse = await resp.json();
  return data;
};
