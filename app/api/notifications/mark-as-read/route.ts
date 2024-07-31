import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    await prisma.notification.updateMany({
      where: {
        recipientId: user.id,
        read: false,
      },
      data: { read: true },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}
