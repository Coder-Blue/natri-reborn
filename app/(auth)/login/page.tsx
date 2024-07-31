import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Image from "next/image";
import loginImage from "@/assets/login-image.jpg";
import GoogleOAuthButton from "../GoogleOAuthButton";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">
            Đăng nhập sử dụng natri
          </h1>
          <div className="space-y-5">
            <GoogleOAuthButton />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>Hoặc</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Chưa có tài khoản? Hãy đăng ký
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}

export default LoginPage;
