// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast"; // Import ini

export const metadata: Metadata = {
  title: "Upgrade UMKM",
  description: "Platform Transformasi Digital UMKM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased">
        <ToastProvider> 
          {children} 
        </ToastProvider>
      </body>
    </html>
  );
}