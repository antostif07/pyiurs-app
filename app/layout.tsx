import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { es } from 'date-fns/locale'
import { setDefaultOptions } from "date-fns";
import React from "react";

setDefaultOptions({ locale: es })

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyiurs App",
  description: "Pyiurs Internal App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
