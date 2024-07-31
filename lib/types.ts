import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: { followerId: loggedInUserId },
      select: { followerId: true },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    bookmarks: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export const notificationsInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: { content: true },
  },
} satisfies Prisma.NotificationInclude;

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export type CommentsPage = {
  comments: CommentData[];
  previousCursor: string | null;
};

export type PostsPage = {
  posts: PostData[];
  nextCursor: string | null;
};

export type NotificationsPage = {
  notifications: NotificationData[];
  nextCursor: string | null;
};

export type FollowerInfo = {
  followers: number;
  isFollowedByUser: boolean;
};

export type LikeInfo = {
  likes: number;
  isLikedByUser: boolean;
};

export type BookmarkInfo = {
  isBookmarkedByUser: boolean;
};

export type NotificationCountInfo = {
  unreadCount: number;
};

export type MessageCountInfo = {
  unreadCount: number;
};