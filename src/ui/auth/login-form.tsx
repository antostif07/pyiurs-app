'use client'
import {useActionState} from 'react'
import {useFormStatus} from 'react-dom'
import {login} from "@/src/actions/auth";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";

export default function LoginForm() {
    const [state, action] = useActionState(login, undefined)

    return (
        // @ts-ignore
       <form action={action}>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <Label htmlFor={'email'}>Email</Label>
                    <Input id={'email'} name={'email'} placeholder={'Adresse Email'} type={'email'} />
                </div>

                <div>
                    <Label htmlFor={'password'}>Mot de passe</Label>
                    <Input id={'password'} name={'password'} placeholder={'Mot de passe'} type={'password'} />
                </div>
                {(state?.errors?.email || state?.errors?.password || state?.code === 401) && <p className={'italic text-red-800 text-sm'}>Email ou Mot de passe invalide</p>}
                <SubmitButton />
            </div>

        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button className={'mt-4'} type={'submit'} disabled={pending}>
            {pending ? <LoaderCircle className={'animate-spin'} /> : "Se Connecter"}
        </Button>
    )
}