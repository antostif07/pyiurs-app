'use client'
import { Card, CardContent } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";

export default function MainMenu() {
    const router = useRouter()
    const pathname = usePathname()
//@ts-ignore
    const handleClick = (e, link: string) => {
        e.preventDefault()
        router.push(link)
    }
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {
                [
                    { name: "Ressources Humaines", endpoint: "rh"}, {name: "Audit", endpoint: "audit"}
                ].map((menu, i: number) => (
                    <Card className="cursor-pointer " onClick={(e) => handleClick(e, `${pathname}${menu.endpoint}`)} key={`${menu.endpoint}-${i}`}>
                        <CardContent className="flex justify-center items-center pt-8 text-2xl font-bold">
                            <p>{menu.name}</p>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}