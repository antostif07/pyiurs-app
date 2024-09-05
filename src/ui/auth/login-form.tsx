'use client'
import FormInput from "@/src/components/FormInput"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "../LoadingButton"
import { useTransition } from "react"
import { redirect } from "next/navigation"
import dataToFormData from "@/src/lib/dataToFormData"
import { useAppContext } from "@/src/context"

const FormSchema = z.object({
    email: z.string().email("Veuillez rensigner l'email"),
    password: z.string({message: "Veuillez renseigner le mot de passe"})
  })

export default function LoginForm() {
    const [pending, startTransition] = useTransition()
    const {user, setUser, users} = useAppContext()
    
    if(user) {
        redirect('/')
    }
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues: {},
      })
      
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = dataToFormData(data)
        
        const email = formData.get('email')
        const password = formData.get('password')

        startTransition(async () => {
            console.log(users);
            
            const us = users.find((u: any) => u.name === email && u.pass === password)
            
            if(us) {
                setUser(us)
                localStorage.setItem('user', JSON.stringify(us))
                redirect('/')
            }
        })
    }

    return (
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-8">
                    <FormInput
                        control={form.control} disabled={pending}
                        name="email" label="Email" placeholder="Adresse Email"
                    />
                    
                    <FormInput
                        control={form.control} disabled={pending} type="password"
                        name="password" label="Mot de passe" placeholder="Mot de passe"
                    />
                </div>
                <LoadingButton pending={pending} text={"Se connecter"} className="w-full mt-8" />
            </form>
        </Form>
    )
}