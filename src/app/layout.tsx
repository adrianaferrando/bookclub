import type { Metadata } from "next";
import { Inter, Crete_Round } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const creteRound = Crete_Round({
  variable: "--font-crete",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Club",
  description: "Tu club de lectura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${creteRound.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
