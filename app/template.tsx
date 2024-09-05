'use client'
import { Toaster } from "@/components/ui/toaster";
import getUser from "@/src/lib/getUser";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }