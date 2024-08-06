'use client'
import addEmployee from "@/src/actions/employees"
import { Assignment } from "@/src/common/Assignment"
import FormCalendar from "@/src/components/FormCalendar"
import FormInput from "@/src/components/FormInput"
import FormSelect from "@/src/components/FormSelect"
import { Form } from "@/src/components/ui/form"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "../LoadingButton"
import { useTransition } from "react"

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom"}),
    assignment: z.string({message: "Veuillez choisir l'affectation de l'employé"}), 
    salary_amount: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le salaire de l'employé"
      }), 
    transport_amount: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le transport de l'employé"
      }), 
    total_days: z.string(),
    address: z.string().optional(),
    start_date: z.date(), 
    matricule: z.string().optional(),
    employee_function: z.string().optional(),
    department: z.string().optional(), 
    job_status: z.string().optional(),
    team: z.string().optional(),
  })

export default function CreateForm({affectations}: {affectations: Array<Assignment>}) {
    const [pending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "", address: "", 
            total_days: "26"
        },
      })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = dataToFormData(data)

        startTransition(async () => {
            await addEmployee(formData)
        })
    }

    return (
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <FormInput
                        control={form.control} disabled={pending}
                        name="name" label="Nom" placeholder="Nom de l'employé"
                    />
                    <FormSelect
                    // @ts-ignore
                        label="Affectation" name="assignment" control={form.control} disabled={pending}
                        options={affectations.map((aff) => ({ id: `/api/assignments/${aff.id}`, value: aff.name}))}
                        placeholder="Selectionner"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="salary_amount" label="Salaire de base" placeholder="Salaire" type="number"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="transport_amount" label="Transport" placeholder="Transport" type="number"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="total_days" label="Totals jours" placeholder="Totals jours de travail prévus" type="number"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="address" label="Adresse" placeholder="Adresse"
                    />
                    <FormCalendar
                    // @ts-ignore
                        label="Date de debut" name="start_date" control={form.control} placeholder="Date de debut"
                        disabled={pending}
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="matricule" label="Matricule" placeholder="Matricule"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="employee_function" label="Fonction" placeholder="Fonction"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="department" label="Departement" placeholder="Departement"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="job_status" label="Statut" placeholder="Statut"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="team" label="Equipe" placeholder="Equipe"
                    />
                </div>
                <LoadingButton pending={pending} text="Créer nouvel employé" />
            </form>
        </Form>
    )
}