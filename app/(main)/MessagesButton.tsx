"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { MessageCountInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

type MessagesButtonProps = {
  initialState: MessageCountInfo;
};

export default function MessagesButton({ initialState }: MessagesButtonProps) {
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () =>
      kyInstance.get("/api/messages/unread-count").json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Tin nhắn"
      asChild
    >
      <Link href="/messages">
        <div className="relative">
          <Mail />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-xs font-medium tabular-nums text-white">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Tin nhắn</span>
      </Link>
    </Button>
  );
}
