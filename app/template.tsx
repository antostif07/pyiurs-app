import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default async function Template({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {children}
            <Toaster/>
        </>
    );
}