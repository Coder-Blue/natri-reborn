import type { Metadata } from "next";
import Chat from "./Chat";
import "stream-chat-react/dist/css/v2/index.css";

export const metadata: Metadata = {
  title: "Tin nhắn",
};

function MessagesPage() {
  return <Chat />;
}

export default MessagesPage;
