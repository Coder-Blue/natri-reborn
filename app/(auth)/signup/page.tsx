import type { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import Image from "next/image";
import signUpImage from "@/assets/signup-image.jpg";
import GoogleOAuthButton from "../GoogleOAuthButton";

export const metadata: Metadata = {
  title: "Đăng ký",
};

function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Đăng ký sử dụng natri</h1>
            <p className="text-muted-foreground">
              Một nơi mà <span className="italic">bạn</span> có thể kết bạn và
              trò chuyện.
            </p>
          </div>
          <div className="space-y-5">
            <GoogleOAuthButton />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>Hoặc</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Đã có tài khoản? Hãy đăng nhập
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}

export default SignUpPage;
