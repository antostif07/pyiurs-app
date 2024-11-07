import CreateForm from "@/src/ui/users/create-form";
import {getSession, logout} from "@/src/actions/auth";

export default async function Page() {
    const session = await getSession()

    let data = await fetch(
        `${process.env.API_URL}/assignments`,
        {
            next: {tags: ['assignments']},
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
                <h1 className="text-2xl font-bold">Ajouter un nouvel utilisateur</h1>
            </div>
            <div className="mt-8">
                <CreateForm data={result['hydra:member']} />
            </div>
        </div>
    )
}