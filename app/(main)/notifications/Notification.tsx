import Link from "next/link";
import { NotificationData } from "@/lib/types";
import { NotificationType } from "@prisma/client";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import { Heart, MessageCircleIcon, User2 } from "lucide-react";

type NotificationProps = {
  notification: NotificationData;
};

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer.displayName} đã theo dõi bạn`,
      icon: <User2 className="size-7 fill-green-500 text-green-500" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.displayName} đã bình luận bài viết của bạn`,
      icon: (
        <MessageCircleIcon className="size-7 fill-blue-500 text-blue-500" />
      ),
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `${notification.issuer.displayName} đã thích bài viết của bạn`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div>
            <span className="font-bold">{notification.issuer.displayName}</span>{" "}
            <span>{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
