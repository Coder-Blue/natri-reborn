import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { FollowerInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: { followerId: loggedInUser.id },
          select: { followerId: true },
        },
        _count: {
          select: { followers: true },
        },
      },
    });

    if (!user) {
      return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 404 });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    await prisma.$transaction([
      prisma.follow.upsert({
        where: {
          followerId_followingId: {
            followerId: loggedInUser.id,
            followingId: userId,
          },
        },
        create: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
        update: {},
      }),
      prisma.notification.create({
        data: {
          issuerId: loggedInUser.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    await prisma.$transaction([
      prisma.follow.deleteMany({
        where: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      }),
      prisma.notification.deleteMany({
        where: {
          issuerId: loggedInUser.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}