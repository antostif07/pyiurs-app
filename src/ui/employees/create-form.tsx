'use client'
import addEmployee, { updateEmployee } from "@/src/actions/employees"
import { Assignment } from "@/src/common/Assignment"
import FormCalendar from "@/src/components/FormCalendar"
import FormInput from "@/src/components/FormInput"
import FormSelect from "@/src/components/FormSelect"
import { Form } from "@/components/ui/form"
import dataToFormData from "@/src/lib/dataToFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoadingButton } from "../LoadingButton"
import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Employee } from "./Employee"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    name: z.string().min(3, {message: "Veuillez renseigner le nom"}),
    assignment: z.string({message: "Veuillez choisir l'affectation de l'employé"}), 
    salary: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le salaire de l'employé"
      }), 
      transportFee: z.string().refine((value) => value !== null && value !== undefined, {
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
    tel: z.string().optional(),
    email: z.string().email().optional(),
    indemnityKm: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le montant"
      }).optional(), 
  })

export default function CreateForm({affectations, employee}: {affectations: Array<Assignment>, employee?: Employee}) {
    const [pending, startTransition] = useTransition()
    const pathname = usePathname()
    const {replace} = useRouter()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: employee?.name || "",
            assignment: employee ? `/api/assignments/${employee.assignment.id}` : undefined,
            salary: employee?.salary.toFixed(0) || undefined,
            transportFee: employee?.transportFee.toFixed(0) || undefined, 
            total_days: employee?.total_days.toFixed(0) || "26",
            address: employee?.address || "",
            start_date: employee?.start_date ? new Date(employee?.start_date) : undefined,
            matricule: employee?.matricule || undefined,
            employee_function: employee?.employee_function || undefined,
            department: employee?.department,
            job_status: employee?.job_status,
            team: employee?.team,
            tel: employee?.tel,
            email: employee?.email,
            indemnityKm: employee?.indemnityKm ? employee?.indemnityKm.toString() : "0",
        },
      })
      
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = dataToFormData(data)
        
        if(employee) {
            startTransition(async () => {
                const r = await updateEmployee(formData, employee?.id, {redirectLink: pathname.replace(`/${employee.id}/update`, "")})

                toast({
                    title: "Employé Modifié",
                    description: `Employé ${r.name} modifié avec succés`,
                  })

                replace(pathname.replace(`/${employee.id}/update`, ""))
            })
        } else {
            startTransition(async () => {
                const r = await addEmployee(formData, {redirectLink: pathname.replace("/add", "")})

                toast({
                    title: "Employé Crée",
                    description: `Nouvel employé ${r.name} crée avec succés`,
                  })
    
                replace(pathname.replace("/add", ""))
            })
        }
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
                        name="salary" label="Salaire de base" placeholder="Salaire" type="number"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="transportFee" label="Transport" placeholder="Transport" type="number"
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
                    <FormInput
                        control={form.control} disabled={pending}
                        name="tel" label="Telephone" placeholder="Telephone" type="tel"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="email" label="Email" placeholder="Email" type="email"
                    />
                    <FormInput
                        control={form.control} disabled={pending}
                        name="indemnityKm" label="Indemnité Km" placeholder="Indemnité Kilométrage" type="number"
                    />
                </div>
                <LoadingButton pending={pending} text={employee ? "Enregistrer les modifications" : "Créer nouvel employé"} />
            </form>
        </Form>
    )
}