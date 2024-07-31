import { useEffect, useState } from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import { StreamChat } from "stream-chat";
import kyInstance from "@/lib/ky";

export default function useInitializeChatClient() {
  const { user } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    client
      .connectUser(
        {
          id: user.id,
          username: user.username,
          name: user.displayName,
          image: user.avatarUrl,
        },
        async () =>
          kyInstance
            .get("/api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((error) => console.error("Chưa thế kết nối người dùng", error))
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) =>
          console.error("Chưa thể ngắt kết nối người dùng", error),
        )
        .then(() => console.log("Đóng kết nối"));
    };
  }, [user.id, user.username, user.displayName, user.avatarUrl]);

  return chatClient;
}
