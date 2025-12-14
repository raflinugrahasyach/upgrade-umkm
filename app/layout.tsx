import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Upgrade UMKM - Platform AI untuk Pengembangan Usaha",
  description:
    "Platform berbasis Artificial Intelligence untuk analisis pasar, kelola stok, dan pendampingan bisnis otomatis untuk UMKM Indonesia.",
  keywords: ["UMKM", "AI", "Bisnis", "Indonesia", "Analisis", "Pendampingan"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
