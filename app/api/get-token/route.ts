import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
  try {
    const { user } = await validateRequest();

    console.log("Gọi get-token cho người dùng: ", user?.id);

    if (!user) {
      return Response.json({ error: "Chưa đăng ký" }, { status: 401 });
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      user.id,
      expirationTime,
      issuedAt,
    );

    return Response.json({ token });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Lỗi nội bộ ở server" }, { status: 500 });
  }
}
