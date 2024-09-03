'use client'
import PyiursLogo from "@/src/ui/PyiursLogo";
// import { Users, Building2, BadgeDollarSign, Fingerprint } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rhMenus } from "../lib/menus";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function RhMenu() {
    // const session = useSession()
    const pathname = usePathname()
    
    return (
        <div className="hidden border-r bg-muted/40 md:block min-h-screen relative">
            <div className="flex h-full max-h-screen flex-col gap-2 fixed">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <PyiursLogo />
                    {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button> */}
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {
                            rhMenus.map((m: {name: string, icon: ReactNode | string, link: string}, index: number) => (
                                <Link
                                    href={m.link}  key={`${m.name}-${index}`}
                                    className={`${pathname === m.link ? "bg-muted text-primary" : "text-muted-foreground "} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
                                >
                                    {m.icon} {m.name}
                                </Link>
                            ))
                        }
                    </nav>
                </div>
            </div>
      </div>
    )
} 