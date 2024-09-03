import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/src/ui/auth/login-form";
import PyiursLogo from "@/src/ui/PyiursLogo";

export default async function Login () {
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