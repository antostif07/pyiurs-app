import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/src/ui/auth/login-form";
import PyiursLogo from "@/src/ui/PyiursLogo";
import {getSession} from "@/src/actions/auth";
import {redirect} from "next/navigation";

export default async function Login () {
    const session = await getSession()

    if (session.isLoggedIn) {
        redirect('/')
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-8">
            <div>
                <PyiursLogo />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                    <CardDescription>Veuillez Renseigner vos infos pour vous connecter.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}