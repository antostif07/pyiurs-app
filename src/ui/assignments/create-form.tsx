'use client'
import addAssignment from "@/src/actions/assigmnents"
import FormInput from "@/src/components/FormInput"
import { Form } from "@/components/ui/form"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "../LoadingButton"

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom de l'affectation"}),
  })

export default function CreateForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })
    
    const [pending, startTransition] = useTransition()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const form_data = dataToFormData(data)
        
        startTransition(async () => {
            await addAssignment(form_data)
        })
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} //action={addAssignment}
            >
                <FormInput
                    control={form.control} disabled={pending}
                    name="name" label="Nom" placeholder="Nom de l'affectation"
                />
                <LoadingButton pending={pending} text="Créer la Boutique" className="mt-8" />
            </form>
        </Form>
    )
}