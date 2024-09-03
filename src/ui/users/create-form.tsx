'use client'
import FormInput from "@/src/components/FormInput"
import { Form } from "@/components/ui/form"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "../LoadingButton"
import FormSelect from "@/src/components/FormSelect"
import addUser from "@/src/actions/users"
import { redirect } from "next/navigation"

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom de l'affectation"}),
    email: z.string().email("Veuillez entrer un email valide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    roles: z.string()
  })

export default function CreateForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "", email: "", password: "", roles: ""
        },
    })
    
    const [pending, startTransition] = useTransition()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const form_data = dataToFormData(data)
        
        startTransition(async () => {
            const res = await addUser(form_data)

            redirect('/users')
        })
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} //action={addAssignment}
            >
                <div className="grid grid-cols-2 gap-8">
                    <FormInput
                        control={form.control} disabled={pending}
                        name="name" label="Nom" placeholder="Nom de l'utilisateur"
                    />
                    <FormInput
                        control={form.control} disabled={pending} type="email"
                        name="email" label="Email" placeholder="Adresse Email"
                    />
                    <FormInput
                        control={form.control} disabled={pending} type="password"
                        name="password" label="Mot de passe" placeholder="Mot de passe"
                    />
                    <FormSelect
                        label="Role" name="roles" options={[
                            { id: "ROLE_ADMIN", value: "Admin"},
                            { id: "ROLE_MANAGER", value: "Manager"},
                            { id: "ROLE_USER", value: "Utilisateur"},
                        ]}
                        // @ts-ignore
                        control={form.control} disabled={pending} description="Pernission de l'utilisateur"
                    />
                </div>
                <LoadingButton pending={pending} text="Créer" className="mt-8" />
            </form>
        </Form>
    )
}