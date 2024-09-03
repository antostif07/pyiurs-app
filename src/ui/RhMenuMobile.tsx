'use client'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BadgeDollarSign, Building2, Fingerprint, Menu, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rhMenus } from "../lib/menus";
import { ReactNode } from "react";

export default function RhMenuMobile() {
    const pathname = usePathname()
    
    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {
                    rhMenus.map((m: {name: string, icon: ReactNode | string, link: string}, index: number) => (
                        <Link
                            href={m.link} key={`${m.name}-${index}`}
                            className={`${pathname === m.link ? "bg-muted text-primary" : "text-muted-foreground "} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
                        >
                            {m.icon} {m.name}
                        </Link>
                    ))
                }
              </nav>
            </SheetContent>
          </Sheet>
    )
}