import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";
import { MessageCountInfo } from "@/lib/types";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    const { total_unread_count } = await streamServerClient.getUnreadCount(
      user.id,
    );

    const data: MessageCountInfo = {
      unreadCount: total_unread_count,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}