'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import getUser from "../lib/getUser";

export default function MainMenu() {
    const router = useRouter()
    const pathname = usePathname()
    const [pending, startTransition] = useTransition()

    const user = typeof window !== 'undefined' ? getUser() : {}

    //@ts-ignore
    const handleClick = (e, link: string) => {
        e.preventDefault()
        router.push(link)
    }

    const handleLogout = () => {
        startTransition(async () => {
            localStorage.clear()

            redirect('/login')
        })
    }
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>Connecté: {user && user.name}</div>
                <Button variant={"destructive"} onClick={handleLogout}>{pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Deconnexion"}</Button>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {
                [
                    { name: "Ressources Humaines", endpoint: "rh"}, {name: "Audit", endpoint: "audit"}, 
                    { name: "Utilisateur", endpoint: "users"}
                ].map((menu, i: number) => (
                    <Card className="cursor-pointer " onClick={(e) => handleClick(e, `${pathname}${menu.endpoint}`)} key={`${menu.endpoint}-${i}`}>
                        <CardContent className="flex justify-center items-center pt-8 text-2xl font-bold">
                            <p>{menu.name}</p>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
        </>
    )
}