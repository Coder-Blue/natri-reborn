import { z } from "zod";

const requiredString = z.string().trim().min(1, "Cần thiết");

export const signUpSchema = z.object({
  email: requiredString.email("Địa chỉ email không hợp lệ"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Chỉ cho phép sử dụng các kí tự chữ cái, chữ số, - và _",
  ),
  password: requiredString.min(8, "Phải có ít nhất 8 kí tự"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "Không thể đăng tải hơn 5 phương tiện"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Giới hạn tối đa 1000 kí tự"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
