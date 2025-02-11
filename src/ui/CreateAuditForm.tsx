'use client'
import createAudit from "@/src/actions/audit"
import { Assignment } from "@/src/common/Assignment"
import FormCalendar from "@/src/components/FormCalendar"
import FormInput from "@/src/components/FormInput"
import FormSelect from "@/src/components/FormSelect"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "./LoadingButton"
import {toast} from "@/components/ui/use-toast";
import {usePathname, useRouter} from "next/navigation";

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom"}),
    assignment: z.string({message: "Veuillez choisir la boutique"}),
    segment: z.string({message: "Veuillez choisir le Segment"}),
    categories: z.string({message: "Veuillez indiquer la ou les categorie(s) à auditer"}),
    start_date: z.date({message: "Veuillez selectionner la date du debut de l'audit"}),
})

export default function CreateAuditForm({affectations}: {affectations: Array<Assignment>}) {
    const [pending, startTransition] = useTransition()
    const {replace} = useRouter()
    const pathname = usePathname()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
      })
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(async () => {
            const formData = dataToFormData(data)

            const result = await createAudit(formData)

            if(result.name){
                toast({
                    title: "Audit Crée",
                    description: `Nouveau mission d'audit crée avec succés`,
                })

                replace(pathname.replace("/add", ""))
            }
        })
    }

    return (
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-8">
                    <FormInput
                        control={form.control} disabled={pending}
                        name="name" label="Intitulé" placeholder="Intitulé de la Mission"
                    />
                    <FormSelect
                    // @ts-ignore
                        label="Boutique" name="assignment" control={form.control} 
                        options={affectations.map((aff) => ({ id: `/api/assignments/${aff.id}`, value: aff.name}))}
                        placeholder="Selectionner la boutique"  disabled={pending}
                    />
                    <FormSelect
                    // @ts-ignore
                        label="Segment" name="segment" control={form.control} 
                        options={["Femme", "Enfant", "Beauty"].map((aff) => ({ id: aff, value: aff}))}
                        placeholder="Selectionner"  disabled={pending}
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="categories" label="Catégories" placeholder="Séparer les catégories par un virgule"
                    />
                    <FormCalendar
                    // @ts-ignore
                        label="Date de debut" name="start_date" control={form.control} placeholder="Date de debut"
                        disabled={pending}
                    />
                </div>
                <LoadingButton pending={pending} text="Créer" className={'my-4'} />
            </form>
        </Form>
    )
}