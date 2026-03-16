import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import PageLoader from "@/components/PageLoader"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ryhar.my.id"),
  title: {
    default: "RyHar | Portfolio",
    template: "%s | RyHar Portfolio",
  },
  description: "Personal portfolio of RyHar. Software Developer specializing in Next.js, Node.js, and modern web development.",
  keywords: ["RyHar", "Portfolio", "Software Developer", "Web Development", "Backend", "Frontend", "Next.js", "React", "Node.js"],
  authors: [{ name: "RyHar" }],
  creator: "RyHar",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "RyHar | Portfolio",
    description: "Personal portfolio of RyHar. Software Developer specializing in Next.js, Node.js, and modern web development.",
    siteName: "RyHar Portfolio",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "RyHar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RyHar | Portfolio",
    description: "Personal portfolio of RyHar. Software Developer specializing in Next.js, Node.js, and modern web development.",
    images: ["/images/hero.jpg"],
    creator: "@RyHar",
  },
  icons: {
    icon: "/images/hero.jpg",
    shortcut: "/images/hero.jpg",
    apple: "/images/hero.jpg",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ZbLhiilDbtLDyIx5eH6Jeoe1jPkXNKId-LhXG1HhLWA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}

