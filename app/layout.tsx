import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { es } from 'date-fns/locale'
import { setDefaultOptions } from "date-fns";
import AuthWrapper from "@/src/ui/auth/auth-wrapper";
import { AppWrapper } from "@/src/context";

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
        <AppWrapper>
        {children}
        </AppWrapper>
      </body>
    </html>
  );
}
