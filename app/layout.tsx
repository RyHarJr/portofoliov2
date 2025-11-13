import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Portofolio RyHar",
  description: "This is my portofolio",
  icons: {
    icon: "/images/hero.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
