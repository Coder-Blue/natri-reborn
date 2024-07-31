"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Chưa đăng ký");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Không tìm thấy bài viết");

  if (post.userId !== user.id)
    throw new Error("Chưa được cấp quyền xóa bài viết");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletedPost;
}
