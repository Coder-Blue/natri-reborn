import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ThemeProvider } from "next-themes";
import { extractRouterConfig } from "uploadthing/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { fileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";

const comfortaa = Comfortaa({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: "%s | natri",
    default: "natri",
  },
  applicationName: "natri: Mạng xã hội",
  description:
    "Một mạng xã hội hiện đại và nhanh dành cho người Việt được tạo ra bởi Noah Trần",
  creator: "Noah Trần",
  authors: {
    name: "Noah Trần",
  },
  generator: "natri",
  keywords: [
    "Social Media",
    "Mạng xã hội",
    "natri",
    "natri-re",
    "React 19",
    "NextJS",
  ],
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://natri-soc.vercel.app/",
    title: "natri: Mạng xã hội",
    description:
      "Một mạng xã hội hiện đại, đơn giản và nhanh dành cho người Việt được tạo ra bởi Noah Trần",
    siteName: "natri: Mạng xã hội",
    images: [
      {
        url: "https://i.ibb.co/bvjjNkj/natri-og-edit.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <Analytics />
      <body className={comfortaa.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
