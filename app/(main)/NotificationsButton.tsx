"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

type NotificationsButtonProps = {
  initialState: NotificationCountInfo;
};

export default function NotificationsButton({
  initialState,
}: NotificationsButtonProps) {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Thông báo"
      asChild
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-xs font-medium tabular-nums text-white">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Thông báo</span>
      </Link>
    </Button>
  );
}
