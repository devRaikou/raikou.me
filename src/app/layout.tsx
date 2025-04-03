import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arda Gulez | Full Stack Developer",
  description: "Portfolio of Arda Gulez - Full Stack Developer",
  authors: [{ name: "Arda Gulez", url: "https://raikou.me" }],
  keywords: ["Arda Gulez", "Full Stack Developer", "Portfolio", "devRaikou", "Web Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
