import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "@/lib/auth";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz App ",
  description: "Quiz App built with Next.js 15 and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
