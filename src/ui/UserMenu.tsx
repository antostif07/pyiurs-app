'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import {logout} from "@/src/actions/auth";
import Link from 'next/link';

export default function UserMenu({name}: {name?: string,}) {
    const pathname = usePathname()
    const userRoutes = [
        {name: "Mon Profil", endpoint: "/profil"}
    ]
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>{name}</div>
                <form action={logout}>
                    <Button variant={"destructive"}>Deconnéxion</Button>
                </form>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {
                userRoutes.map((menu, i: number) => (
                    <Link key={`${menu.endpoint}-${i}`} href={`${pathname}${menu.endpoint}`} legacyBehavior>
                        <a>
                            <Card className="cursor-pointer">
                                <CardContent className="flex justify-center items-center pt-8 text-2xl font-bold">
                                    <p>{menu.name}</p>
                                </CardContent>
                            </Card>
                        </a>
                    </Link>
                ))
            }
        </div>
        </>
    )
}