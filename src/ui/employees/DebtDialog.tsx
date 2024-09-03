'use client'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/src/components/FormInput";
import dataToFormData from "@/src/lib/dataToFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Employee } from "./Employee";
import addEmployeeDebt from "@/src/actions/employeeDebt";

const FormSchema = z.object({
    description: z.string().min(3, {message: "Veuillez renseigner le motif"}),
    amount: z.string().refine((value) => value !== null && value !== undefined, {
        message: "Veuillez indiquer le montant de la prime"
      }),
    employee: z.string(),
  })

export default function DebtDialog({employee}: {employee: Employee}) {
    const [open, setOpen] = useState<boolean>(false)
    const [pending, startTransition] = useTransition()
    const {refresh} = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            employee: employee['@id']
        },
      })
      
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = dataToFormData(data)
        
        startTransition(async () => {
            await addEmployeeDebt(formData)
            refresh()
            setOpen(false)
        })
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>
                    <PlusCircleIcon className="mr-2" /> Ajouter une Dette
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ajouter une dette</AlertDialogTitle>
                    <AlertDialogDescription>Ajouter le montant de la dette de l'employé</AlertDialogDescription>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="my-4 grid grid-cols-2 gap-4">
                                <FormInput
                                    control={form.control} disabled={pending}
                                    name="description" label="Motif" placeholder="Motif de la dette"
                                />
                                <FormInput
                                    control={form.control} disabled={pending}
                                    name="amount" label="Montant" placeholder="Montant" type="number"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button disabled={pending} variant={'outline'} onClick={() => setOpen(false)}>Annuler</Button>
                                <Button type="submit" disabled={pending}>{ pending ? <LoaderIcon className="w-3 h-3 animate-spin" /> : "Ajouter"}</Button>
                            </div>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}