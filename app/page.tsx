import MainMenu from "@/src/ui/MainMenu";
import {getSession} from "@/src/actions/auth";
import {redirect} from "next/navigation";

export default async function Home() {
    const session = await getSession()

    const routes = [
        {
            name: "Ressources Humaines", endpoint: "rh", role: ['ROLE_MANAGER', 'ROLE_ADMIN']
        },
        {
            name: "Audit", endpoint: "audit", role: ['ROLE_MANAGER', 'ROLE_ADMIN']
        },
        { name: "Utilisateur", endpoint: "users", role: ['ROLE_ADMIN']}
    ]

    if (!session.isLoggedIn) {
        redirect('/login')
    }

    const userRoutes = routes.filter((route) => route.role.some(role => session.roles?.includes(role)))

    return (
        <div className="px-8 sm:px-12 md:px-24 lg:px-32 py-8">
          <MainMenu name={session.name} userRoutes={userRoutes} />
        </div>
    );
}
