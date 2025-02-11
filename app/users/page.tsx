import { Button } from "@/components/ui/button";
import { columns } from "@/src/ui/users/columns";
import Link from "next/link";
import {getSession, logout} from "@/src/actions/auth";
import DataTableErrorWrapper from "@/src/ui/DataTableErrorWrapper";


export default async function UserPage() {
    const session = await getSession()

    let data = await fetch(
        `${process.env.API_URL}/users`,
        {
            next: {tags: ['users']},
            headers: {
                'Content-Type': 'application/json+ld',
                'Authorization': `Bearer ${session.token}`
            }
        }
    )
    let result = await data.json()

    if (result && result.code === 401) {
        await logout()
    }
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Utilisateurs</h1>
                <Link href={"users/add"}>
                    <Button>Ajouter</Button>
                </Link>
            </div>
            <div className="mt-8 relative">
                <DataTableErrorWrapper data={result} columns={columns} />
            </div>
        </div>
    )
}